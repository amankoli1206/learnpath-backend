const mongoose = require('mongoose');

const learningLogSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource'
  },
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill'
  },
  hoursSpent: {
    type: Number,
    required: true
  },
  notes: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('LearningLog', learningLogSchema);
