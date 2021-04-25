const router = require('express').Router();
const User = require('../models/User');

router.get('/:id', async (req,res) => {
  try{
    let score = await User.findById(req.params.id);
    score = score.pointHistory;
    res.json(score);
  } catch(err) {
    res.status(400).send("Invalid ID");
  }
});

module.exports = router;
