const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/profileController');
const { protect } = require('../middlewares/authMiddleware');

router.put('/', protect, updateProfile);

module.exports = router;
