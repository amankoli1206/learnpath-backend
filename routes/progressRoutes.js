const express = require('express');
const router = express.Router();
const { getProgress } = require('../controllers/progressController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/user/:id', protect, getProgress);

module.exports = router;
