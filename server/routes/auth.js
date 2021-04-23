const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

//register auth route
//checks if the user already exists and registers
//After registering re-route to "login"
//req.body should contain the phone,email and password otherwise just email and password
//i've written the code for phone,email and Password
//Change the "models/user.js" file to accomodate only email and password
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
//after re-routing from register ask for email and password and check if it's correct
//if the email and password are correct re-route to "sendOTP" to generate the otp
//req.body should contain the email and password
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


//ignore all this lol
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const client = require('twilio')(accountSid,authToken)

const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN
let refreshTokens = []
const smsKey = process.env.SMS_SECRET_KEY

//this is to send the otp to the number given in the req.body
//req.body should contain only the phone number
router.post('/sendOTP', (req, res) => {
	const phone = req.body.phone;
	const otp = Math.floor(100000 + Math.random() * 900000);
	const ttl = 2 * 60 * 1000;
	const expires = Date.now() + ttl;
	const data = `${phone}.${otp}.${expires}`;
	const hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
	const fullHash = `${hash}.${expires}`;

	// client.messages
	// 	.create({
	// 		body: `Your One Time Login Password For Fantasy 11 is ${otp}`,
	// 		from: +18643830688,
	// 		to: phone
	// 	})
	// 	.then((messages) => console.log(messages))
	// 	.catch((err) => console.error(err));

	res.status(200).send({ phone, hash: fullHash, otp });  // this bypass otp via api only for development instead hitting twilio api all the time
	//res.status(200).send({ phone, hash: fullHash });          // Use this way in Production
});

//this is for verifying whether the Otp entered is correct
//After the user enters the phone number, the page must reload asking to enter the Otp
//re-route to this api call toverify the otp
router.post('/verifyOTP', (req, res) => {
	const phone = req.body.phone;
	const hash = req.body.hash;
	const otp = req.body.otp;
	let [ hashValue, expires ] = hash.split('.');

	let now = Date.now();
	if (now > parseInt(expires)) {
		return res.status(504).send({ msg: 'Timeout. Please try again' });
	}
	let data = `${phone}.${otp}.${expires}`;
	let newCalculatedHash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
	if (newCalculatedHash === hashValue) {
		console.log('user confirmed');
		const accessToken = jwt.sign({ data: phone }, JWT_AUTH_TOKEN, { expiresIn: '30s' });
		const refreshToken = jwt.sign({ data: phone }, JWT_REFRESH_TOKEN, { expiresIn: '1y' });
		refreshTokens.push(refreshToken);
		res
			.status(202)
			.cookie('accessToken', accessToken, {
				expires: new Date(new Date().getTime() + 30 * 1000),
				sameSite: 'strict',
				httpOnly: true
			})
			.cookie('refreshToken', refreshToken, {
				expires: new Date(new Date().getTime() + 31557600000),
				sameSite: 'strict',
				httpOnly: true
			})
			.cookie('authSession', true, { expires: new Date(new Date().getTime() + 30 * 1000), sameSite: 'strict' })
			.cookie('refreshTokenID', true, {
				expires: new Date(new Date().getTime() + 31557600000),
				sameSite: 'strict'
			})
			.send({ msg: 'Device verified' });
	} else {
		console.log('not authenticated');
		return res.status(400).send({ verification: false, msg: 'Incorrect OTP' });
	}
});

//this generates the authentication tokens and ID
router.post('/home', authenticateUser, (req, res) => {
	console.log('home private route');
	res.status(202).send('Private Protected Route - Home');
});

async function authenticateUser(req, res, next) {
	const accessToken = req.cookies.accessToken;

	jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
		if (phone) {
			req.phone = phone;
			next();
		} else if (err.message === 'TokenExpiredError') {
			return res.status(403).send({
				success: false,
				msg: 'Access token expired'
			});
		} else {
			console.log(err);
			return res.status(403).send({ err, msg: 'User not authenticated' });
		}
	});
}

//this generates all the refresh tokens and ID
router.post('/refresh', (req, res) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) return res.status(403).send({ message: 'Refresh token not found, login again' });
	if (!refreshTokens.includes(refreshToken))
		return res.status(403).send({ message: 'Refresh token blocked, login again' });

	jwt.verify(refreshToken, JWT_REFRESH_TOKEN, (err, phone) => {
		if (!err) {
			const accessToken = jwt.sign({ data: phone }, JWT_AUTH_TOKEN, {
				expiresIn: '30s'
			});
			return res
				.status(200)
				.cookie('accessToken', accessToken, {
					expires: new Date(new Date().getTime() + 30 * 1000),
					sameSite: 'strict',
					httpOnly: true
				})
				.cookie('authSession', true, {
					expires: new Date(new Date().getTime() + 30 * 1000),
					sameSite: 'strict'
				})
				.send({ previousSessionExpired: true, success: true });
		} else {
			return res.status(403).send({
				success: false,
				msg: 'Invalid refresh token'
			});
		}
	});
});

//this is for logging out the user
//route to this call when the user clicks the logout button
router.get('/logout', (req, res) => {
	res
		.clearCookie('refreshToken')
		.clearCookie('accessToken')
		.clearCookie('authSession')
		.clearCookie('refreshTokenID')
		.send('logout');
});


module.exports = router;
