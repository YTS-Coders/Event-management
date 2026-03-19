const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const { getAnalytics, getDepartmentAnalytics, getLeaderAnalytics } = require("../controllers/analyticsController");

router.get("/", protect, authorizeRoles("ADMIN", "HOD"), getAnalytics);
router.get("/departments", protect, authorizeRoles("ADMIN"), getDepartmentAnalytics);
router.get("/leader", protect, authorizeRoles("LEADER"), getLeaderAnalytics);

module.exports = router;
