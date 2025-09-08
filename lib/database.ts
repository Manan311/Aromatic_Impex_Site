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
