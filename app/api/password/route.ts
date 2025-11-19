import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const passwordFilePath = path.join(process.cwd(), 'data', 'password.json');

async function getPassword() {
  const fileContents = await fs.readFile(passwordFilePath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.password;
}

async function savePassword(newPassword: string) {
  await fs.writeFile(passwordFilePath, JSON.stringify({ password: newPassword }, null, 2));
}

// GET - Verify password
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const inputPassword = searchParams.get('password');
    
    if (!inputPassword) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }
    
    const storedPassword = await getPassword();
    const isValid = inputPassword === storedPassword;
    
    return NextResponse.json({ 
      valid: isValid,
      currentPassword: isValid ? storedPassword : null
    });
  } catch (error) {
    console.error('Failed to verify password:', error);
    return NextResponse.json({ error: 'Failed to verify password' }, { status: 500 });
  }
}

// POST - Update password
export async function POST(request: NextRequest) {
  try {
    const { currentPassword, newPassword } = await request.json();
    
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ 
        error: 'Both current and new passwords are required' 
      }, { status: 400 });
    }
    
    const storedPassword = await getPassword();
    
    if (currentPassword !== storedPassword) {
      return NextResponse.json({ 
        error: 'Current password is incorrect' 
      }, { status: 401 });
    }
    
    await savePassword(newPassword);
    
    return NextResponse.json({ 
      message: 'Password updated successfully',
      newPassword
    });
  } catch (error) {
    console.error('Failed to update password:', error);
    return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
  }
}
