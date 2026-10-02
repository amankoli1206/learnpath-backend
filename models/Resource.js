const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['course', 'tutorial', 'article', 'video']
  },
  url: {
    type: String
  },
  relatedSkills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }]
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
