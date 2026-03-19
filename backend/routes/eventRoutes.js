const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createEvent,
  getPendingEvents,
  approveEvent,
  rejectEvent,
  getApprovedEvents,
  markEventCompleted,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  addComment,
  addRule,
} = require("../controllers/eventController");

const { verifyPayment } = require("../controllers/participantController");

router.get("/public", getApprovedEvents);

router.get("/pending", protect, authorizeRoles("ADMIN"), getPendingEvents);

router.post("/create", protect, createEvent);

router.get("/", protect, getEvents);
router.get("/my-events", protect, getEvents);
router.post("/comment/:id", protect, addComment);
router.post("/rule/:id", protect, addRule);
router.get("/:id", protect, getEventById);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

router.put("/approve/:id", protect, authorizeRoles("ADMIN"), approveEvent);

router.put("/reject/:id", protect, authorizeRoles("ADMIN"), rejectEvent);
router.put(
  "/verify/:id",
  protect,
  authorizeRoles("LEADER", "HOD"),
  verifyPayment,
);

router.put("/complete/:id", protect, markEventCompleted);

module.exports = router;
