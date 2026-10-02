const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  firebaseUid: {
    type: String
  },
  role: {
    type: String,
    enum: ['learner', 'mentor', 'admin'],
    default: 'learner'
  },
  skillProfile: [{
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill'
    },
    currentLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
    },
    desiredLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
