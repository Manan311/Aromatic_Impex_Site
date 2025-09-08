import { NextRequest, NextResponse } from 'next/server';
import { getEmployeeFromSession } from '@/lib/auth';
import { executeQuery } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Admin stats API called');

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

    console.log('✅ Fetching dashboard stats...');

    // Get current date for calculations
    const today = new Date().toISOString().split('T')[0];
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Start of current week
    const weekStartStr = weekStart.toISOString().split('T')[0];

    // Total active employees
    const totalEmployeesResult = await executeQuery(`
      SELECT COUNT(*) as count 
      FROM employees 
      WHERE is_active = TRUE AND role IN ('employee', 'manager')
    `);

    // Currently clocked in employees
    const currentlyClockedInResult = await executeQuery(`
      SELECT COUNT(*) as count 
      FROM time_entries 
      WHERE clock_out_time IS NULL AND DATE(clock_in_time) = ?
    `, [today]);

    // Today's hours and cost
    const todayStatsResult = await executeQuery(`
      SELECT 
        COALESCE(SUM(total_hours), 0) as totalHours,
        COALESCE(SUM(total_pay), 0) as totalCost
      FROM time_entries 
      WHERE DATE(clock_in_time) = ?
    `, [today]);

    // This week's hours and cost
    const weekStatsResult = await executeQuery(`
      SELECT 
        COALESCE(SUM(total_hours), 0) as totalHours,
        COALESCE(SUM(total_pay), 0) as totalCost
      FROM time_entries 
      WHERE DATE(clock_in_time) >= ?
    `, [weekStartStr]);

    // Total entries count
    const entriesCountResult = await executeQuery(`
      SELECT COUNT(*) as count 
      FROM time_entries
    `);

    // Ensure all values are proper numbers
    const stats = {
      totalEmployees: parseInt(totalEmployeesResult[0]?.count || 0),
      currentlyClockedIn: parseInt(currentlyClockedInResult[0]?.count || 0),
      totalHoursToday: parseFloat(todayStatsResult[0]?.totalHours || 0),
      totalCostToday: parseFloat(todayStatsResult[0]?.totalCost || 0),
      totalHoursWeek: parseFloat(weekStatsResult[0]?.totalHours || 0),
      totalCostWeek: parseFloat(weekStatsResult[0]?.totalCost || 0),
      entriesTotal: parseInt(entriesCountResult[0]?.count || 0)
    };

    console.log('📊 Dashboard stats:', stats);

    return NextResponse.json(stats);
  } catch (error) {
    console.error('❌ Admin stats API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
