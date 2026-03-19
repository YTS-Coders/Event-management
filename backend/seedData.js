require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Event = require('./models/Event');
const Participant = require('./models/Participant');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // 1. Create HOD and Leader
    const password = await bcrypt.hash('password123', 10);
    
    const hod = await User.findOneAndUpdate(
      { email: 'hod_cs@college.edu' },
      { name: 'Dr. John Doe', password, role: 'HOD', department: 'Computer Science' },
      { upsert: true, new: true }
    );

    const leader = await User.findOneAndUpdate(
      { email: 'leader_cs@college.edu' },
      { name: 'Alice Smith', password, role: 'LEADER', department: 'Computer Science' },
      { upsert: true, new: true }
    );

    console.log('Created/Updated HOD and Leader accounts.');

    // 2. Create Events
    const events = [
      {
        title: 'Cyber Security Workshop',
        description: 'A deep dive into network security and ethical hacking.',
        department: 'Computer Science',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdBy: hod._id,
        upiId: 'college@upi',
        amount: 200,
        participantIdPrefix: 'CSW',
        status: 'APPROVED',
        rules: ['Laptops required', 'Basic networking knowledge', 'Registration starts at 9 AM']
      },
      {
        title: 'Inter-College Hackathon',
        description: '24-hour coding challenge for developers.',
        department: 'Computer Science',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        createdBy: hod._id,
        upiId: 'college@upi',
        amount: 500,
        participantIdPrefix: 'HACK',
        status: 'PENDING',
        rules: ['Teams of 2-4', 'Original projects only']
      },
      {
        title: 'Cloud Computing Seminar',
        description: 'Introduction to AWS and Azure services.',
        department: 'Computer Science',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        createdBy: hod._id,
        upiId: 'college@upi',
        amount: 0,
        participantIdPrefix: 'CLOUD',
        status: 'COMPLETED',
        rules: ['Open to all years']
      }
    ];

    const createdEvents = [];
    for (const eventData of events) {
      const event = await Event.findOneAndUpdate(
        { title: eventData.title },
        eventData,
        { upsert: true, new: true }
      );
      createdEvents.push(event);
    }
    console.log('Created/Updated 3 test events.');

    // 3. Create Participants for the Approved Event
    const approvedEvent = createdEvents[0];
    const participants = [
      {
        participantId: 'CSW001',
        name: 'Bob Martin',
        email: 'bob@student.edu',
        phone: '9876543210',
        eventId: approvedEvent._id,
        paymentScreenshot: 'https://via.placeholder.com/400x600?text=Payment+Proof+1',
        paymentStatus: 'APPROVED',
        verifiedBy: leader._id
      },
      {
        participantId: 'CSW002',
        name: 'Charlie Brown',
        email: 'charlie@student.edu',
        phone: '9876543211',
        eventId: approvedEvent._id,
        paymentScreenshot: 'https://via.placeholder.com/400x600?text=Payment+Proof+2',
        paymentStatus: 'PENDING'
      }
    ];

    for (const p of participants) {
      await Participant.findOneAndUpdate(
        { email: p.email, eventId: p.eventId },
        p,
        { upsert: true }
      );
    }
    console.log('Created 2 test participants.');

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seed();
