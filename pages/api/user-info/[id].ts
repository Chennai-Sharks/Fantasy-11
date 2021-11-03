import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import connectDb from '../../../config/db';
import type { NextApiRequest, NextApiResponse } from 'next';

async function userInfo(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_AUTH_TOKEN as string);
    console.log(verified);
    (req as any).user = verified;
    try {
      const user = await User.findById(id);
      console.log(user);
      const allUserScores: Record<string, any>[] = user.pointHistory;

      let totalpoints: number = 0;

      for (let i = 0; i < allUserScores.length; i++) {
        totalpoints += allUserScores[i].points;
      }

      res.send({
        email: user.email,
        totalpoints,
      });
    } catch (err) {
      res.status(400).send('Invalid ID');
    }
  } catch (err) {
    console.log(err);
    res.status(400).send('Invalid Token');
  }
}

export default connectDb(userInfo);
