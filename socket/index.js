var fs = require('fs');
const io = require('socket.io')(process.env.PORT || 5000, {
	cors: {
		origin: process.env.CLIENT_URL,
		methods: ['GET', 'POST'],
	},
});

events = {
	caught: 25,
	bowled: 33,
	'run out': 25,
	lbw: 33,
	'retired hurt': 0,
	stumped: 25,
	'caught and bowled': 40,
	'hit wicket': 25,
};
// fielder points ,catch and stumped is 15 pts

io.on('connection', (socket) => {
	console.log('New client connected');
	socket.emit('test', 'vanakam di maaple server lendhu');

	socket.on('disconnect', () => socket.disconnect());

	socket.on('test', (data) => {
		console.log(data);
		socket.emit('testreply', 'hello world from server');
	});

	socket.on('startMatch', (playerData, match) => {
		playerPoints = {};
		var total = 0;
		var wickets = 0;
		for (i = 0; i < 11; i++) playerPoints[playerData.players[i]] = 0;
		// match data
		jsonString = fs.readFileSync('./JSON Files/' + match.toString(), {
			encoding: 'utf-8',
			flag: 'r',
		});
		const data = JSON.parse(jsonString);

		firstInnings = data.innings[0]['1st innings'].deliveries;
		socket.emit('first_innings', data.innings[0]['1st innings'].team);
		for (i = 0; i < firstInnings.length; i++) {
			setTimeout(
				(i) => {
					ball = Object.keys(firstInnings[i]);
					ballData = firstInnings[i][ball[0]];

					//point calculations for wickets
					if (ballData.hasOwnProperty('wicket')) {
						wickets++;
						if (
							ballData.wicket.kind == 'caught' ||
							ballData.wicket.kind == 'stumped'
						) {
							if (playerPoints.hasOwnProperty(ballData.bowler))
								playerPoints[ballData.bowler] += 25;

							if (ballData.hasOwnProperty('fielders'))
								ballData.wicket.fielders.forEach((fielder) => {
									if (playerPoints.hasOwnProperty(fielder))
										playerPoints[fielder] += 15;
								});
						} else if (ballData.wicket.kind == 'run out') {
							if (playerPoints.hasOwnProperty(ballData.wicket.fielders[0]))
								playerPoints[ballData.wicket.fielders[0]] += 25;
						}

						// this is for all other wicket kinds
						else if (playerPoints.hasOwnProperty(ballData.bowler))
							playerPoints[ballData.bowler] += events[ballData.wicket.kind];
					}
					// points calculation for batsmen
					else ballData.runs.batsman != 0;
					if (playerPoints.hasOwnProperty(ballData.batsman)) {
						playerPoints[ballData.batsman] += ballData.runs.batsman;
						if (playerPoints[ballData.batsman] > 100)
							playerPoints[ballData.batsman] += 8;
						else if (playerPoints[ballData.batsman] > 50)
							playerPoints[ballData.batsman] += 8;
					}
					total += ballData.runs.total;

					socket.emit('score', {
						total: total,
						wickets: wickets,
						playerPoints: playerPoints,
					});
				},
				i * 1000,
				i
			); // setTimeout closing
		} // for loop closing

		// end of first innings

		// start of second innings
		total1 = 0;
		wickets1 = 0;
		secondInnings = data.innings[1]['2nd innings'].deliveries;
		let j = 0;
		for (; j < secondInnings.length; j++) {
			setTimeout(
				(j) => {
					ball = Object.keys(secondInnings[j]);
					ballData = secondInnings[j][ball[0]];

					//point calculations for wickets
					if (ballData.hasOwnProperty('wicket')) {
						wickets1++;
						if (
							ballData.wicket.kind == 'caught' ||
							ballData.wicket.kind == 'stumped'
						) {
							if (playerPoints.hasOwnProperty(ballData.bowler))
								playerPoints[ballData.bowler] += 25;

							if (ballData.hasOwnProperty('fielders'))
								ballData.wicket.fielders.forEach((fielder) => {
									if (playerPoints.hasOwnProperty(fielder))
										playerPoints[fielder] += 15;
								});
						} else if (ballData.wicket.kind == 'run out') {
							if (playerPoints.hasOwnProperty(ballData.wicket.fielders[0]))
								playerPoints[ballData.wicket.fielders[0]] += 25;
						}

						// this is for all other wicket kinds
						else if (playerPoints.hasOwnProperty(ballData.bowler))
							playerPoints[ballData.bowler] += events[ballData.wicket.kind];
					}
					// points calculation for batsmen
					else ballData.runs.batsman != 0;
					if (playerPoints.hasOwnProperty(ballData.batsman)) {
						playerPoints[ballData.batsman] += ballData.runs.batsman;
						if (playerPoints[ballData.batsman] > 100)
							playerPoints[ballData.batsman] += 8;
						else if (playerPoints[ballData.batsman] > 50)
							playerPoints[ballData.batsman] += 8;
					}
					total1 += ballData.runs.total;

					socket.emit('score', {
						total: total1,
						wickets: wickets1,
						playerPoints: playerPoints,
					});
				},
				(i + j) * 1000,
				j
			);
		} // for loop closing

		// end of second innings
		setTimeout(
			() => {
				playerPoints[playerData.captain] *= 2;
				playerPoints[playerData.viceCaptain] *= 1.5;
				socket.emit('matchEnd', playerPoints);
			},
			(i + j) * 1000,
			i
		);

		console.log('startMatch triggered');
	});
});
