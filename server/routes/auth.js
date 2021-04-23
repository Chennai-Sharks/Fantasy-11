const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//register auth route
router.post('/register', async (req, res) => {

  //this block of code is to check if the email doesn't already exists in the db
  const emailExist = await User.findOne({
    email: req.body.email
  });
  if (emailExist) return res.status(400).send("Email already exists");

  //this block of code is to hash the password and store the hashed password in the database
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(req.body.password, salt);

  //this block of code is to create a new user
  const user = new User({
    phone: req.body.phone,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    res.send({
      userId: savedUser._id,
      phone: savedUser.phone,
      email: savedUser.email
    });
  } catch (err) {
    res.status(400).send({
      message: err
    });
  }
});

//login auth route
router.post('/login', async (req, res) => {

  //this block of code is to check if the user has registered already by checking for it in the DB
  const user = await User.findOne({
    email: req.body.email
  });
  if (!user) return res.status(400).send("Email not found");    //if the email entered isn't found in the DB

  //this block of code checks the corresponding password is right for that particular email
  const validPassword = await bcryptjs.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  //create and assigning the tokens
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header('auth_Token', token).send(token);
  res.send({_id: user._id});
});


module.exports = router;
