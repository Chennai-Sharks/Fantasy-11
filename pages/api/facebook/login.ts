import connectDB from '@config/db';
import User from '@models/User';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

async function facebookLogin(req: NextApiRequest, res: NextApiResponse) {
  let savedUser = await User.findOne({ email: req.body.email });
  if (!savedUser) {
    const user = new User({
      email: req.body.email,
    });
    try {
      savedUser = await user.save();
      res.send({
        userId: savedUser._id,
        phone: savedUser.phone,
        email: savedUser.email,
      });
    } catch (err) {
      res.status(400).send({
        message: err,
      });
    }
  }

  const token = jwt.sign(
    { email: req.body.email },
    process.env.JWT_AUTH_TOKEN as string,
    {
      expiresIn: '7d',
    }
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
  res.json({ token: token, userId: savedUser._id });
}

export default connectDB(facebookLogin);
