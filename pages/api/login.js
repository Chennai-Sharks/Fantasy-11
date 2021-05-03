import jwt from 'jsonwebtoken';
import User from '../../models/User';
import connectDB from '../../config/db';
import saltHash from 'password-salt-and-hash';

async function login(req, res) {
	const user = await User.findOne({
		email: req.body.email,
	});
	if (!user) return res.status(400).send('Email not found');

	let isPasswordMatch = saltHash.verifySaltHash(
		user.salt,
		user.password,
		req.body.password
	);
	if (!isPasswordMatch) return res.status(400).send('Invalid password');

	const token = jwt.sign(
		{
			_id: user._id,
		},
		process.env.JWT_AUTH_TOKEN
	);

	res.json({
		userId: user._id,
		token: token,
	});
}

export default connectDB(login);
