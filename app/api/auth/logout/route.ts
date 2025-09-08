import { NextRequest, NextResponse } from 'next/server';
import { destroySession } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const sessionId = cookieStore.get('session-id')?.value;
    
    if (sessionId) {
      await destroySession(sessionId);
    }
    
    cookieStore.delete('session-id');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
