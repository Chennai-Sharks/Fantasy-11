import connectDB from '@config/db';
import User from '@models/User';
import saltHash from '@utils/passwordHash';

import type { NextApiRequest, NextApiResponse } from 'next';

async function register(req: NextApiRequest, res: NextApiResponse) {
  const emailExist = await User.findOne({
    email: req.body.email,
  });
  if (emailExist) return res.status(400).send('Email already exists');

  let hashPassword = saltHash.generateSaltHash(req.body.password);

  const user = new User({
    email: req.body.email,
    password: hashPassword.password,
    salt: hashPassword.salt,
  });
  try {
    const savedUser = await user.save();
    res.send({
      userId: savedUser._id,
      email: savedUser.email,
    });
  } catch (err) {
    res.status(400).send({
      message: err,
    });
  }
}

export default connectDB(register);
