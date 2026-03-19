const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true
  },
  hod: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  description: {
    type: String,
    trim: true
  },
  image: String // Optional: URL for a department image icon
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);
