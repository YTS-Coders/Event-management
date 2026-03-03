const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const { getAnalytics } = require("../controllers/analyticsController");

router.get("/", protect, authorizeRoles("ADMIN", "HOD"), getAnalytics);

module.exports = router;
