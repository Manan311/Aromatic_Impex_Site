#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting API Authentication Fix${NC}"
echo "============================================="

# Check if we're in a Next.js project
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Make sure you're in your Next.js project root.${NC}"
    exit 1
fi

# Create backup directory
BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo -e "${YELLOW}📦 Created backup directory: $BACKUP_DIR${NC}"

# Function to backup existing file if it exists
backup_file() {
    local file_path="$1"
    if [ -f "$file_path" ]; then
        cp "$file_path" "$BACKUP_DIR/"
        echo -e "${YELLOW}💾 Backed up: $file_path${NC}"
    fi
}

# Create directory structure
echo -e "${BLUE}📁 Creating API directory structure...${NC}"
mkdir -p app/api/admin/employees
mkdir -p app/api/admin/time-entries
mkdir -p app/api/admin/stats
mkdir -p app/api/employee/me
mkdir -p app/api/employee/stats
mkdir -p app/api/employee/clock-in
mkdir -p app/api/employee/clock-out
mkdir -p lib

# Backup existing files
echo -e "${BLUE}💾 Backing up existing files...${NC}"
backup_file "lib/database.ts"
backup_file "lib/auth.ts"

# Update database.ts
echo -e "${GREEN}🔧 Updating lib/database.ts...${NC}"
cat > lib/database.ts << 'EOF'
import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      acquireTimeout: 60000,
      timeout: 60000,
      ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
      } : undefined,
      // Add these for better connection handling
      reconnect: true,
      idleTimeout: 300000, // 5 minutes
      maxIdle: 5,
    });

    // Handle pool errors
    pool.on('connection', (connection) => {
      console.log('📊 New database connection established as id ' + connection.threadId);
    });

    pool.on('error', (err) => {
      console.error('💥 Database pool error:', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') {
        // Connection lost, pool will reconnect automatically
        console.log('🔄 Database connection lost, pool will reconnect...');
      }
    });
  }
  return pool;
}

export async function executeQuery(query: string, params: any[] = []) {
  try {
    console.log('🔍 Executing query:', query.substring(0, 100) + (query.length > 100 ? '...' : ''));
    console.log('📝 Parameters:', params);

    const poolConnection = getPool();
    const [results] = await poolConnection.execute(query, params);
    
    console.log('✅ Query executed successfully');
    return results as any[];
  } catch (error) {
    console.error('💥 Database query error:', error);
    console.error('🔍 Failed query:', query);
    console.error('📝 Failed params:', params);
    throw error;
  }
}

// Helper function to test database connection
export async function testConnection() {
  try {
    await executeQuery('SELECT 1 as test');
    console.log('✅ Database connection test successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection test failed:', error);
    return false;
  }
}
EOF

# Update auth.ts
echo -e "${GREEN}🔧 Updating lib/auth.ts...${NC}"
cat > lib/auth.ts << 'EOF'
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
EOF

