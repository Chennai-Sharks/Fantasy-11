// NOT USED IN PRODUCTION

import twilio from 'twilio';
import crypto from 'crypto';
import connectDB from '@config/db';
import type { NextApiRequest, NextApiResponse } from 'next';

async function sendOTP(req: NextApiRequest, res: NextApiResponse) {
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  const smsKey = process.env.SMS_SECRET_KEY as string;
  const phone = req.body.phone;
  const otp = Math.floor(100000 + Math.random() * 900000);
  const ttl = 2 * 1000 * 1000;
  const expires = Date.now() + ttl;
  const data = `${phone}.${otp}.${expires}`;
  const hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
  const fullHash = `${hash}.${expires}`;

  const client = twilio(accountSid, authToken);

  client.messages
    .create({
      body: `Your One Time Login Password For Fantasy 11 is ${otp}`,
      from: '+18643830688',
      to: `91${phone}`,
    })
    .then((messages) => console.log(messages))
    .catch((err) => console.error(err));

  res.status(200).send({ phone, hash: fullHash, otp }); // this bypass otp via api only for development instead hitting twilio api all the time
  // res.status(200).send({ phone, hash: fullHash }); // Use this way in Production
}

export default connectDB(sendOTP);
