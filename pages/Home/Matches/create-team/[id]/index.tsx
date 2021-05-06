import React from 'react';
import { useRouter } from 'next/router';

import {
	AppBar,
	Button,
	Card,
	Fab,
	makeStyles,
	Toolbar,
	Typography,
} from '@material-ui/core';
import axios from 'axios';
import { useQuery } from 'react-query';

import classes from '@styles/CreateTeam.module.scss';
import { MoonLoader } from 'react-spinners';
import Box from '@material-ui/core/Box';
import LinearProgress, {
	LinearProgressProps,
} from '@material-ui/core/LinearProgress';
import versusMatchStore from '@stores/VersusMatchStore';
import Head from 'next/head';
import LogoutButton from '@containers/Logout/LogoutButton';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

// import EachPlayer from '@containers/Create-Match/EachPlayer';
import Image from 'next/image';

import selectedPlayersStore from '@stores/SelectedPlayersStore';
import idStore from '@stores/idStore';
import { DataGrid } from '@material-ui/data-grid';
import HomeButton from '@containers/HomeButton/HomeButton';

function LinearProgressWithLabel(
	props: LinearProgressProps & { value: number }
) {
	return (
		<Box display='flex' alignItems='center'>
			<Box width='100%' mr={1}>
				<LinearProgress variant='determinate' {...props} />
			</Box>
			<Box minWidth={35}>
				<Typography variant='body2' style={{ color: 'white' }}>{`${Math.round(
					props.value
				)}%`}</Typography>
			</Box>
		</Box>
	);
}

