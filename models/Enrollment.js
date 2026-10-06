const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
    required: true
  },
  status: {
    type: String,
    enum: ['enrolled', 'in-progress', 'completed'],   // choice
    default: 'enrolled'
  },
  progressPercentage: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
