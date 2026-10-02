const Resource = require('../models/Resource');

exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    res.json(resource);
  } catch (error) {
    res.status(404).json({ error: 'Resource not found' });
  }
};

exports.createResource = async (req, res) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
