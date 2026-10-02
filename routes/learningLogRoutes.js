const express = require('express');
const router = express.Router();
const { createLearningLog, getLearningLogs } = require('../controllers/learningLogController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(protect, getLearningLogs)
  .post(protect, createLearningLog);

module.exports = router;