# Create Admin Employees API
echo -e "${GREEN}🔧 Creating app/api/admin/employees/route.ts...${NC}"
cat > app/api/admin/employees/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import { getEmployeeFromSession } from '@/lib/auth';
import { executeQuery } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Admin employees API called');

    // Extract session ID from cookies
    const sessionId = request.cookies.get('session-id')?.value;
    console.log('🍪 Session ID from cookie:', sessionId ? 'EXISTS' : 'MISSING');

    if (!sessionId) {
      console.log('❌ No session cookie - returning 401');
      return NextResponse.json({ error: 'Unauthorized - No session cookie' }, { status: 401 });
    }

    const session = await getEmployeeFromSession(sessionId);
    console.log('🔐 Session result:', session);

    if (!session) {
      console.log('❌ Invalid session - returning 401');
      return NextResponse.json({ error: 'Unauthorized - Invalid session' }, { status: 401 });
    }

    console.log('✅ Session found for user:', session.username, 'with role:', session.role);

    if (!['admin', 'manager'].includes(session.role)) {
      console.log('❌ Insufficient role:', session.role, 'required: admin or manager');
      return NextResponse.json({ error: 'Unauthorized - Insufficient role' }, { status: 401 });
    }

    console.log('✅ Role check passed, fetching employees...');

    const employees = await executeQuery(`
      SELECT id, username, first_name, last_name, email, role, hourly_rate, hire_date, is_active
      FROM employees 
      WHERE role IN ('employee', 'manager') AND is_active = TRUE
      ORDER BY first_name, last_name
    `);

    console.log('📊 Found employees:', employees.length);

    return NextResponse.json(employees);
  } catch (error) {
    console.error('❌ Admin employees API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
EOF

# Create Admin Time Entries API
echo -e "${GREEN}🔧 Creating app/api/admin/time-entries/route.ts...${NC}"
cat > app/api/admin/time-entries/route.ts << 'EOF'
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
EOF

# Create Admin Stats API
echo -e "${GREEN}🔧 Creating app/api/admin/stats/route.ts...${NC}"
cat > app/api/admin/stats/route.ts << 'EOF'
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
    const [totalEmployeesResult] = await executeQuery(`
      SELECT COUNT(*) as count 
      FROM employees 
      WHERE is_active = TRUE AND role IN ('employee', 'manager')
    `);

    // Currently clocked in employees
    const [currentlyClockedInResult] = await executeQuery(`
      SELECT COUNT(*) as count 
      FROM time_entries 
      WHERE clock_out_time IS NULL AND DATE(clock_in_time) = ?
    `, [today]);

    // Today's hours and cost
    const [todayStatsResult] = await executeQuery(`
      SELECT 
        COALESCE(SUM(total_hours), 0) as totalHours,
        COALESCE(SUM(total_pay), 0) as totalCost
      FROM time_entries 
      WHERE DATE(clock_in_time) = ?
    `, [today]);

    // This week's hours and cost
    const [weekStatsResult] = await executeQuery(`
      SELECT 
        COALESCE(SUM(total_hours), 0) as totalHours,
        COALESCE(SUM(total_pay), 0) as totalCost
      FROM time_entries 
      WHERE DATE(clock_in_time) >= ?
    `, [weekStartStr]);

    // Total entries count
    const [entriesCountResult] = await executeQuery(`
      SELECT COUNT(*) as count 
      FROM time_entries
    `);

    const stats = {
      totalEmployees: totalEmployeesResult.count || 0,
      currentlyClockedIn: currentlyClockedInResult.count || 0,
      totalHoursToday: todayStatsResult.totalHours || 0,
      totalCostToday: todayStatsResult.totalCost || 0,
      totalHoursWeek: weekStatsResult.totalHours || 0,
      totalCostWeek: weekStatsResult.totalCost || 0,
      entriesTotal: entriesCountResult.count || 0
    };

    console.log('📊 Dashboard stats:', stats);

    return NextResponse.json(stats);
  } catch (error) {
    console.error('❌ Admin stats API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
EOF

# Create Employee Me API
echo -e "${GREEN}🔧 Creating app/api/employee/me/route.ts...${NC}"
cat > app/api/employee/me/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import { getEmployeeFromSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Employee me API called');

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

    console.log('✅ Employee found:', employee.username);

    return NextResponse.json(employee);
  } catch (error) {
    console.error('❌ Employee me API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
EOF

# Create Employee Stats API
echo -e "${GREEN}🔧 Creating app/api/employee/stats/route.ts...${NC}"
cat > app/api/employee/stats/route.ts << 'EOF'
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
    const [todayStatsResult] = await executeQuery(`
      SELECT 
        COALESCE(SUM(total_hours), 0) as todayHours,
        COALESCE(SUM(total_pay), 0) as todayPay
      FROM time_entries 
      WHERE employee_id = ? AND DATE(clock_in_time) = ?
    `, [employee.id, today]);

    // This week's hours and pay
    const [weekStatsResult] = await executeQuery(`
      SELECT 
        COALESCE(SUM(total_hours), 0) as weekHours,
        COALESCE(SUM(total_pay), 0) as weekPay
      FROM time_entries 
      WHERE employee_id = ? AND DATE(clock_in_time) >= ?
    `, [employee.id, weekStartStr]);

    // Check if currently clocked in
    const [currentShiftResult] = await executeQuery(`
      SELECT clock_in_time, workload_level, break_duration_minutes
      FROM time_entries 
      WHERE employee_id = ? AND clock_out_time IS NULL 
      ORDER BY clock_in_time DESC 
      LIMIT 1
    `, [employee.id]);

    const isClocked = currentShiftResult.length > 0;
    const currentShift = isClocked ? currentShiftResult[0] : null;

    const stats = {
      todayHours: todayStatsResult.todayHours || 0,
      todayPay: todayStatsResult.todayPay || 0,
      weekHours: weekStatsResult.weekHours || 0,
      weekPay: weekStatsResult.weekPay || 0,
      isClocked: isClocked,
      currentShiftStart: currentShift ? currentShift.clock_in_time : null,
      currentWorkload: currentShift ? currentShift.workload_level : null,
      currentBreakTime: currentShift ? currentShift.break_duration_minutes : 0
    };

    console.log('📊 Employee stats:', stats);

    return NextResponse.json(stats);
  } catch (error) {
    console.error('❌ Employee stats API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
EOF

# Create Employee Clock In API
echo -e "${GREEN}🔧 Creating app/api/employee/clock-in/route.ts...${NC}"
cat > app/api/employee/clock-in/route.ts << 'EOF'
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
EOF

# Create Employee Clock Out API
echo -e "${GREEN}🔧 Creating app/api/employee/clock-out/route.ts...${NC}"
cat > app/api/employee/clock-out/route.ts << 'EOF'
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
EOF

# Create sample .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}📝 Creating sample .env.local file...${NC}"
    cat > .env.local << 'EOF'
# Database Configuration
DB_HOST=your_database_host
DB_PORT=3306
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=u265780679_aromatic_impex

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
EOF
    echo -e "${RED}⚠️  Please update .env.local with your actual database credentials!${NC}"
fi

# Final summary
echo ""
echo -e "${GREEN}✅ API Authentication Fix Complete!${NC}"
echo "============================================="
echo -e "${BLUE}📁 Files created/updated:${NC}"
echo "  • lib/database.ts (improved connection pooling)"
echo "  • lib/auth.ts (fixed session handling)"
echo "  • app/api/admin/employees/route.ts"
echo "  • app/api/admin/time-entries/route.ts"
echo "  • app/api/admin/stats/route.ts"
echo "  • app/api/employee/me/route.ts"
echo "  • app/api/employee/stats/route.ts"
echo "  • app/api/employee/clock-in/route.ts"
echo "  • app/api/employee/clock-out/route.ts"
echo ""
echo -e "${YELLOW}📦 Backup created in: $BACKUP_DIR${NC}"
echo ""
echo -e "${BLUE}🚀 Next Steps:${NC}"
echo "1. Update your .env.local with correct database credentials"
echo "2. Restart your development server: npm run dev"
echo "3. Clear browser cookies/cache"
echo "4. Login again with admin credentials"
echo "5. Test the dashboard - it should now show data!"
echo ""
echo -e "${GREEN}🎉 Your APIs should now work correctly!${NC}"
EOF