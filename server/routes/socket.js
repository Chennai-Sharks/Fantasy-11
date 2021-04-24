events ={
    "caught": "25",
    "bowled": "33",
    "run out": "25",
    "lbw": "33",
    "retired hurt": "0",
    "stumped": "25",
    "caught and bowled": "40",
    "hit wicket": "25",
    // "50_runs": "58",
    // "100_runs": "116"
  }
// fielder points ,catch and stumped is 15 pts


exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {
      socket.on('startMatch', function (playerData,match) {
        playerPoints = {}
        total = 0;
        wickets = 0;
        for(i=0;i<11;i++)
            playerPoints[playerData[i]] = 0;
        // match data
        jsonString = fs.readFileSync('./JSON Files/'+match.toString() , {encoding:'utf8', flag:'r'});
        const data = JSON.parse(jsonString);
        
        firstInnings = data.innings[0]["1st innings"].deliveries;
        socket.emit('first_innings',data.innings[0]["1st innings"].team);
        for(i=0;i<firstInnings.length;i++)
        {
            setTimeout(()=>{
                
                ball = Object.keys(firstInnings[i]);
                ballData = firstInnings[i][ball[0]];
                
                //point calculations for wickets
                if(ballData.hasOwnProperty('wicket'))
                {
                    wickets++;
                    if(ballData.wicket.kind=='caught' || ballData.wicket.kind=='stumped')
                    {
                        if(playerPoints.hasOwnProperty(ballData.bowler))   
                            playerPoints[ballData.bowler]+= 25 ;         
                        
                        if(ballData.hasOwnProperty('fielders'))
                            ballData.wicket.fielders.forEach( fielder => {
                                if(playerPoints.hasOwnProperty(fielder))                                       
                                    playerPoints[fielder]+= 15 ;             
                            }); 
                    }

                    else if(ballData.wicket.kind =='run out')
                    {
                        if(playerPoints.hasOwnProperty(ballData.wicket.fielders[0]))   
                            playerPoints[ballData.wicket.fielders[0]] += 25 ;         
                    } 

                    // this is for all other wicket kinds
                    else if(playerPoints.hasOwnProperty(ballData.bowler))
                        playerPoints[ballData.bowler]+=events[ballData.wicket.kind];
                    
                }

                else( ballData.runs.batsman!=0 && playerPoints.hasOwnProperty(ballData.batsman))
                {
                    playerPoints[ballData.batsman]+=ballData.runs.batsman;
                    if(playerPoints[ballData.batsman]>100)
                    playerPoints[ballData.batsman]+=8;
                    else if(playerPoints[ballData.batsman]>50)
                    playerPoints[ballData.batsman]+=8;
                }
                total+=ballData.runs.total;

            },5000)

            // end of first innings 
            total = 0;
            wickets = 0;
            
            // start of second innings 
            secondInnings = data.innings[1]["2nd innings"].deliveries;
            socket.emit('second_innings',data.innings[1]["2nd innings"].team);


            // end of second innings

            socket.emit('matchEnd',playerPoints)
        }
        
        console.log('startMatch triggered');
      });
    });
  }