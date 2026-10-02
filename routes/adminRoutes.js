const express = require('express');
const router = express.Router();
const { getAdminResources } = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/resources', protect, getAdminResources);

module.exports = router;
