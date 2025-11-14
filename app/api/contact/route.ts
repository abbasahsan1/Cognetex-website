import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'contact.json');

export async function GET() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const contact = JSON.parse(data);
    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contact info' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedContact = await request.json();
    await fs.writeFile(DATA_FILE, JSON.stringify(updatedContact, null, 2));
    return NextResponse.json(updatedContact);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update contact info' }, { status: 500 });
  }
}
