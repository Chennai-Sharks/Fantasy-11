import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import connectDb from '../../../config/db';

async function scoreboard(req, res) {
	const { id } = req.query;
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).send('Access denied');

	try {
		const verified = jwt.verify(token, process.env.JWT_AUTH_TOKEN);
		console.log(verified);
		req.user = verified;
		try {
			console.log(id);
			let score = await User.findById(id);
			score = score.pointHistory;
			res.send(score);
		} catch (err) {
			res.status(400).send('Invalid ID');
		}
	} catch (err) {
		console.log(err);
		res.status(400).send('Invalid Token');
	}
}

export default connectDb(scoreboard);
