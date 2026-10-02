const Milestone = require('../models/Milestone');

exports.createMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.create({ ...req.body, user: req.user.id });
    res.status(201).json(milestone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMilestones = async (req, res) => {
  try {
    const milestones = await Milestone.find({ user: req.user.id });
    res.json(milestones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
