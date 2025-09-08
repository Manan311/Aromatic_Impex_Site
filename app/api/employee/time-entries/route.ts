import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { executeQuery } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const session = await verifySession(request);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const timeEntries = await executeQuery(`
      SELECT 
        clock_in_time, 
        clock_out_time, 
        total_hours, 
        total_pay,
        workload_level,
        workload_multiplier,
        break_duration_minutes,
        status,
        notes,
        DATE(clock_in_time) as date
      FROM time_entries 
      WHERE employee_id = ?
      ORDER BY clock_in_time DESC 
      LIMIT 10
    `, [session.employee_id]);

    return NextResponse.json(timeEntries);
  } catch (error) {
    console.error('Error fetching time entries:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
