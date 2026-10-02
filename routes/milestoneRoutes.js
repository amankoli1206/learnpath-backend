const express = require('express');
const router = express.Router();
const { createMilestone, getMilestones } = require('../controllers/milestoneController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(protect, getMilestones)
  .post(protect, createMilestone);

module.exports = router;
