import { AppBar, Button, Card, Typography, Toolbar } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import captainStore from '@stores/CaptainStore';
import idStore from '@stores/saveidStore';
import selectedPlayersStore from '@stores/SelectedPlayersStore';
import versusMatchStore from '@stores/VersusMatchStore';
import Head from 'next/head';
import Image from 'next/image';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

import classes from '@styles/CreateTeam.module.scss';
import LogoutButton from '@containers/Logout/LogoutButton';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

type playerPoints = {};

const SelectCaptainScreen: React.FC = () => {
	const matchStore = versusMatchStore((state) => state);
	const selectedplayers = selectedPlayersStore((state) => state);
	const idstore = idStore((state) => state);
	const captaindata = captainStore((state) => state);
	let totalpoints: number = 0;

	const router = useRouter();

	const [totalScore, setTotalScore] = React.useState(0);
	const [wickets, setWickets] = React.useState(0);
	const [a, b] = React.useState(0);
	const [playerPoints, setPlayerPoints] = React.useState<any>({});

	const myRedirectFunction = function () {
		if (typeof window !== 'undefined') {
			router.push({
				pathname: 'select-captain/game',
				query: { id: idstore.id },
			});
		}
	};

	React.useEffect(() => {
		if (typeof cookies.get('authSession') === 'undefined') {
			router.replace('/');
		}
		const connectionOptions: any = {
			'force new connection': true,
			reconnectionAttempts: 'Infinity',
			timeout: 10000,
			transports: ['websocket'],
		};

		socket = io('http://localhost:5000', connectionOptions);

		console.log(selectedplayers.selectedPlayers);

		socket.emit(
			'startMatch',
			{
				players: selectedplayers.selectedPlayers,
				captain: captaindata.captain,
				viceCaptain: captaindata.vicecaptain,
			},

			`${idstore.id}.json`
		);
		console.log('coneected');
	}, [
		selectedplayers.selectedPlayers,
		idstore.id,
		captaindata.captain,
		captaindata.setvicecaptain,
	]);

	React.useEffect(() => {
		socket.on('score', (data) => {
			setWickets(data['wickets']);
			setTotalScore(data['total']);
			setPlayerPoints(data['playerPoints']);
		});
		socket.on('matchEnd', (data) => {
			console.log('match is over');
			console.log(data);
		});
	});

	return (
		<div className={classes.background}>
			<Head>
				<title>Fantasy 11 | Match</title>
				<link rel='icon' href='/logo.png' />
			</Head>
			<Card raised className={classes.leftPortionCard}>
				<AppBar
					position='static'
					style={{
						backgroundColor: '#FD3A4A',
						height: '100px',
					}}
				>
					<Toolbar
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<Typography
							variant='h6'
							style={{ margin: '10px', textAlign: 'center' }}
						>
							Match
						</Typography>
						<LogoutButton />
					</Toolbar>

					<Typography variant='h6' style={{ textAlign: 'center' }}>
						{matchStore.oneTeam} vs {matchStore.twoTeam}
					</Typography>
				</AppBar>
				<Card
					raised
					style={{
						width: '90%',
						height: '65%',
						overflowX: 'hidden',
						overflowY: 'auto',
						marginTop: '20px',
					}}
				>
					<div style={{ marginBottom: '10px' }}></div>
					<Typography className={classes.subTitle}>
						Wickets: {wickets}
					</Typography>
					<Typography className={classes.subTitle}>
						Total Score: {totalScore}
					</Typography>
					<Typography
						align='center'
						style={{ marginTop: '0px' }}
						className={classes.title}
					>
						Player Points:
					</Typography>
					{Object.keys(playerPoints).map((EachPlayer, index) => {
						totalpoints = totalpoints + playerPoints[EachPlayer];

						return (
							<Typography className={classes.subTitle} key={index}>
								{EachPlayer}:{playerPoints[EachPlayer]}
							</Typography>
						);
					})}
				</Card>
				<div style={{ marginBottom: '20px' }}></div>

				<Button onClick={() => {}}>Click here to see the scoreCard</Button>
			</Card>
			<div className={classes.rightPortion}>
				<div className={classes.logo} />
				<div className={classes.logo} />

				<Image
					src='/logo.png'
					alt='Logo of fantasy-11'
					width={80}
					height={80}
				/>
				<Typography className={classes.title}>Fantasy 11</Typography>
				<Typography className={classes.subTitle}>
					Make sure you make the right choices
				</Typography>
			</div>
		</div>
	);
};

export default SelectCaptainScreen;
