import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import idStore from '@stores/idStore';
import { useRouter } from 'next/router';
import io, { Socket } from 'socket.io-client';
import captainStore from '@stores/CaptainStore';
import versusMatchStore from '@stores/VersusMatchStore';
import selectedPlayersStore from '@stores/SelectedPlayersStore';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

import { useQuery } from 'react-query';
import { MoonLoader } from 'react-spinners';
import userIdStore from '@stores/UserIdStore';
import classes from '@styles/CreateTeam.module.scss';
import LogoutButton from '@containers/Logout/LogoutButton';
import { AppBar, Button, Card, Typography, Toolbar } from '@material-ui/core';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

type playerPoints = {};

const SelectCaptainScreen: React.FC = () => {
	const matchStore = versusMatchStore((state) => state);
	const selectedplayers = selectedPlayersStore((state) => state);
	const idstore = idStore((state) => state);
	const captaindata = captainStore((state) => state);
	let totalpoints: number = 0; // this is not used anywhere.

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

		// console.log(selectedplayers.selectedPlayers);

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
				console.log('close');
				let totalPlayerPointsByUser: number = 0;
				console.log(data);
				Object.keys(data).map((playername) => {
					totalPlayerPointsByUser = totalPlayerPointsByUser + data[playername];
				});
				axios.post(
					`/api/match/points`,
					{
						userId: userId.userId,
						match: [matchStore.oneTeam, matchStore.twoTeam],
						totalPoints: totalPlayerPointsByUser,
					},
					{ withCredentials: true }
				);
				socket.close();
				// console.log(totalpoints);
				socket.disconnect();
				setIsdone(true);

				return;
			});
		} else {
			// console.log('close');

			console.log(socket.disconnected);
		}
	}, [totalpoints, matchStore.oneTeam, matchStore.twoTeam]);

	const { isLoading, isError, data, refetch } = useQuery(
		'preMatchInfo',
		async () => {
			const { data } = await axios.get(
				`/api/match/postMatchInfo/${idstore.id}.json`,
				{
					withCredentials: true,
				}
			);
			return data;
		},
		{
			retry: false,
			retryDelay: 10000,
			refetchOnWindowFocus: false,
		}
	);

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
					<Typography className={classes.subTitle}>Match Finished</Typography>
				) : (
					<div></div>
				)}
			</Card>
			<div className={classes.rightPortion}>
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
				<Typography className={classes.title}>Post Match Info</Typography>
				<div style={{ marginTop: '5px' }}>
					{!isDone ? (
						<Typography className={classes.subTitle}>
							Match is going on...
						</Typography>
					) : isLoading ? (
						<MoonLoader />
					) : isError ? (
						<Typography
							style={{ marginTop: '10px' }}
							className={classes.subTitle}
						>
							Server is not Available.
							<br />
							<Button onClick={() => refetch()}>Try Again</Button>
						</Typography>
					) : (
						<React.Fragment>
							<Typography className={classes.subTitle}>
								Match Winner: {`${data.matchInfo[0].matchWinner}`}
							</Typography>
							<Typography className={classes.subTitle}>
								Match Winning Margin:{' '}
								{Object.keys(data.matchInfo[0].matchWinningMargin).map(
									(objKey) => {
										return `by ${data.matchInfo[0].matchWinningMargin[objKey]} ${objKey}`;
									}
								)}
							</Typography>
							<Typography className={classes.subTitle}>
								Player Of The Match:{' '}
								{(data.matchInfo[0].playerOfTheMatch as Array<string>).map(
									(player) => {
										return `${player} ${
											(data.matchInfo[0].playerOfTheMatch as Array<string>)
												.length !== 1
												? ','
												: ''
										}`;
									}
								)}
							</Typography>
						</React.Fragment>
					)}
				</div>
			</div>
		</div>
	);
};

export default SelectCaptainScreen;
