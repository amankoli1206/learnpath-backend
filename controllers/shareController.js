exports.shareProgress = async (req, res) => {
  try {
    // In a real app, this might send an email or a notification to a mentor
    res.json({ message: "Progress shared successfully with mentors/peers!", sharedData: req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
