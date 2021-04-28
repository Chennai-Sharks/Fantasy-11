const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).send('Access denied');

	try {
		const verified = jwt.verify(token, process.env.JWT_AUTH_TOKEN);
		console.log(verified);
		req.user = verified;
		next();
	} catch (err) {
		console.log(err);
		res.status(400).send('Invalid Token');
	}
};
