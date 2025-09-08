import { NextRequest, NextResponse } from 'next/server';
import { getEmployeeFromSession } from '@/lib/auth';
import { executeQuery } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Employee clock-in API called');

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

    const body = await request.json();
    const { workload_level = 'normal', notes = '' } = body;

    console.log('✅ Clock-in request for employee:', employee.username, 'workload:', workload_level);

    // Check if already clocked in
    const [existingEntry] = await executeQuery(`
      SELECT id FROM time_entries 
      WHERE employee_id = ? AND clock_out_time IS NULL
    `, [employee.id]);

    if (existingEntry.length > 0) {
      return NextResponse.json({ error: 'Already clocked in' }, { status: 400 });
    }

    // Set workload multiplier based on level
    const workloadMultipliers = {
      'light': 0.8,
      'normal': 1.0,
      'heavy': 1.2,
      'overtime': 1.5
    };

    const multiplier = workloadMultipliers[workload_level as keyof typeof workloadMultipliers] || 1.0;

    // Create new time entry
    const now = new Date();
    await executeQuery(`
      INSERT INTO time_entries (
        employee_id, 
        clock_in_time, 
        workload_level, 
        workload_multiplier, 
        notes,
        daily_rate,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, 'active')
    `, [
      employee.id,
      now,
      workload_level,
      multiplier,
      notes,
      employee.hourly_rate
    ]);

    console.log('✅ Successfully clocked in');

    return NextResponse.json({ 
      success: true, 
      message: 'Clocked in successfully',
      clock_in_time: now 
    });
  } catch (error) {
    console.error('❌ Employee clock-in API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
