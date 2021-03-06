import cookie from 'cookie';
import connectDB from '@config/db';
import type { NextApiRequest, NextApiResponse } from 'next';

async function logout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res
      .status(405)
      .json({ status: 'fail', message: 'Method not allowed here!' });
  if (req.body.key === 'static_key') {
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

    // res.writeHead(302, { path: '/' });
    res.send('done');
  } else {
    res.status(404).send('not done');
  }
}

export default connectDB(logout);
