const LearningLog = require('../models/LearningLog');

exports.getProgress = async (req, res) => {
  try {
    const logs = await LearningLog.find({ user: req.params.id });
    res.json({ message: "Progress data fetched successfully", totalLogs: logs.length, logs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
