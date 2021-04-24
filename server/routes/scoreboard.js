const express = require('express').Router();

router.get('/user/scorecard', async (req,res) => {
  const ans = await User.findOne({userHistory});
  res.send(ans);
});

router.post('/user/scorecardDetails', async (req,res) => {
  
});