const CreateTeamScreen: React.FC = () => {
	const [progress, setProgress] = React.useState(0);
	// const [creditprogress, setcreditProgress] = React.useState(100);

	const idstore = idStore((state) => state);

	const router = useRouter();

	// const [inc, setinc] = React.useState(0);

	const matchStore = versusMatchStore((state) => state);
	const players = selectedPlayersStore((state) => state);
	const [ischeckbox, setIsCheckbox] = React.useState(true);

	const [selectedplayers, setselectedplayers] = React.useState<string[]>([]);

	// console.log('selectedplayers:' + selectedplayers);

	// const [dis, setdis] = React.useState(false);

	const [totalCredits, settotalCredits] = React.useState(100);
	let id: string;
	let rows: any;

	const columns = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'playername', headerName: 'Player Name', width: 300 },
		{ field: 'credits', headerName: 'Credits', width: 130 },
	];

	React.useEffect(() => {
		console.log(router.isReady);
		if (typeof cookies.get('authSession') === 'undefined') {
			router.replace('/');
		}
		if (router.isReady) {
			window.localStorage.setItem('id', router.query['id'] as string);
		}
	});

	const { isLoading, isError, data, refetch } = useQuery(
		'playerlist',
		async () => {
			id = window.localStorage.getItem('id') as string;

			const { data } = await axios.get(`/api/match/players/${id}.json`, {
				withCredentials: true,
			});
			return data;
		},
		{
			retry: false,
			retryDelay: 10000,
			refetchOnWindowFocus: false,
		}
	);

	if (data) {
		rows = (data['players'] as string[]).map((eachPlayerName, index) => {
			return {
				id: index + 1,
				playername: eachPlayerName,
				credits: data['credits'][index] as number,
			};
		});
	}

	const useStyles = makeStyles({
		root: {
			width: '100%',
			marginLeft: '5px',
			marginTop: '10px',
		},
	});
	const style = useStyles();
	return (
		<div className={classes.background}>
			<Head>
				<title>Fantasy 11 | Create Team</title>
				<link rel='icon' href='/logo.png' />
			</Head>
			<Card raised className={classes.leftPortionCard}>
				<AppBar
					position='static'
					style={{
						backgroundColor: '#FD3A4A',
						height: '20%',
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
							Create Team
						</Typography>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
							}}
						>
							<Typography variant='h6'>
								Credits left: {`${totalCredits}`}
							</Typography>
							<div>
								<HomeButton />

								<LogoutButton />
							</div>
						</div>
					</Toolbar>
					<Typography variant='h6' style={{ textAlign: 'center' }}>
						{matchStore.oneTeam} vs {matchStore.twoTeam}
					</Typography>
					<div className={style.root}>
						<LinearProgressWithLabel value={progress} />
					</div>
				</AppBar>
				{/* <div className={classes.topTile}>
					<Typography variant='h6' style={{ marginLeft: '20px' }}>
						Players
					</Typography>
					<Typography variant='h6' style={{ marginRight: '20%' }}>
						Credits
					</Typography>
				</div> */}

				{isLoading ? (
					<MoonLoader />
				) : isError ? (
					<Button onClick={() => refetch()}>Try Again</Button>
				) : (
					// (data['players'] as string[]).map((eachPlayerName, index) => {
					// 	return (
					// 		<EachPlayer
					// 			playername={eachPlayerName}
					// 			key={index}
					// 			credits={data['credits'][index]}
					// 			isdiabled={dis}
					// 			isnotplusFunction={() => {
					// 				if (inc === 0) return;

					// setselectedplayers((state) => {
					// 	let newplayerslist = [...state];
					// 	newplayerslist = newplayerslist.filter(
					// 		(item) => item !== eachPlayerName
					// 	);

					// 	return newplayerslist;
					// });
					// 				if (inc !== 11) {
					// 					setdis(false);
					// setcreditProgress(
					// 	(prevprog) =>
					// 		prevprog + (data['credits'][index] as number)
					// );
					// 					console.log(totalCredits);
					// setProgress((prevProgress) =>
					// 	prevProgress <= 20 ? 0 : prevProgress - 9.09090909091
					// );
					// 				} else {
					// 					setdis(true);
					// 				}
					// 				setinc((previnc) => previnc - 1);

					// 				console.log(selectedplayers);
					// 			}}
					// 			isplusFunction={() => {
					// 				if (progress === 100 || totalCredits === 0 || inc === 11) {
					// 					setdis(true);

					// 					return;
					// 				}
					// 				setdis(false);

					// setProgress((prevProgress) =>
					// 	prevProgress >= 85 ? 100 : prevProgress + 9.09090909091
					// );
					// 				console.log(totalCredits);
					// 				setcreditProgress(
					// 					(prevprog) => prevprog - (data['credits'][index] as number)
					// 				);
					// settotalCredits(
					// 	(totalcredits) =>
					// 		totalcredits - (data['credits'][index] as number)
					// );
					// 				console.log(totalCredits);
					// 				setinc((previnc) => previnc + 1);

					// 				setselectedplayers((state) => [...state, eachPlayerName]);
					// 			}}
					// 		/>
					// 	);
					// })

					<div style={{ height: 570, width: '100%' }}>
						<DataGrid
							rows={rows}
							columns={columns}
							disableColumnSelector
							onColumnHeaderClick={() => {
								return;
							}}
							pageSize={22}
							disableColumnFilter
							disableColumnMenu
							showColumnRightBorder
							loading={isLoading}
							disableColumnReorder
							disableMultipleSelection
							checkboxSelection={ischeckbox}
							onRowSelected={(row) => {
								// if (totalCredits < row.data['credit']) {
								// 	return;
								// }
								if (selectedplayers.length === 11 || totalCredits === 0) {
									setIsCheckbox(false);

									if (progress !== 100)
										settotalCredits((prevprog) => {
											return prevprog + row.data['credits'];
										});
									return;
								} else {
									setIsCheckbox(true);
								}
								if (
									row.isSelected &&
									row.data['playername'] &&
									selectedplayers.length <= 10
								) {
									setselectedplayers((state) => [
										...state,
										row.data['playername'],
									]);
									setProgress((prevProgress) =>
										prevProgress >= 85 ? 100 : prevProgress + 9.09090909091
									);
									settotalCredits(
										(totalcredits) => totalcredits - row.data['credits']
									);
								} else {
									setselectedplayers((state) => {
										let newplayerslist = [...state];
										newplayerslist = newplayerslist.filter(
											(item) => item !== row.data['playername']
										);

										return newplayerslist;
									});
									setProgress((prevProgress) =>
										prevProgress <= 20 ? 0 : prevProgress - 9.09090909091
									);
									settotalCredits((prevprog) => {
										return prevprog + row.data['credits'];
									});
								}
							}}
						/>
					</div>
				)}
				<div
					style={{
						display: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Fab
						variant='extended'
						size='small'
						style={{
							padding: '10px',
							marginBottom: '10px',
							marginTop: '10px',
							backgroundColor: '#fd3a4b',
						}}
						color='primary'
						aria-label='add'
						onClick={() => {
							if (selectedplayers.length <= 10) return;
							players.setSelectedPlayers(selectedplayers);
							id = window.localStorage.getItem('id') as string;
							idstore.setid(id);
							router.push(`${id}/select-captain`);
						}}
					>
						Continue
					</Fab>
					{!ischeckbox ? (
						<Fab
							variant='extended'
							size='small'
							style={{
								padding: '10px',
								marginBottom: '10px',
								marginTop: '10px',
								marginLeft: '10px',
								backgroundColor: '#fd3a4b',
							}}
							color='primary'
							aria-label='add'
							onClick={() => {
								setselectedplayers((state) => {
									let newplayerslist = [...state];
									let player = newplayerslist[10];
									// console.log(player);
									let selectedRow = rows.filter(
										(eachRow: any) => eachRow['playername'] === player
									);
									// console.log(selectedRow[0]['credits']);
									newplayerslist.pop();
									settotalCredits((prevprog) => {
										return prevprog + selectedRow[0]['credits'];
									});

									return newplayerslist;
								});
								setProgress((prevProgress) =>
									prevProgress <= 20 ? 0 : prevProgress - 9.09090909091
								);
								setIsCheckbox(true);
							}}
						>
							Remove last Selected Player
						</Fab>
					) : (
						<div></div>
					)}
				</div>
			</Card>
			<div className={classes.rightPortion}>
				<div className={classes.logo} />
				<Image
					src='/logo.png'
					alt='Logo of fantasy-11'
					width={80}
					height={80}
				/>
				<Typography className={classes.title}>Selected Players:</Typography>
				{selectedplayers.map((playername, index) => {
					return (
						<Typography key={index} align='left' className={classes.subTitle}>
							{index + 1}: {playername}
						</Typography>
					);
				})}
			</div>
		</div>
	);
};

export default CreateTeamScreen;
