import { executeQuery } from './lib/database.js';

const testEmployees = async () => {
  try {
    console.log('🔍 Testing employees query...');
    
    // Test 1: Count all employees
    const [count] = await executeQuery('SELECT COUNT(*) as total FROM employees');
    console.log('📊 Total employees in database:', count.total);
    
    // Test 2: Count active employees
    const [activeCount] = await executeQuery('SELECT COUNT(*) as total FROM employees WHERE is_active = TRUE');
    console.log('📊 Active employees:', activeCount.total);
    
    // Test 3: Get all employees (exact same query as API)
    const employees = await executeQuery(`
      SELECT id, username, first_name, last_name, email, role, hourly_rate, hire_date, is_active
      FROM employees 
      WHERE role IN ('employee', 'manager') AND is_active = TRUE
      ORDER BY first_name, last_name
    `);
    
    console.log('👥 Employees from API query:', employees.length);
    console.log('📝 Employee data:', employees);
    
    // Test 4: Get admin user specifically
    const [admin] = await executeQuery('SELECT * FROM employees WHERE username = ?', ['admin']);
    console.log('👤 Admin user:', admin ? 'Found' : 'Not found');
    if (admin) {
      console.log('👤 Admin details:', {
        id: admin.id,
        username: admin.username,
        role: admin.role,
        is_active: admin.is_active
      });
    }
    
  } catch (error) {
    console.error('❌ Database test error:', error);
  }
};

testEmployees();
