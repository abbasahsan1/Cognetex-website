import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'blogs.json');

export async function GET() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const blogs = JSON.parse(data);
    return NextResponse.json(blogs);
  } catch {
    return NextResponse.json({ error: 'Failed to read blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newBlog = await request.json();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const blogs = JSON.parse(data);
    
    const maxId = blogs.length > 0 ? Math.max(...blogs.map((b: { id: string }) => parseInt(b.id))) : 0;
    newBlog.id = (maxId + 1).toString();
    newBlog.order = blogs.length;
    
    blogs.push(newBlog);
    await fs.writeFile(DATA_FILE, JSON.stringify(blogs, null, 2));
    
    return NextResponse.json(newBlog, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to add blog' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedBlog = await request.json();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const blogs = JSON.parse(data);
    
    const index = blogs.findIndex((b: { id: string }) => b.id === updatedBlog.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    blogs[index] = { ...blogs[index], ...updatedBlog };
    await fs.writeFile(DATA_FILE, JSON.stringify(blogs, null, 2));
    
    return NextResponse.json(blogs[index]);
  } catch {
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
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
    const blogsData = JSON.parse(data);
    
    const blogs = blogsData.filter((b: { id: string }) => b.id !== id);
    const reorderedBlogs = blogs.map((b: { id: string; order?: number }, index: number) => ({
      ...b,
      order: index
    }));
    
    await fs.writeFile(DATA_FILE, JSON.stringify(reorderedBlogs, null, 2));
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
