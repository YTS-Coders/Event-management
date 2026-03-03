const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const { generateSESReport } = require("../controllers/sesController");

router.post("/generate", protect, authorizeRoles("HOD"), generateSESReport);

module.exports = router;
