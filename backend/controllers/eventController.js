const Event = require("../models/Event");
const Participant = require("../models/Participant");

exports.createEvent = async (req, res) => {
  const { title, description, upiId, amount, participantIdPrefix } = req.body;

  const event = await Event.create({
    title,
    description,
    department: req.user.department,
    createdBy: req.user._id,
    upiId,
    amount,
    participantIdPrefix,
    status: "PENDING",
  });

  res.json(event);
};

exports.getPendingEvents = async (req, res) => {
  const events = await Event.find({ status: "PENDING" });
  res.json(events);
};

exports.approveEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  event.status = "APPROVED";
  await event.save();
  res.json({ message: "Event Approved" });
};

exports.rejectEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  event.status = "REJECTED";
  await event.save();
  res.json({ message: "Event Rejected" });
};

exports.getApprovedEvents = async (req, res) => {
  const events = await Event.find({ status: "APPROVED" });
  res.json(events);
};

exports.uploadPaymentProof = async (req, res) => {
  const participant = await Participant.findById(req.params.id);

  participant.paymentScreenshot = req.file.path;
  participant.paymentStatus = "PENDING";

  await participant.save();

  res.json({ message: "Screenshot Uploaded" });
};

exports.markEventCompleted = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  event.status = "COMPLETED";
  await event.save();

  res.json({ message: "Event marked as completed" });
};
