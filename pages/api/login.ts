import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import User from '@models/User';

import connectDB from '@config/db';
import type { NextApiRequest, NextApiResponse } from 'next';

import saltHash from '@utils/passwordHash';

async function login(req: NextApiRequest, res: NextApiResponse) {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) return res.status(400).send('Email not found');

  let isPasswordMatch = saltHash.verifySaltHash(
    user.salt,
    user.password,
    req.body.password
  );
  if (!isPasswordMatch) return res.status(400).send('Invalid password');

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_AUTH_TOKEN as string
  );

  res.setHeader('Set-Cookie', [
    cookie.serialize('accessToken', token, {
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

  res.json({
    userId: user._id,
    token: token,
  });
}

export default connectDB(login);
