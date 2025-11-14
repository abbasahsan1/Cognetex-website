import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'team.json');

// GET - Fetch all team members
export async function GET() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const team = JSON.parse(fileContents);
    return NextResponse.json(team);
  } catch {
    return NextResponse.json({ error: 'Failed to load team members' }, { status: 500 });
  }
}

// POST - Create a new team member
export async function POST(request: Request) {
  try {
    const newMember = await request.json();
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const team = JSON.parse(fileContents);
    
    // Add ID and order
    newMember.id = Date.now().toString();
    newMember.order = team.length;
    
    team.push(newMember);
    await fs.writeFile(dataFilePath, JSON.stringify(team, null, 2));
    
    return NextResponse.json(newMember, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}

// PUT - Update a team member
export async function PUT(request: Request) {
  try {
    const updatedMember = await request.json();
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const team = JSON.parse(fileContents);
    
    const index = team.findIndex((m: { id: string }) => m.id === updatedMember.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }
    
    team[index] = { ...team[index], ...updatedMember };
    await fs.writeFile(dataFilePath, JSON.stringify(team, null, 2));
    
    return NextResponse.json(team[index]);
  } catch {
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

// DELETE - Delete a team member
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const teamData = JSON.parse(fileContents);
    
    const team = teamData.filter((m: { id: string }) => m.id !== id);
    
    // Reorder remaining members
    team.forEach((member: { order?: number }, index: number) => {
      member.order = index;
    });
    
    await fs.writeFile(dataFilePath, JSON.stringify(team, null, 2));
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}
