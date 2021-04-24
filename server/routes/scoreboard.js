const express = require('express').Router();

router.get('/:id', async (req,res) => {
  const ans = await User.findById(req.params.id);
  res.send(ans);
});

router.post('/user/scorecardDetails', async (req,res) => {

});
