const Participant = require("../models/Participant");

const generateParticipantId = async (eventId, prefix) => {
  const count = await Participant.countDocuments({ eventId });

  if (prefix) {
    return prefix + String(count + 1).padStart(3, "0");
  } else {
    return "PART" + String(count + 1).padStart(3, "0");
  }
};

module.exports = generateParticipantId;
