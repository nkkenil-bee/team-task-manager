const axios = require('axios');

const BASE_URL = "http://127.0.0.1:5000";
const API_URL = `${BASE_URL}/api`;

async function testFlow() {
  console.log('🚀 Starting User Flow Test...');

  try {
    // 1. Admin Signup
    console.log('\n1. Admin Signup...');
    const adminSignup = await axios.post(`${API_URL}/auth/signup`, {
      email: 'admin@example.com',
      password: 'password123',
      name: 'Project Admin',
      role: 'ADMIN'
    });
    const adminToken = adminSignup.data.token;
    console.log('✅ Admin signed up');

    // 2. Member Signup
    console.log('\n2. Member Signup...');
    const memberSignup = await axios.post(`${API_URL}/auth/signup`, {
      email: 'member@example.com',
      password: 'password123',
      name: 'Team Member',
      role: 'MEMBER'
    });
    const memberToken = memberSignup.data.token;
    const memberId = memberSignup.data.user.id;
    console.log('✅ Member signed up');

    // 3. Admin Login
    console.log('\n3. Admin Login...');
    const adminLogin = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@example.com',
      password: 'password123'
    });
    console.log('✅ Admin logged in');

    // 4. Admin Create Project
    console.log('\n4. Admin Create Project...');
    const projectResponse = await axios.post(`${API_URL}/projects`, {
      name: 'Test Project',
      description: 'A project for testing'
    }, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const projectId = projectResponse.data.id;
    console.log(`✅ Project created: ${projectId}`);

    // 5. Admin Add Member to Project
    console.log('\n5. Admin Add Member to Project...');
    await axios.post(`${API_URL}/projects/${projectId}/members`, {
      userId: memberId
    }, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log('✅ Member added to project');

    // 6. Admin Create Task and Assign
    console.log('\n6. Admin Create Task...');
    const taskResponse = await axios.post(`${API_URL}/tasks`, {
      title: 'Complete assessment',
      description: 'Finish the full-stack task',
      dueDate: new Date(Date.now() + 86400000).toISOString(),
      projectId: projectId,
      assigneeId: memberId
    }, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const taskId = taskResponse.data.id;
    console.log(`✅ Task created and assigned: ${taskId}`);

    // 7. Member View Tasks
    console.log('\n7. Member View Tasks...');
    const memberTasks = await axios.get(`${API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${memberToken}` }
    });
    console.log(`✅ Member tasks fetched. Count: ${memberTasks.data.length}`);

    // 8. Member Update Task Status
    console.log('\n8. Member Update Task Status...');
    await axios.patch(`${API_URL}/tasks/${taskId}/status`, {
      status: 'IN_PROGRESS'
    }, {
      headers: { Authorization: `Bearer ${memberToken}` }
    });
    console.log('✅ Task status updated to IN_PROGRESS');

    // 9. Dashboard Stats
    console.log('\n9. Dashboard Stats...');
    const stats = await axios.get(`${API_URL}/dashboard/stats`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log('✅ Dashboard stats:', stats.data);

    console.log('\n✨ All tests passed successfully!');

  } catch (error) {
    console.error('❌ Test failed!');
    if (error.response) {
      console.error('Response Data:', error.response.data);
      console.error('Status:', error.response.status);
    } else {
      console.error('Error Message:', error.message);
    }
  }
}

// Check if server is up first using the correct IP and health endpoint
console.log(`🔍 Checking server health at ${BASE_URL}/health...`);
axios.get(`${BASE_URL}/health`)
  .then(() => testFlow())
  .catch(() => console.error(`❌ Error: Server is not running on ${BASE_URL}. Please start it with "npm run dev" first.`));
