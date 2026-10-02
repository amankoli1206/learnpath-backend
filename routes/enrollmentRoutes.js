const express = require('express');
const router = express.Router();
const { createEnrollment, getEnrollments } = require('../controllers/enrollmentController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(protect, getEnrollments)
  .post(protect, createEnrollment);

module.exports = router;
