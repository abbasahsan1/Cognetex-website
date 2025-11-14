import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'services.json');

// GET - Fetch all services
export async function GET() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const services = JSON.parse(data);
    return NextResponse.json(services);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

// POST - Add new service
export async function POST(request: Request) {
  try {
    const newService = await request.json();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const services = JSON.parse(data);
    
    // Generate new ID
    const maxId = services.length > 0 ? Math.max(...services.map((s: { id: string }) => parseInt(s.id))) : 0;
    newService.id = (maxId + 1).toString();
    newService.order = services.length;
    
    services.push(newService);
    await fs.writeFile(DATA_FILE, JSON.stringify(services, null, 2));
    
    return NextResponse.json(newService, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to add service' }, { status: 500 });
  }
}

// PUT - Update service
export async function PUT(request: Request) {
  try {
    const updatedService = await request.json();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const services = JSON.parse(data);
    
    const index = services.findIndex((s: { id: string }) => s.id === updatedService.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    
    services[index] = { ...services[index], ...updatedService };
    await fs.writeFile(DATA_FILE, JSON.stringify(services, null, 2));
    
    return NextResponse.json(services[index]);
  } catch {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

// DELETE - Remove service
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const servicesData = JSON.parse(data);
    
    const services = servicesData.filter((s: { id: string }) => s.id !== id);
    
    // Reorder remaining services
    const reorderedServices = services.map((s: { id: string; order?: number }, index: number) => ({
      ...s,
      order: index
    }));
    
    await fs.writeFile(DATA_FILE, JSON.stringify(reorderedServices, null, 2));
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
