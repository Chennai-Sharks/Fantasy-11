import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

async function getMatches(req, res) {
  console.log(process.cwd());
  let basePath = process.cwd();
  if (process.env.NODE_ENV === 'production') {
    basePath = path.join(process.cwd(), '.next/server/chunks');
    console.log('here');
    console.log(basePath);
  }
  var files = fs.readdirSync(path.join(basePath, '/JSON Files/'));
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send('Access denied');
  try {
    const verified = jwt.verify(token, process.env.JWT_AUTH_TOKEN);
    console.log(verified);
    req.user = verified;
    const resData = {};
    resData.teamInfo = [];
    for (var i = 0; i < 4; i++) {
      const chosenFile = files[Math.floor(Math.random() * files.length)];
      console.log(chosenFile);
      const jsonString = fs.readFileSync(
        path.join(basePath, '/JSON Files/') + chosenFile.toString(),
        {
          encoding: 'utf8',
          flag: 'r',
        }
      );

      const data = JSON.parse(jsonString);
      resData.teamInfo.push({
        match: chosenFile,
        teams: data.info.teams,
      });
    }
    res.send(resData);
  } catch (err) {
    console.log(err);
    res.status(400).send('Invalid Token');
  }
}

export default getMatches;
