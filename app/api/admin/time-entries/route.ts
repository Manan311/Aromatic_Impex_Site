import { NextRequest, NextResponse } from 'next/server';
import { getEmployeeFromSession } from '@/lib/auth';
import { executeQuery } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Admin time entries API called');

    // Extract session ID from cookies
    const sessionId = request.cookies.get('session-id')?.value;
    
    if (!sessionId) {
      console.log('❌ No session cookie - returning 401');
      return NextResponse.json({ error: 'Unauthorized - No session cookie' }, { status: 401 });
    }

    const session = await getEmployeeFromSession(sessionId);
    
    if (!session) {
      console.log('❌ Invalid session - returning 401');
      return NextResponse.json({ error: 'Unauthorized - Invalid session' }, { status: 401 });
    }

    if (!['admin', 'manager'].includes(session.role)) {
      console.log('❌ Insufficient role:', session.role);
      return NextResponse.json({ error: 'Unauthorized - Insufficient role' }, { status: 401 });
    }

    // Get date parameter from query string
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

    console.log('✅ Fetching time entries for date:', date);

    const timeEntries = await executeQuery(`
      SELECT 
        t.id,
        t.employee_id,
        CONCAT(e.first_name, ' ', e.last_name) as employee_name,
        t.clock_in_time,
        t.clock_out_time,
        t.total_hours,
        t.total_pay,
        t.workload_level,
        t.workload_multiplier,
        t.break_duration_minutes,
        t.status,
        DATE(t.clock_in_time) as date
      FROM time_entries t
      JOIN employees e ON t.employee_id = e.id
      WHERE DATE(t.clock_in_time) = ?
      ORDER BY t.clock_in_time DESC
    `, [date]);

    console.log('📊 Found time entries:', timeEntries.length);

    return NextResponse.json(timeEntries);
  } catch (error) {
    console.error('❌ Admin time entries API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
