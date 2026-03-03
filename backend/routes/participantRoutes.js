const express = require("express");
const router = express.Router();
const {
  registerParticipant,
  uploadPaymentProof,
} = require("../controllers/participantController");
const upload = require("../middleware/uploadMiddleware");

router.post("/register", registerParticipant);

router.post("/upload/:id", upload.single("screenshot"), uploadPaymentProof);

module.exports = router;
