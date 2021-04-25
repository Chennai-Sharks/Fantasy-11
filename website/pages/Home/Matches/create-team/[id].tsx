import React from 'react';
import { useRouter } from 'next/router';

import {
	AppBar,
	Button,
	Card,
	makeStyles,
	Toolbar,
	Typography,
} from '@material-ui/core';
import axios from 'axios';
import { useQuery } from 'react-query';

import classes from '../../../../styles/CreateTeam.module.scss';
import { MoonLoader } from 'react-spinners';
import Box from '@material-ui/core/Box';
import LinearProgress, {
	LinearProgressProps,
} from '@material-ui/core/LinearProgress';
import versusMatchStore from '../../../../stores/VersusMatchStore';
import EachPlayer from '../../../../containers/Create-Match/EachPlayer';

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
	const router = useRouter();

	const matchStore = versusMatchStore((state) => state);
	const [selectedplayers, setselectedplayers] = React.useState(['']);

	const [totalCredits, settotalCredits] = React.useState(100);
	let id: string;

	React.useEffect(() => {
		console.log(router.isReady);
		if (router.isReady) id = router.query['id'] as string;
	});

	const { isLoading, isError, data, refetch } = useQuery(
		'playerlist',
		async () => {
			const { data } = await axios.get(
				`http://localhost:4000/api/match/players/${id}.json`
			);
			return data;
		},
		{
			retry: false,
			retryDelay: 10000,
			refetchOnWindowFocus: false,
		}
	);

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
			<Card raised className={classes.leftPortionCard}>
				<AppBar
					position='static'
					style={{
						backgroundColor: '#FD3A4A',
						height: '30%',
					}}
				>
					<Toolbar>
						<Typography
							variant='h6'
							style={{ margin: '10px', textAlign: 'center' }}
						>
							Create Team
						</Typography>

						<Typography variant='h6' style={{ marginLeft: '50%' }}>
							Credits left {`${totalCredits}`}
						</Typography>
					</Toolbar>
					<Typography variant='h6' style={{ textAlign: 'center' }}>
						{matchStore.oneTeam} vs {matchStore.twoTeam}
					</Typography>
					<div className={style.root}>
						<LinearProgressWithLabel value={progress} />
					</div>
				</AppBar>
				<div className={classes.topTile}>
					<Typography variant='h6' style={{ marginLeft: '20px' }}>
						Players
					</Typography>
					<Typography variant='h6' style={{ marginRight: '20%' }}>
						Credits
					</Typography>
				</div>

				{isLoading ? (
					<MoonLoader />
				) : isError ? (
					<Button>Try Again</Button>
				) : (
					(data['players'] as string[]).map((eachPlayerName, index) => {
						return (
							<EachPlayer
								playername={eachPlayerName}
								key={index}
								credits={data['credits'][index]}
								isnotplusFunction={() => {
									setProgress((prevProgress) =>
										prevProgress <= 20 ? 0 : prevProgress - 9.09090909091
									);

									settotalCredits(
										(totalcredits) =>
											totalcredits + (data['credits'][index] as number)
									);
									console.log(totalCredits);

									// setselectedplayers((state) => {
									// 	let newplayerslist = [...state];
									// 	newplayerslist = newplayerslist.filter(
									// 		(item) => item !== eachPlayerName
									// 	);
									// 	return newplayerslist;
									// });
									console.log(selectedplayers);
								}}
								isplusFunction={() => {
									if (progress === 100 || totalCredits === 0) {
										return;
									}
									console.log(totalCredits);

									setProgress((prevProgress) =>
										prevProgress >= 85 ? 100 : prevProgress + 9.09090909091
									);
									settotalCredits(
										(totalcredits) =>
											totalcredits - (data['credits'][index] as number)
									);
									console.log(totalCredits);

									// setselectedplayers((state) => [...state, eachPlayerName]);
								}}
							/>
						);
					})
				)}

				<Button
					onClick={() =>
						setProgress((prevProgress) =>
							prevProgress >= 85 ? 100 : prevProgress + 9.09090909091
						)
					}
				>
					hello
				</Button>
			</Card>
		</div>
	);
};

export default CreateTeamScreen;
