import { NextRequest, NextResponse } from 'next/server';
import { getCurrentEmployee } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const employee = await getCurrentEmployee();
    
    if (!employee) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({ employee: {
      id: employee.id,
      username: employee.username,
      role: employee.role} });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
