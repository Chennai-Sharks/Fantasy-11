import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import basePath from '@utils/basePath';
import type { NextApiRequest, NextApiResponse } from 'next';

interface CustomNextApiRequest extends NextApiRequest {
  user: any;
}

async function selectedMatch(req: CustomNextApiRequest, res: NextApiResponse) {
  const { match } = req.query;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_AUTH_TOKEN as string);
    req.user = verified;
    // Code starts
    let playerData = fs.readFileSync(path.join(basePath, '/models/data.json'), {
      encoding: 'utf8',
      flag: 'r',
    });
    playerData = JSON.parse(playerData);
    fs.readFile(
      path.join(basePath, '/JSON Files/') + match.toString(),
      'utf-8',
      (err, jsonString) => {
        if (err) console.log(err);

        const data = JSON.parse(jsonString);
        const resData: Record<string, any> = {};
        const players: any[] = [];
        const credits: any[] = [];
        const firstInnings = data.innings[0]['1st innings'].deliveries;
        const secondInnings = data.innings[1]['2nd innings'].deliveries;
        let ball = [];
        // players of team1
        for (let i = 0; i < firstInnings.length; i++) {
          ball = Object.keys(firstInnings[i]);
          let ballData = firstInnings[i][ball[0]];
          if (!players.includes(ballData.batsman)) {
            players.push(ballData.batsman);
            credits.push(playerData[ballData.batsman]);
          }
          if (!players.includes(ballData.non_striker)) {
            players.push(ballData.non_striker);
            credits.push(playerData[ballData.non_striker]);
          }
          if (!players.includes(ballData.bowler)) {
            players.push(ballData.bowler);
            credits.push(playerData[ballData.bowler]);
          }
        }

        // players of team2
        for (let i = 0; i < secondInnings.length; i++) {
          ball = Object.keys(secondInnings[i]);
          let ballData = secondInnings[i][ball[0]];
          if (!players.includes(ballData.batsman)) {
            players.push(ballData.batsman);
            credits.push(playerData[ballData.batsman]);
          }
          if (!players.includes(ballData.non_striker)) {
            players.push(ballData.non_striker);
            credits.push(playerData[ballData.non_striker]);
          }
          if (!players.includes(ballData.bowler)) {
            players.push(ballData.bowler);
            credits.push(playerData[ballData.bowler]);
          }
        }
        let playerList: any[] = [];

        let extra = 22 - players.length;
        if (extra != 0) {
          playerList = Object.keys(playerData);
        }
        while (extra != 0) {
          let x = Math.floor(Math.random() * 314);
          let batsman = playerList[x];
          if (!players.includes(batsman)) {
            players.push(batsman);
            credits.push(playerData[batsman]);
            extra--;
          }
        }
        resData.players = players;
        resData.credits = credits;
        res.send(resData);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).send('Invalid Token');
  }
}

export default selectedMatch;
