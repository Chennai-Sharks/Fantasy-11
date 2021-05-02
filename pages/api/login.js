import bcryptjs from 'bcrypt';
import connectDB from '../../config/db';
import User from '../../models/User';
import jwt from 'jsonwebtoken';

async function login(req, res) {
	const user = await User.findOne({
		email: req.body.email,
	});
	if (!user) return res.status(400).send('Email not found');

	const validPassword = await bcryptjs.compare(
		req.body.password,
		user.password
	);
	if (!validPassword) return res.status(400).send('Invalid password');

	const token = jwt.sign(
		{
			_id: user._id,
		},
		process.env.JWT_AUTH_TOKEN
	);

	res.send(token);
}

export default connectDB(login);
