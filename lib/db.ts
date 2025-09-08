import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'srv1769.hstgr.io',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'u265780679_aromatic_impex',
  port: parseInt(process.env.DB_PORT || '3306'),
};

const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
