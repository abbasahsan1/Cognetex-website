import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Simple password authentication
// In production, use proper authentication with hashed passwords
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'cognetex2024';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    if (password === ADMIN_PASSWORD) {
      // Set a simple auth cookie
      const cookieStore = await cookies();
      cookieStore.set('admin_auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });
      
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const auth = cookieStore.get('admin_auth');
    
    return NextResponse.json({ authenticated: auth?.value === 'authenticated' });
  } catch (error) {
    return NextResponse.json({ authenticated: false });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('admin_auth');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
