// In backend route
router.get('/nearby/:memberId', async (req, res) => {
  const user = await User.findOne({ memberId: req.params.memberId });
  const allUsers = await User.find({ memberId: { $ne: user.memberId } });

  const nearby = allUsers.filter(u => {
    if (!u.location) return false;
    const dx = u.location.lat - user.location.lat;
    const dy = u.location.lng - user.location.lng;
    const distance = Math.sqrt(dx*dx + dy*dy);
    return distance < 0.01; // roughly ~1km
  });

  res.json({ nearby });
});
