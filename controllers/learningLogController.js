const LearningLog = require('../models/LearningLog');

exports.createLearningLog = async (req, res) => {
  try {
    const log = await LearningLog.create({ ...req.body, user: req.user.id });
    res.status(201).json(log);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getLearningLogs = async (req, res) => {
  try {
    const logs = await LearningLog.find({ user: req.user.id }).populate('skill resource');
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
