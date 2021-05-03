import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import connectDb from '../../../config/db';

async function points(req, res) {
	// const token = req.cookies.accessToken;
	// if (!token) return res.status(401).send('Access denied');
	const user = await User.findOne({ _id: req.body.userId });
	console.log(user);
	user.pointHistory.push({
		match: req.body.match[0].toString() + ' vs ' + req.body.match[1].toString(),
		points: req.body.totalPoints, // to be edited
	});
	user.save();
	res.send('done');
	// try {
	// 	const verified = jwt.verify(token, process.env.JWT_AUTH_TOKEN);
	// 	console.log(verified);
	// 	req.user = verified;
	// 	console.log(req.body.userId);

	// } catch (err) {
	// 	console.log(err);
	// 	res.status(400).send('Invalid Token');
	// }
}

export default connectDb(points);
