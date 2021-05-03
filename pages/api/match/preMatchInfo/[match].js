import fs from 'fs';
import jwt from 'jsonwebtoken';

async function preMatchInfo(req, res) {
	console.log('premath try');

	const token = req.cookies.accessToken;
	if (!token) return res.status(401).send('Access denied');

	try {
		console.log('inside try');
		const verified = jwt.verify(token, process.env.JWT_AUTH_TOKEN);
		console.log(verified);
		req.user = verified;
		const { match } = req.query;

		let resData = {};
		resData.matchInfo = [];
		try {
			console.log(match);
			let jsonString = fs.readFileSync(
				path.join(process.cwd(), '/JSON Files/') + match.toString(),
				{
					endcoding: 'utf8',
					flag: 'r',
				}
			);

			const data = JSON.parse(jsonString);
			resData.matchInfo.push({
				match: match,
				city: data.info.city,
				competition: data.info.competition,
				tossDecision: data.info.toss.decision,
				tossWinningTeam: data.info.toss.winner,
				umpires: data.info.umpires,
				venue: data.info.venue,
			});
			console.log(resData);
			res.send(resData);
		} catch (err) {
			console.log('here');
			res.status(400).json({ message: 'error' });
		}
	} catch (err) {
		console.log(err);
		res.status(400).send('Invalid Token');
	}
}

export default preMatchInfo;
