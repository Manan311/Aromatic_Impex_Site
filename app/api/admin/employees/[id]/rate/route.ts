import { NextRequest, NextResponse } from 'next/server';
import { getCurrentEmployee } from '@/lib/auth';
import { executeQuery } from '@/lib/database';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getCurrentEmployee(request);
    
    if (!session || !['admin', 'manager'].includes(session.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { hourly_rate } = await request.json();
    const employeeId = parseInt(params.id);

    if (!hourly_rate || hourly_rate < 0) {
      return NextResponse.json({ error: 'Invalid hourly rate' }, { status: 400 });
    }

    await executeQuery(`
      UPDATE employees 
      SET hourly_rate = ?, updated_at = NOW()
      WHERE id = ? AND is_active = TRUE
    `, [hourly_rate, employeeId]);

    await executeQuery(`
      INSERT INTO pay_adjustments (employee_id, adjustment_date, adjustment_type, amount, reason, created_by)
      VALUES (?, CURDATE(), 'hourly_rate', ?, 'Hourly rate updated by admin', ?)
    `, [employeeId, hourly_rate, session.employee_id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating hourly rate:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
