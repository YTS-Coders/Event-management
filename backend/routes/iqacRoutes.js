const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { generateIQACReport, modifyIQACReport } = require("../controllers/iqacController");

router.post("/generate", 
  protect, 
  authorizeRoles("HOD"), 
  upload.fields([
    { name: 'invitationImage', maxCount: 1 },
    { name: 'resourcePersonProfile', maxCount: 1 },
    { name: 'attendanceImage', maxCount: 1 },
    { name: 'feedbackImage', maxCount: 1 },
    { name: 'eventImages', maxCount: 5 }
  ]), 
  generateIQACReport
);

router.post("/modify", protect, authorizeRoles("HOD"), modifyIQACReport);

module.exports = router;
