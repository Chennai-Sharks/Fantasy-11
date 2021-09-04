import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import basePath from '@utils/basePath';
import type { NextApiRequest, NextApiResponse } from 'next';

interface CustomNextApiRequest extends NextApiRequest {
  user: any;
}

async function postMatchInfo(req: CustomNextApiRequest, res: NextApiResponse) {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_AUTH_TOKEN as string);
    req.user = verified;
    let resData: Record<string, any> = {};
    resData.matchInfo = [];
    try {
      const { match } = req.query;

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
        matchWinner: data.info.outcome.winner,
        matchWinningMargin: data.info.outcome.by,
        playerOfTheMatch: data.info.player_of_match,
      });

      res.send(resData);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send('Invalid Token');
  }
}

export default postMatchInfo;
