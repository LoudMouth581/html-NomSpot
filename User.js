// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String, // hashed!
  memberId: String,
  location: {
    lat: Number,
    lng: Number
  },
  friends: [String] // array of memberIds
});

module.exports = mongoose.model('User', userSchema);
