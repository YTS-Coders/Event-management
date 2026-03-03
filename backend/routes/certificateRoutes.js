const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { generateCertificate } = require("../controllers/certificateController");

router.get("/generate/:id", protect, generateCertificate);

module.exports = router;
