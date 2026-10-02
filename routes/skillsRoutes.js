const express = require('express');
const router = express.Router();
const { getAllSkills, getSkill, createSkill, updateSkill, deleteSkill } = require('../controllers/skillsController');

router.route('/')
  .get(getAllSkills)
  .post(createSkill);

router.route('/:id')
  .get(getSkill)
  .put(updateSkill)
  .delete(deleteSkill);

module.exports = router;
