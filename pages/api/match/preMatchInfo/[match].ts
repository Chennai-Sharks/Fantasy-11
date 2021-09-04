import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import basePath from '@utils/basePath';
import type { NextApiRequest, NextApiResponse } from 'next';

interface CustomNextApiRequest extends NextApiRequest {
  user: any;
}

async function preMatchInfo(req: CustomNextApiRequest, res: NextApiResponse) {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_AUTH_TOKEN as string);
    req.user = verified;
    const { match } = req.query;

    let resData: Record<string, any> = {};
    resData.matchInfo = [];
    try {
      let jsonString = fs.readFileSync(
        path.join(basePath, '/JSON Files/') + match.toString(),
        {
          encoding: 'utf8',
          flag: 'r',
        }
      );

      const data = JSON.parse(jsonString);
      resData.matchInfo.push({
        match: match,
        city: data.info.city,
        competition: data.info.competition,
        tossDecision: data.info.toss.decision,
        tossWinningTeam: data.info.toss.winner,
        umpires: data.info.umpires,
        venue: data.info.venue,
      });
      res.send(resData);
    } catch (err) {
      res.status(400).json({ message: 'error' });
    }
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}

export default preMatchInfo;
