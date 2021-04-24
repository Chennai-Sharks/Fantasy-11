const router = require('express').Router();

var fs = require('fs');
var files = fs.readdirSync(__dirname+'/../JSON Files/')

playerData = fs.readFileSync(__dirname+'/../models/data.json', {encoding:'utf8', flag:'r'});
playerData =  JSON.parse(playerData);

// Match route
router.get('/', async (req, res)=>{

    var resData = {};
    resData.teamInfo = [];
    for(var i=0;i<4;i++)
    {
        chosenFile = files[Math.floor(Math.random()*files.length)];
        console.log(chosenFile);
        jsonString = fs.readFileSync('./JSON Files/'+chosenFile.toString() , {encoding:'utf8', flag:'r'});

        const data = JSON.parse(jsonString);
        // console.log(data.info.teams);
        resData.teamInfo.push ({
          "match" : chosenFile,
          "teams" : data.info.teams
        })
    }
    res.send(resData);
});

router.get('/players/', async(req, res)=>{
        
        fs.readFile('./JSON Files/'+req.body.match.toString() ,'utf-8' ,(err, jsonString)=>{
        if(err) console.log(err);

        const data = JSON.parse(jsonString);
        var resData = {};
        players = [];
        credits = [];
        firstInnings = data.innings[0]["1st innings"].deliveries;
        secondInnings = data.innings[1]["2nd innings"].deliveries;
        ball =[];
        // players of team1
        for(i=0;i<firstInnings.length;i++)
        {
             ball = Object.keys(firstInnings[i]);
             ballData = firstInnings[i][ball[0]];
            if(!players.includes(ballData.batsman))
            {
                players.push(ballData.batsman);
                credits.push(playerData[ballData.batsman])
            }            
            if(!players.includes(ballData.non_striker))
            {
                players.push(ballData.non_striker);
                credits.push(playerData[ballData.non_striker])
            }            
            if(!players.includes(ballData.bowler))
            {
                players.push(ballData.bowler);
                credits.push(playerData[ballData.bowler])
            }            
        }

        // players of team2
        for(i=0;i<secondInnings.length;i++)
        {
             ball = Object.keys(secondInnings[i]);
             ballData = secondInnings[i][ball[0]];
            if(!players.includes(ballData.batsman))
            {
                players.push(ballData.batsman);
                credits.push(playerData[ballData.batsman])
            }            
            if(!players.includes(ballData.non_striker))
            {
                players.push(ballData.non_striker);
                credits.push(playerData[ballData.non_striker])
            }            
            if(!players.includes(ballData.bowler))
            {
                players.push(ballData.bowler);
                credits.push(playerData[ballData.bowler])
            }            
        }
      
        extra = 22 - players.length;
        console.log(extra)
      //  console.log(players)
        if(extra!=0)
        {
            playerList = Object.keys(playerData);
        }
        while(extra!=0)
        {
            x = Math.floor(Math.random()*314)
            batsman = playerList[x]
            if(!players.includes(batsman))
            {
                players.push(batsman);
                credits.push(playerData[batsman])
                extra--;
            }            
        }
        resData.players = players;
        resData.credits = credits;
        res.send(resData);

    })
});

//to send the pre-match matchInfo
router.get('/preMatchInfo', async (req,res) => {
  let resData = {};
  resData.matchInfo = [];
  try{
    chosenFile = req.body.files;
    jsonString = fs.readFileSync('./JSON Files/' + chosenFile.toString(), {endcoding: 'utf8', flag: 'r'});

    const data = JSON.parse(jsonString);
    resData.matchInfo.push ({
      "match" : chosenFile,
      "city" : data.info.city,
      "competition": data.info.competition,
      "tossDecision": data.info.toss.decision,
      "tossWinningTeam": data.info.toss.winner,
      "umpires": data.info.umpires,
      "venue": data.info.venue
    })
    res.send(resData);
  } catch(err){
    res.status(400).json({message: err});
  }
});

//to send the post-match matchInfo
router.get('/postMatchInfo', async (req,res) => {
  let resData = {};
  resData.matchInfo = [];
  try{
    chosenFile = req.body.files;
    jsonString = fs.readFileSync('./JSON Files/' + chosenFile.toString(), {endcoding: 'utf8', flag: 'r'});

    const data = JSON.parse(jsonString);
    resData.matchInfo.push ({
      "match" : chosenFile,
      "matchWinner" : data.info.outcome.winner,
      "matchWinningMargin": data.info.outcome.by,
      "playerOfTheMatch": data.info.player_of_match
    })
    res.send(resData);
  } catch(err){
    res.status(400).json({message: err});
  }
});

module.exports = router;
