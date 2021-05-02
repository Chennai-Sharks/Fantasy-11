import fs from 'fs';
import jwt from 'jsonwebtoken';

async function postMatchInfo(req, res) {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).send('Access denied');

	try {
		const verified = jwt.verify(token, process.env.JWT_AUTH_TOKEN);
		console.log(verified);
		req.user = verified;
		let resData = {};
		resData.matchInfo = [];
		try {
			const { match } = req.query;

			let jsonString = fs.readFileSync('JSON Files/' + match.toString(), {
				endcoding: 'utf8',
				flag: 'r',
			});

			const data = JSON.parse(jsonString);
			resData.matchInfo.push({
				match: match,
				matchWinner: data.info.outcome.winner,
				matchWinningMargin: data.info.outcome.by,
				playerOfTheMatch: data.info.player_of_match,
			});
			console.log(resData.matchInfo[0].matchWinningMargin);
			console.log(resData.matchInfo[0].playerOfTheMatch);

			res.send(resData);
		} catch (err) {
			res.status(400).json({ message: err });
		}
	} catch (err) {
		console.log(err);
		res.status(400).send('Invalid Token');
	}
}

export default postMatchInfo;
