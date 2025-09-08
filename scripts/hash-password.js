const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  if (!password) {
    console.log('Usage: node scripts/hash-password.js your_password');
    process.exit(1);
  }
  
  try {
    const hash = await bcrypt.hash(password, 12);
    console.log('Password:', password);
    console.log('Hash:', hash);
    console.log('\nSQL Update:');
    console.log(`UPDATE employees SET password = '${hash}' WHERE username = 'admin';`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

hashPassword(process.argv[2]);
