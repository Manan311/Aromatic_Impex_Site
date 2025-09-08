const mysql = require("mysql2/promise");
require("dotenv").config({ path: ".env.local" });

const colors = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  reset: "\x1b[0m",
  bold: "\x1b[1m",
};

function log(color, message) {
  console.log(`${color}${message}${colors.reset}`);
}

async function testDatabaseConnection() {
  console.log(`${colors.bold}🚀 Aromatic Impex Database Setup${colors.reset}`);
  console.log("================================================");

  const requiredVars = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];
  const missing = requiredVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    log(colors.red, `❌ Missing environment variables: ${missing.join(", ")}`);
    log(
      colors.yellow,
      "💡 Make sure you have copied .env.local.template to .env.local"
    );
    log(colors.yellow, "💡 And filled in your Hostinger database credentials");
    process.exit(1);
  }

  try {
    log(colors.blue, "🔌 Connecting to database...");

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT || "3306"),
    });

    log(colors.green, "✅ Database connected successfully!");

    const [tables] = await connection.execute(
      "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ?",
      [process.env.DB_NAME]
    );

    const expectedTables = [
      "employees",
      "time_entries",
      "user_sessions",
      "pay_adjustments",
      "quote_requests",
    ];
    const existingTables = tables.map((row) => row.TABLE_NAME);

    log(colors.blue, "📋 Checking tables...");
    expectedTables.forEach((table) => {
      if (existingTables.includes(table)) {
        log(colors.green, `   ✅ ${table}`);
      } else {
        log(colors.red, `   ❌ ${table} (missing)`);
      }
    });

    await connection.end();
    log(colors.green, "🎉 Database setup verification complete!");
  } catch (error) {
    log(colors.red, "❌ Database connection failed!");
    console.error(`   Error: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  testDatabaseConnection();
}
