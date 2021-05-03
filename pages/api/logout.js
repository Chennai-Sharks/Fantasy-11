import cookie from 'cookie';
import connectDB from '../../config/db';

async function logout(req, res) {
	res.setHeader('Set-Cookie', [
		cookie.serialize('accessToken', '', {
			httpOnly: true,
			secure: false,
			sameSite: 'strict',
			path: '/',
			maxAge: -1,
		}),
		cookie.serialize('authSession', '', {
			httpOnly: false,
			secure: false,
			sameSite: 'strict',
			path: '/',
			maxAge: -1,
		}),
	]);

	// res.writeHead(302, { path: '/' });
	res.send('done');
}

export default connectDB(logout);
