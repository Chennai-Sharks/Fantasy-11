const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: {
    type: Number,
    trim: true
  },
  email: {
    type: String,
    lowercase: true
  },
  password: {
    type: String,
    max: 1000,
    min: 8
  },
  pointHistory: [],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
