import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

async function getMatches(req, res) {
	console.log(process.cwd());
	var files = fs.readdirSync(path.join(process.cwd(), '/JSON Files/'));
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).send('Access denied');
	try {
		const verified = jwt.verify(token, process.env.JWT_AUTH_TOKEN);
		console.log(verified);
		req.user = verified;
		const resData = {};
		resData.teamInfo = [];
		for (var i = 0; i < 4; i++) {
			const chosenFile = files[Math.floor(Math.random() * files.length)];
			console.log(chosenFile);
			const jsonString = fs.readFileSync(
				path.join(process.cwd(), '/JSON Files/') + chosenFile.toString(),
				{
					encoding: 'utf8',
					flag: 'r',
				}
			);

			const data = JSON.parse(jsonString);
			resData.teamInfo.push({
				match: chosenFile,
				teams: data.info.teams,
			});
		}
		res.send(resData);
	} catch (err) {
		console.log(err);
		res.status(400).send('Invalid Token');
	}
}

export default getMatches;
