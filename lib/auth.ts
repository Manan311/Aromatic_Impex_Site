import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { executeQuery } from './database';
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

    const employees = await executeQuery(
      'SELECT * FROM employees WHERE username = ? AND is_active = TRUE',
      [username]
    );
    
    if (!employees || employees.length === 0) {
      console.log('❌ User not found:', username);
      return null;
    }

    const employee = employees[0];
    console.log('✅ User found:', username, 'role:', employee.role);

    const isValid = await verifyPassword(password, employee.password);
    
    if (!isValid) {
      console.log('❌ Invalid password for user:', username);
      return null;
    }
    
    // Remove password from response
    const { password: _, ...employeeWithoutPassword } = employee;
    console.log('✅ Authentication successful for:', username);
    return employeeWithoutPassword;
  } catch (error) {
    console.error('❌ Authentication error:', error);
    return null;
  }
}

export async function createSession(employeeId: number): Promise<string> {
  try {
    const sessionId = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now
    
    console.log('🍪 Creating session for employee:', employeeId);

    await executeQuery(
      'INSERT INTO user_sessions (id, employee_id, expires_at) VALUES (?, ?, ?)',
      [sessionId, employeeId, expiresAt]
    );

    console.log('✅ Session created:', sessionId);
    return sessionId;
  } catch (error) {
    console.error('❌ Session creation error:', error);
    throw error;
  }
}

export async function getEmployeeFromSession(sessionId: string): Promise<Employee | null> {
  try {
    console.log('🔍 Verifying session:', sessionId ? 'EXISTS' : 'MISSING');

    if (!sessionId) {
      console.log('❌ No session ID provided');
      return null;
    }

    const results = await executeQuery(`
      SELECT e.* FROM employees e
      JOIN user_sessions s ON e.id = s.employee_id
      WHERE s.id = ? AND s.expires_at > NOW() AND e.is_active = TRUE
    `, [sessionId]);
    
    if (!results || results.length === 0) {
      console.log('❌ Session not found or expired:', sessionId);
      return null;
    }

    const employee = results[0] as Employee;
    console.log('✅ Session verified for user:', employee.username);
    return employee;
  } catch (error) {
    console.error('❌ Session verification error:', error);
    return null;
  }
}

export async function getCurrentEmployee(): Promise<Employee | null> {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session-id')?.value;
    
    if (!sessionId) {
      console.log('❌ No session cookie found');
      return null;
    }
    
    return getEmployeeFromSession(sessionId);
  } catch (error) {
    console.error('❌ Get current employee error:', error);
    return null;
  }
}

export async function destroySession(sessionId: string): Promise<void> {
  try {
    await executeQuery('DELETE FROM user_sessions WHERE id = ?', [sessionId]);
    console.log('✅ Session destroyed:', sessionId);
  } catch (error) {
    console.error('❌ Session destruction error:', error);
    throw error;
  }
}
