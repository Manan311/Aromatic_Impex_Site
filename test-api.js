// Simple API test script
// Run with: node test-api.js

const testAPI = async () => {
  console.log('🔍 Testing API endpoints...\n');
  
  try {
    // Test auth endpoint
    console.log('Testing /api/auth/me:');
    const authRes = await fetch('http://localhost:3000/api/auth/me');
    const authData = await authRes.text();
    console.log('Status:', authRes.status);
    console.log('Response:', authData.substring(0, 200));
    console.log('');
    
    // Test employees endpoint
    console.log('Testing /api/admin/employees:');
    const empRes = await fetch('http://localhost:3000/api/admin/employees');
    const empData = await empRes.text();
    console.log('Status:', empRes.status);
    console.log('Response:', empData.substring(0, 200));
    console.log('');
    
    if (empRes.status === 401) {
      console.log('🔐 Authentication required - this is expected');
      console.log('💡 Log in to your application first, then test again');
    }
    
    // Test stats endpoint
    console.log('Testing /api/admin/stats:');
    const statsRes = await fetch('http://localhost:3000/api/admin/stats');
    const statsData = await statsRes.text();
    console.log('Status:', statsRes.status);
    console.log('Response:', statsData.substring(0, 200));
    
  } catch (error) {
    console.error('❌ Error testing APIs:', error.message);
    console.log('💡 Make sure your server is running: npm run dev');
  }
};

testAPI();
