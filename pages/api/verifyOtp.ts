// NOT USED IN PRODUCTION

import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import connectDB from '@config/db';
import type { NextApiRequest, NextApiResponse } from 'next';

async function verifyOtp(req: NextApiRequest, res: NextApiResponse) {
  const phone = req.body.phone;
  const hash = req.body.hash;
  let [hashValue, expires] = hash.split('.');

  let now = Date.now();
  if (now > parseInt(expires)) {
    return res.status(504).send({
      msg: 'Timeout. Please try again',
    });
  }

  if (hashValue) {
    const accessToken = jwt.sign(
      {
        data: phone,
      },
      process.env.JWT_AUTH_TOKEN as string,
      {
        expiresIn: '7d',
      }
    );
    console.log(accessToken);
    res.setHeader('Set-Cookie', [
      cookie.serialize('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        path: '/',
        expires: new Date(new Date().getTime() + 648000 * 1000),
      }),
      cookie.serialize('authSession', true as any, {
        httpOnly: false,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        path: '/',
        expires: new Date(new Date().getTime() + 648000 * 1000),
      }),
    ]);
    res.status(200).send('done');
  } else {
    console.log('not authenticated');
    return res.status(405).send({
      verification: false,
      msg: 'Incorrect OTP',
    });
  }
}

export default connectDB(verifyOtp);
