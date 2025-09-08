import mysql from 'mysql2/promise';

let connection: mysql.Connection | null = null;

async function getConnection() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
      } : undefined
    });
  }
  return connection;
}

export async function executeQuery(query: string, params: any[] = []) {
  try {
    const conn = await getConnection();
    const [results] = await conn.execute(query, params);
    return results as any[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}
