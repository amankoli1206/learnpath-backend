const express = require('express');
const router = express.Router();
const { getAllResources, getResource, createResource } = require('../controllers/resourceController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(protect, getAllResources)
  .post(protect, createResource);

router.route('/:id')
  .get(protect, getResource);

module.exports = router;
