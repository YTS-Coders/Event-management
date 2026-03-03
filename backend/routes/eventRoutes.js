const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createEvent,
  getPendingEvents,
  approveEvent,
  rejectEvent,
} = require("../controllers/eventController");

router.post("/create", protect, authorizeRoles("HOD", "LEADER"), createEvent);

router.get("/pending", protect, authorizeRoles("ADMIN"), getPendingEvents);

router.get("/public", getApprovedEvents);

router.put("/approve/:id", protect, authorizeRoles("ADMIN"), approveEvent);

router.put("/reject/:id", protect, authorizeRoles("ADMIN"), rejectEvent);
router.put(
  "/verify/:id",
  protect,
  authorizeRoles("LEADER", "HOD"),
  verifyPayment,
);

router.put("/complete/:id", protect, authorizeRoles("HOD"), markEventCompleted);

module.exports = router;
