const Department = require('../models/Department');
const Event = require('../models/Event');
const Participant = require('../models/Participant');

exports.getDepartments = async (req, res) => {
  try {
    const depts = await Department.find().populate('hod', 'name email');
    
    // Enrich with stats
    const enriched = await Promise.all(depts.map(async (dept) => {
      const eventCount = await Event.countDocuments({ department: dept.name });
      // Count participants across all events of this department
      const events = await Event.find({ department: dept.name }, '_id');
      const eventIds = events.map(e => e._id);
      const participantCount = await Participant.countDocuments({ eventId: { $in: eventIds } });

      return {
        ...dept.toObject(),
        eventCount,
        participantCount
      };
    }));

    res.json(enriched);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const { name, description, hod } = req.body;
    const dept = new Department({ name, description, hod });
    await dept.save();
    res.status(201).json(dept);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const { name, description, hod } = req.body;
    const dept = await Department.findByIdAndUpdate(
      req.params.id, 
      { name, description, hod }, 
      { new: true }
    );
    if (!dept) return res.status(404).json({ message: 'Dept not found' });
    res.json(dept);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const dept = await Department.findByIdAndDelete(req.params.id);
    if (!dept) return res.status(404).json({ message: 'Dept not found' });
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
