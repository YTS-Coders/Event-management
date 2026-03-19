require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const testAuth = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const admin = await User.findOne({ email: 'admin@college.edu' });
    if (!admin) {
      console.log('Admin not found!');
      process.exit(1);
    }
    
    console.log('Testing admin@college.edu / admin123...');
    const match = await bcrypt.compare('admin123', admin.password);
    console.log('Result:', match ? '✅ MATCH' : '❌ FAIL');
    
    const hod = await User.findOne({ email: 'hod_cs@college.edu' });
    console.log('Testing hod_cs@college.edu / password123...');
    const matchHOD = await bcrypt.compare('password123', hod.password);
    console.log('Result:', matchHOD ? '✅ MATCH' : '❌ FAIL');
    
    process.exit(0);
  } catch (err) {
    console.error('Test Error:', err);
    process.exit(1);
  }
};

testAuth();
