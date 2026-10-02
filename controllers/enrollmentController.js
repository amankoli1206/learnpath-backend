const Enrollment = require('../models/Enrollment');

exports.createEnrollment = async (req, res) => {
  try {
    // req.user.id comes from the auth middleware
    const enrollment = await Enrollment.create({ ...req.body, user: req.user.id });
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user.id }).populate('resource');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
