const express = require('express');
const router = express.Router();
const { shareProgress } = require('../controllers/shareController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, shareProgress);

module.exports = router;
