import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'projects.json');

export async function GET() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const projects = JSON.parse(data);
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newProject = await request.json();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const projects = JSON.parse(data);
    
    const maxId = projects.length > 0 ? Math.max(...projects.map((p: { id: string }) => parseInt(p.id))) : 0;
    newProject.id = (maxId + 1).toString();
    newProject.order = projects.length;
    
    projects.push(newProject);
    await fs.writeFile(DATA_FILE, JSON.stringify(projects, null, 2));
    
    return NextResponse.json(newProject, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedProject = await request.json();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const projects = JSON.parse(data);
    
    const index = projects.findIndex((p: { id: string }) => p.id === updatedProject.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    projects[index] = { ...projects[index], ...updatedProject };
    await fs.writeFile(DATA_FILE, JSON.stringify(projects, null, 2));
    
    return NextResponse.json(projects[index]);
  } catch {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const projectsData = JSON.parse(data);
    
    const projects = projectsData.filter((p: { id: string }) => p.id !== id);
    const reorderedProjects = projects.map((p: { id: string; order?: number }, index: number) => ({
      ...p,
      order: index
    }));
    
    await fs.writeFile(DATA_FILE, JSON.stringify(reorderedProjects, null, 2));
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
