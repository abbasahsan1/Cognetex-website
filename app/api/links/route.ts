import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const LINKS_FILE = path.join(process.cwd(), 'data', 'links.json');

interface Link {
  id: string;
  label: string;
  url: string;
  type: string;
  icon: string;
  location: string;
  order: number;
}

// GET - Fetch all links or filter by location
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    
    const data = await fs.readFile(LINKS_FILE, 'utf-8');
    let links: Link[] = JSON.parse(data);
    
    // Filter by location if provided
    if (location) {
      links = links.filter(link => link.location === location);
    }
    
    // Sort by order
    links.sort((a, b) => a.order - b.order);
    
    return NextResponse.json(links);
  } catch (error) {
    console.error('Error reading links:', error);
    return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 });
  }
}

// POST - Create new link
export async function POST(request: NextRequest) {
  try {
    const newLink = await request.json();
    const data = await fs.readFile(LINKS_FILE, 'utf-8');
    const links: Link[] = JSON.parse(data);
    
    // Generate new ID
    const maxId = links.reduce((max, link) => Math.max(max, parseInt(link.id)), 0);
    newLink.id = (maxId + 1).toString();
    
    links.push(newLink);
    await fs.writeFile(LINKS_FILE, JSON.stringify(links, null, 2));
    
    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    console.error('Error creating link:', error);
    return NextResponse.json({ error: 'Failed to create link' }, { status: 500 });
  }
}

// PUT - Update existing link
export async function PUT(request: NextRequest) {
  try {
    const updatedLink = await request.json();
    const data = await fs.readFile(LINKS_FILE, 'utf-8');
    const links: Link[] = JSON.parse(data);
    
    const index = links.findIndex(link => link.id === updatedLink.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }
    
    links[index] = updatedLink;
    await fs.writeFile(LINKS_FILE, JSON.stringify(links, null, 2));
    
    return NextResponse.json(updatedLink);
  } catch (error) {
    console.error('Error updating link:', error);
    return NextResponse.json({ error: 'Failed to update link' }, { status: 500 });
  }
}

// DELETE - Remove link
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Link ID required' }, { status: 400 });
    }
    
    const data = await fs.readFile(LINKS_FILE, 'utf-8');
    const links: Link[] = JSON.parse(data);
    
    const filteredLinks = links.filter(link => link.id !== id);
    
    if (filteredLinks.length === links.length) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }
    
    await fs.writeFile(LINKS_FILE, JSON.stringify(filteredLinks, null, 2));
    
    return NextResponse.json({ message: 'Link deleted successfully' });
  } catch (error) {
    console.error('Error deleting link:', error);
    return NextResponse.json({ error: 'Failed to delete link' }, { status: 500 });
  }
}
