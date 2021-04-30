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
import axios from 'axios';
import userIdStore from '@stores/UserIdStore';

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
	const [isDone, setIsdone] = React.useState(false);
	const [playerPoints, setPlayerPoints] = React.useState<any>({});
	const userId = userIdStore((state) => state);

	const myRedirectFunction = function () {
		if (typeof window !== 'undefined') {
			router.push('/Home/score-card');
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

		socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`, connectionOptions);

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
		if (!isDone) {
			socket.on('score', (data) => {
				setWickets(data['wickets']);
				setTotalScore(data['total']);
				setPlayerPoints(data['playerPoints']);
			});
			socket.on('matchEnd', (data) => {
				console.log('match is over');
				// console.log(data);
				setIsdone(true);
				return;
			});
		} else {
			console.log('close');
			socket.close();
			// console.log(totalpoints);
			socket.disconnect();

			axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/api/match/points`,
				{
					userId: userId.userId,
					match: [matchStore.oneTeam, matchStore.twoTeam],
					totalPoints: totalpoints,
				},
				{ withCredentials: true }
			);
			console.log(socket.disconnected);
		}
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

				<Button
					onClick={() => {
						myRedirectFunction();
					}}
				>
					Click here to see the scoreCard
				</Button>
				{isDone ? (
					<Button onClick={() => {}}>Match Finished</Button>
				) : (
					<div></div>
				)}
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
