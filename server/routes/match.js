const router = require('express').Router();

var fs = require('fs');
var files = fs.readdirSync(__dirname+'/../JSON Files/')

// Match route 
router.get('/', async (req, res)=>{
    var chosenFile = files[Math.floor(Math.random()*files.length)];
    console.log(chosenFile);
    fs.readFile('./JSON Files/'+chosenFile.toString() ,'utf-8' ,(err, jsonString)=>{
        if(err) console.log(err);

        const data = JSON.parse(jsonString);
        var resData = {};
        players = [];
        resData.teams = data.info.teams;
        firstInnings = data.innings[0]["1st innings"].deliveries;
        secondInnings = data.innings[1]["2nd innings"].deliveries;
        ball =[];
        // players of team1
        for(i=0;i<firstInnings.length;i++)
        {
             ball = Object.keys(firstInnings[i]);
             ballData = firstInnings[i][ball[0]];
            if(!players.includes(ballData.batsman))
                players.push(ballData.batsman);
            
            if(!players.includes(ballData.non_striker))
                players.push(ballData.non_striker);

            if(!players.includes(ballData.bowler))
                players.push(ballData.bowler);
        }
        // players of team2
        for(i=0;i<secondInnings.length;i++)
        {
             ball = Object.keys(secondInnings[i]);
             ballData = secondInnings[i][ball[0]];
            if(!players.includes(ballData.batsman))
                players.push(ballData.batsman);
            
            if(!players.includes(ballData.non_striker))
                players.push(ballData.non_striker);

            if(!players.includes(ballData.bowler))
                players.push(ballData.bowler);
        }

        resData.players=players;
        res.send(resData);

    })
})

module.exports = router;