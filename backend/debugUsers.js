require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const users = await User.find({}, 'name email role department');
    console.log('--- DATABASE USERS ---');
    console.log(JSON.stringify(users, null, 2));
    console.log('----------------------');
    process.exit(0);
  } catch (err) {
    console.error('DB Error:', err);
    process.exit(1);
  }
};

checkUsers();
