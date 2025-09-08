import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, createSession } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    console.log('🚪 Login attempt for:', username);

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    const employee = await authenticateUser(username, password);
    
    if (!employee) {
      console.log('❌ Authentication failed for:', username);

      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    console.log('✅ User authenticated:', employee.username);

    const sessionId = await createSession(employee.id);
    console.log('✅ Session created:', sessionId);

    const cookieStore = await cookies();
    cookieStore.set('session-id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });
    
    console.log('✅ Cookie set for session:', sessionId);

    return NextResponse.json({
      employee: {
        id: employee.id,
        username: employee.username,
        first_name: employee.first_name,
        last_name: employee.last_name,
        role: employee.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
