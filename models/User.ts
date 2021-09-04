const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: {
    type: Number,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
  },
  password: {
    type: String,
    max: 1000,
    min: 8,
  },
  salt: {
    type: String,
    max: 1000,
    min: 2,
  },
  pointHistory: [],
  date: {
    type: Date,
    default: Date.now,
  },
});

mongoose.models = {};

const User = mongoose.model('User', userSchema);

export default User;
