import { NextRequest, NextResponse } from 'next/server';
import { getEmployeeFromSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Employee me API called');

    // Extract session ID from cookies
    const sessionId = request.cookies.get('session-id')?.value;
    
    if (!sessionId) {
      console.log('❌ No session cookie - returning 401');
      return NextResponse.json({ error: 'Unauthorized - No session cookie' }, { status: 401 });
    }

    const employee = await getEmployeeFromSession(sessionId);
    
    if (!employee) {
      console.log('❌ Invalid session - returning 401');
      return NextResponse.json({ error: 'Unauthorized - Invalid session' }, { status: 401 });
    }

    console.log('✅ Employee found:', employee.username);

    return NextResponse.json(employee);
  } catch (error) {
    console.error('❌ Employee me API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
