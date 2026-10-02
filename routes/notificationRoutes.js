const express = require('express');
const router = express.Router();
const { sendNotification } = require('../controllers/notificationController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/send', protect, sendNotification);

module.exports = router;
