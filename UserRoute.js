// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const QRCode = require('qrcode');
const crypto = require('crypto');

// Generate unique member ID
function generateMemberId() {
  return 'user' + crypto.randomBytes(4).toString('hex');
}

// Sign Up
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const memberId = generateMemberId();

  try {
    const profileLink = `https://nomspot.com/profile/${memberId}`;
    const qrUrl = await QRCode.toDataURL(profileLink);

    const newUser = new User({ username, email, password, memberId });
    await newUser.save();

    res.json({ success: true, memberId, qrUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Signup failed' });
  }
});

// Update Location
router.post('/update-location', async (req, res) => {
  const { memberId, lat, lng } = req.body;

  try {
    await User.updateOne({ memberId }, { location: { lat, lng } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Location update failed' });
  }
});

// Friend Request
router.post('/friend-request', async (req, res) => {
  const { from, to } = req.body;

  try {
    const user = await User.findOne({ memberId: from });
    const target = await User.findOne({ memberId: to });

    if (!user || !target) return res.status(404).json({ error: 'User not found' });

    if (!user.friends.includes(to)) {
      user.friends.push(to);
      await user.save();
    }

    res.json({ success: true, message: 'Friend added' });
  } catch (err) {
    res.status(500).json({ error: 'Friend request failed' });
  }
});

module.exports = router;
