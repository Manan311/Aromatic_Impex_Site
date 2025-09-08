import { NextRequest, NextResponse } from 'next/server';
import { getEmployeeFromSession } from '@/lib/auth';
import { executeQuery } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Employee stats API called');

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

    console.log('✅ Fetching stats for employee:', employee.username);

    // Get current date for calculations
    const today = new Date().toISOString().split('T')[0];
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Start of current week
    const weekStartStr = weekStart.toISOString().split('T')[0];

    // Today's hours and pay
    const todayStatsResult = await executeQuery(`
      SELECT 
        COALESCE(SUM(total_hours), 0) as todayHours,
        COALESCE(SUM(total_pay), 0) as todayPay
      FROM time_entries 
      WHERE employee_id = ? AND DATE(clock_in_time) = ?
    `, [employee.id, today]);

    // This week's hours and pay
    const weekStatsResult = await executeQuery(`
      SELECT 
        COALESCE(SUM(total_hours), 0) as weekHours,
        COALESCE(SUM(total_pay), 0) as weekPay
      FROM time_entries 
      WHERE employee_id = ? AND DATE(clock_in_time) >= ?
    `, [employee.id, weekStartStr]);

    // Check if currently clocked in
    const currentShiftResult = await executeQuery(`
      SELECT clock_in_time, workload_level, break_duration_minutes
      FROM time_entries 
      WHERE employee_id = ? AND clock_out_time IS NULL 
      ORDER BY clock_in_time DESC 
      LIMIT 1
    `, [employee.id]);

    const isClocked = currentShiftResult.length > 0;
    const currentShift = isClocked ? currentShiftResult[0] : null;

    // Ensure all values are proper numbers
    const stats = {
      todayHours: parseFloat(todayStatsResult[0]?.todayHours || 0),
      todayPay: parseFloat(todayStatsResult[0]?.todayPay || 0),
      weekHours: parseFloat(weekStatsResult[0]?.weekHours || 0),
      weekPay: parseFloat(weekStatsResult[0]?.weekPay || 0),
      isClocked: isClocked,
      currentShiftStart: currentShift ? currentShift.clock_in_time : null,
      currentWorkload: currentShift ? currentShift.workload_level : null,
      currentBreakTime: parseInt(currentShift?.break_duration_minutes || 0)
    };

    console.log('📊 Employee stats:', stats);

    return NextResponse.json(stats);
  } catch (error) {
    console.error('❌ Employee stats API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
