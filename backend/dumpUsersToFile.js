require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const User = require('./models/User');

const dumpUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const users = await User.find({});
    fs.writeFileSync('users_dump.json', JSON.stringify(users, null, 2));
    console.log('Dumped users to users_dump.json');
    process.exit(0);
  } catch (err) {
    console.error('Dump Error:', err);
    process.exit(1);
  }
};

dumpUsers();
