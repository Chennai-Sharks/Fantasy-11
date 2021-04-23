const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');

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
});

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const client = require('twilio')(accountSid,authToken)

const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN

const smsKey = process.env.SMS_SECRET_KEY

router.post('/sendOTP', (req, res) => {
	const phone = req.body.phone;
	const otp = Math.floor(100000 + Math.random() * 900000);
	const ttl = 2 * 60 * 1000;
	const expires = Date.now() + ttl;
	const data = `${phone}.${otp}.${expires}`;
	const hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
	const fullHash = `${hash}.${expires}`;

	client.messages
		.create({
			body: `Your One Time Login Password For Fantasy 11 is ${otp}`,
			from: +18643830688,
			to: phone
		})
		.then((messages) => console.log(messages))
		.catch((err) => console.error(err));

	res.status(200).send({ phone, hash: fullHash, otp });  // this bypass otp via api only for development instead hitting twilio api all the time
	//res.status(200).send({ phone, hash: fullHash });          // Use this way in Production
}); 


module.exports = router;
