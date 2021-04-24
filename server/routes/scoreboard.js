const router = require('express').Router();
const User = require('../models/User');

router.get('/:id', async (req,res) => {
  const score = await User.findById(req.params.id);
  res.json(score);
});

module.exports = router;
