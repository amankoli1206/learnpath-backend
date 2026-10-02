const User = require('../models/User');

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id, 
      { skillProfile: req.body.skillProfile }, 
      { new: true }
    );
    res.json(user.skillProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
