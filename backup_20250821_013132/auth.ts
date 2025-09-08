import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import pool from './db';
import { cookies } from 'next/headers';

export interface Employee {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'employee' | 'admin' | 'manager';
  hourly_rate: number;
  hire_date: string;
  is_active: boolean;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function authenticateUser(username: string, password: string): Promise<Employee | null> {
  try {
    console.log('🔍 Authenticating user:', username);

    const [rows] = await pool.execute(
      'SELECT * FROM employees WHERE username = ? AND is_active = TRUE',
      [username]
    );
    
    const employees = rows as any[];

    if (!employees) {
      console.log('❌ User not found:', username);
      return null;
    }

    console.log('✅ User found:', username, 'role:', employees.forEach(employees => employees.role));

    if (employees.length === 0) return null;
    
    const employee = employees[0];
    const isValid = await verifyPassword(password, employee.password);
    
    if (!isValid) return null;
    
    const { password: _, ...employeeWithoutPassword } = employee;
    return employeeWithoutPassword;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function createSession(employeeId: number): Promise<string> {
  try {
  const sessionId = uuidv4();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  
  console.log('🔐 Creating session for employee:', employeeId);

  await pool.execute(
    'INSERT INTO user_sessions (id, employee_id, expires_at) VALUES (?, ?, ?)',
    [sessionId, employeeId, expiresAt]
  );

  console.log('✅ Session created:', sessionId);

  return sessionId;
} catch (error) {
  console.error('❌ Session creation error:', error);
  throw error;
}}

export async function getEmployeeFromSession(sessionId: string): Promise<Employee | null> {
  try {
    console.log('🔍 Verifying session, cookie value:', sessionId ? 'EXISTS' : 'MISSING');

    if (!sessionId) {
      console.log('❌ No session cookie found');
      return null;
    }

    const [rows] = await pool.execute(`
      SELECT e.* FROM employees e
      JOIN user_sessions s ON e.id = s.employee_id
      WHERE s.id = ? AND s.expires_at > NOW() AND e.is_active = TRUE
    `, [sessionId]);
    
    if (!rows) {
      console.log('❌ Session not found in database:', sessionId);
      return null;
    }

    console.log('✅ Session verified for user:', sessionId);

    const employees = rows as Employee[];
    return employees.length > 0 ? employees[0] : null;
  } catch (error) {
    console.error('Session verification error:', error);
    return null;
  }
}

export async function getCurrentEmployee(): Promise<Employee | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session-id')?.value;
  
  if (!sessionId) return null;
  return getEmployeeFromSession(sessionId);
}

export async function destroySession(sessionId: string): Promise<void> {
  await pool.execute('DELETE FROM user_sessions WHERE id = ?', [sessionId]);
}
