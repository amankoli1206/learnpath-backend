const Resource = require('../models/Resource');

exports.getAdminResources = async (req, res) => {
  try {
    // In a real app, you would check if req.user.role === 'admin'
    const resources = await Resource.find();
    res.json({ message: "Admin access: All Resources", resources });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
