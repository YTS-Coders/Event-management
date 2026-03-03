const Participant = require("../models/Participant");
const Event = require("../models/Event");
const generateParticipantId = require("../utils/generateParticipantId");
const QRCode = require("qrcode");
const nodemailer = require("nodemailer");
const cloudinary = require("../config/cloudinary");

exports.registerParticipant = async (req, res) => {
  const { name, email, phone, eventId } = req.body;

  const event = await Event.findById(eventId);

  if (event.status !== "APPROVED") {
    return res.status(400).json({ message: "Event not available" });
  }

  const participantId = await generateParticipantId(
    eventId,
    event.participantIdPrefix,
  );

  const qrData = `upi://pay?pa=${event.upiId}&pn=SHC EVENT&am=${event.amount}`;
  const qrImage = await QRCode.toDataURL(qrData);

  const participant = await Participant.create({
    participantId,
    name,
    email,
    phone,
    eventId,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Registration Confirmation",
    html: `
      <h2>Registration Successful</h2>
      <p>Your Participant ID: <b>${participantId}</b></p>
      <p>Event: ${event.title}</p>
      <p>Please complete payment.</p>
    `,
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Payment QR Code",
    html: `
      <h2>Scan to Pay</h2>
      <img src="${qrImage}" />
    `,
  });

  res.json({
    message: "Registered Successfully",
    participantId,
    qrImage,
  });
};

exports.verifyPayment = async (req, res) => {
  const participant = await Participant.findById(req.params.id);

  participant.paymentStatus = req.body.status;

  await participant.save();

  res.json({ message: "Payment Updated" });
};

exports.uploadPaymentProof = async (req, res) => {
  const participant = await Participant.findById(req.params.id);

  const result = await cloudinary.uploader.upload(req.file.path);

  participant.paymentScreenshot = result.secure_url;
  participant.paymentStatus = "PENDING";

  await participant.save();

  res.json({ message: "Uploaded to Cloud", url: result.secure_url });
};

exports.verifyPayment = async (req, res) => {
  const participant = await Participant.findById(req.params.id);

  if (!participant) {
    return res.status(404).json({ message: "Participant not found" });
  }

  if (!participant.paymentScreenshot) {
    return res.status(400).json({ message: "No payment proof uploaded" });
  }

  participant.paymentStatus = req.body.status;
  participant.verifiedBy = req.user._id;

  await participant.save();

  res.json({ message: "Payment Verified Successfully" });
};