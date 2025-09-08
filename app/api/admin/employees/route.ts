import { NextRequest, NextResponse } from 'next/server';
import { getEmployeeFromSession } from '@/lib/auth';
import { executeQuery } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Admin employees API called');

    // Extract session ID from cookies
    const sessionId = request.cookies.get('session-id')?.value;
    console.log('🍪 Session ID from cookie:', sessionId ? 'EXISTS' : 'MISSING');

    if (!sessionId) {
      console.log('❌ No session cookie - returning 401');
      return NextResponse.json({ error: 'Unauthorized - No session cookie' }, { status: 401 });
    }

    const session = await getEmployeeFromSession(sessionId);
    console.log('🔐 Session result:', session);

    if (!session) {
      console.log('❌ Invalid session - returning 401');
      return NextResponse.json({ error: 'Unauthorized - Invalid session' }, { status: 401 });
    }

    console.log('✅ Session found for user:', session.username, 'with role:', session.role);

    if (!['admin', 'manager'].includes(session.role)) {
      console.log('❌ Insufficient role:', session.role, 'required: admin or manager');
      return NextResponse.json({ error: 'Unauthorized - Insufficient role' }, { status: 401 });
    }

    console.log('✅ Role check passed, fetching employees...');

    const employees = await executeQuery(`
      SELECT id, username, first_name, last_name, email, role, hourly_rate, hire_date, is_active
      FROM employees 
      WHERE role IN ('employee', 'manager') AND is_active = TRUE
      ORDER BY first_name, last_name
    `);

    console.log('📊 Found employees:', employees.length);

    return NextResponse.json(employees);
  } catch (error) {
    console.error('❌ Admin employees API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
