const express = require('express').Router();

router.get('/:id', async (req,res) => {
  const score = await User.findById(req.params.id);
  score = score.
  res.send(ans);
});
