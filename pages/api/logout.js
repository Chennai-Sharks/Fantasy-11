import cookie from 'cookie';
import connectDB from '../../config/db';

async function logout(req, res) {
	res.setHeader('Set-Cookie', [
		cookie.serialize('accessToken', '', {
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			sameSite: 'strict',
			path: '/',
			maxAge: -1,
		}),
		cookie.serialize('authSession', '', {
			httpOnly: false,
			secure: process.env.NODE_ENV !== 'development',
			sameSite: 'strict',
			path: '/',
			maxAge: -1,
		}),
	]);

	res.send('done');
	// res.writeHead(302, { path: '/' });
}

export default connectDB(logout);
