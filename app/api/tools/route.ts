import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const toolsFilePath = path.join(process.cwd(), 'data', 'tools.json');

async function getTools() {
  const fileContents = await fs.readFile(toolsFilePath, 'utf8');
  return JSON.parse(fileContents);
}

async function saveTools(tools: unknown[]) {
  await fs.writeFile(toolsFilePath, JSON.stringify(tools, null, 2));
}

export const dynamic = 'force-dynamic';

// GET - Fetch all tools
export async function GET() {
  try {
    const tools = await getTools();
    // Sort by order if available
    tools.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
    return NextResponse.json(tools);
  } catch (error) {
    console.error('Failed to fetch tools:', error);
    return NextResponse.json([], { status: 200 });
  }
}

// POST - Add a new tool
export async function POST(request: NextRequest) {
  try {
    const tools = await getTools();
    const newTool = await request.json();

    // Generate new ID
    const maxId = tools.reduce((max: number, tool: { id: string }) => {
      const id = parseInt(tool.id);
      return id > max ? id : max;
    }, 0);

    newTool.id = String(maxId + 1);
    newTool.order = tools.length + 1;

    tools.push(newTool);
    await saveTools(tools);

    return NextResponse.json(newTool, { status: 201 });
  } catch (error) {
    console.error('Failed to add tool:', error);
    return NextResponse.json({ error: 'Failed to add tool' }, { status: 500 });
  }
}

// PUT - Update a tool
export async function PUT(request: NextRequest) {
  try {
    const tools = await getTools();
    const updatedTool = await request.json();

    const index = tools.findIndex((tool: { id: string }) => tool.id === updatedTool.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
    }

    tools[index] = { ...tools[index], ...updatedTool };
    await saveTools(tools);

    return NextResponse.json(tools[index]);
  } catch (error) {
    console.error('Failed to update tool:', error);
    return NextResponse.json({ error: 'Failed to update tool' }, { status: 500 });
  }
}

// DELETE - Delete a tool
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Tool ID is required' }, { status: 400 });
    }

    const tools = await getTools();
    const filteredTools = tools.filter((tool: { id: string }) => tool.id !== id);

    if (filteredTools.length === tools.length) {
      return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
    }

    // Reorder remaining tools
    const reorderedTools = filteredTools.map((tool: { order: number }, index: number) => ({
      ...tool,
      order: index + 1
    }));

    await saveTools(reorderedTools);

    return NextResponse.json({ message: 'Tool deleted successfully' });
  } catch (error) {
    console.error('Failed to delete tool:', error);
    return NextResponse.json({ error: 'Failed to delete tool' }, { status: 500 });
  }
}
