import { NextRequest, NextResponse } from 'next/server';
import { getEmployeeFromSession } from '@/lib/auth';
import { executeQuery } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Employee clock-out API called');

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
    const { break_duration_minutes = 0, notes = '' } = body;

    console.log('✅ Clock-out request for employee:', employee.username, 'break:', break_duration_minutes);

    // Find the active time entry
    const [activeEntries] = await executeQuery(`
      SELECT id, clock_in_time, workload_multiplier, daily_rate
      FROM time_entries 
      WHERE employee_id = ? AND clock_out_time IS NULL
      ORDER BY clock_in_time DESC
      LIMIT 1
    `, [employee.id]);

    if (activeEntries.length === 0) {
      return NextResponse.json({ error: 'No active time entry found' }, { status: 400 });
    }

    const activeEntry = activeEntries[0];
    const now = new Date();
    const clockInTime = new Date(activeEntry.clock_in_time);

    // Calculate total hours (excluding break time)
    const totalMilliseconds = now.getTime() - clockInTime.getTime();
    const totalHours = (totalMilliseconds / (1000 * 60 * 60)) - (break_duration_minutes / 60);
    
    // Calculate total pay
    const hourlyRate = activeEntry.daily_rate || employee.hourly_rate;
    const totalPay = totalHours * hourlyRate * activeEntry.workload_multiplier;

    // Update the time entry
    await executeQuery(`
      UPDATE time_entries 
      SET 
        clock_out_time = ?,
        break_duration_minutes = ?,
        total_hours = ?,
        total_pay = ?,
        notes = CONCAT(COALESCE(notes, ''), ?, ?),
        status = 'completed'
      WHERE id = ?
    `, [
      now,
      break_duration_minutes,
      Math.max(0, totalHours), // Ensure non-negative hours
      Math.max(0, totalPay),   // Ensure non-negative pay
      notes ? '\n\nClock-out notes: ' : '',
      notes,
      activeEntry.id
    ]);

    console.log('✅ Successfully clocked out, hours:', totalHours.toFixed(2), 'pay:', totalPay.toFixed(2));

    return NextResponse.json({ 
      success: true, 
      message: 'Clocked out successfully',
      clock_out_time: now,
      total_hours: Math.max(0, totalHours),
      total_pay: Math.max(0, totalPay)
    });
  } catch (error) {
    console.error('❌ Employee clock-out API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
