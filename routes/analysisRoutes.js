const express = require('express');
const router = express.Router();
const { getSkillGapAnalysis } = require('../controllers/analysisController');
const { protect } = require('../middlewares/authMiddleware');

// GET /api/analysis/skill-gap
router.get('/skill-gap', protect, getSkillGapAnalysis);

module.exports = router;
