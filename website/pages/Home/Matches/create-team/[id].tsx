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

function LinearProgressWithLabel(
	props: LinearProgressProps & { value: number }
) {
	return (
		<Box display='flex' alignItems='center'>
			<Box width='100%' mr={1}>
				<LinearProgress variant='determinate' {...props} />
			</Box>
			<Box minWidth={35}>
				<Typography variant='body2' color='textSecondary'>{`${Math.round(
					props.value
				)}%`}</Typography>
			</Box>
		</Box>
	);
}

const CreateTeamScreen: React.FC = () => {
	const [progress, setProgress] = React.useState(9.09090909091);
	const router = useRouter();

	const matchStore = versusMatchStore((state) => state);

	const [totalCredits, minustotalCredits] = React.useState(100);
	const {
		query: { dynamic, id },
	} = router;

	const useStyles = makeStyles({
		root: {
			width: '100%',
			marginLeft: '5px',
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
							Credits left {totalCredits}
						</Typography>
					</Toolbar>
					<Typography variant='h6'>
						{matchStore.oneTeam} vs {matchStore.twoTeam}
					</Typography>
					<div className={style.root}>
						<LinearProgressWithLabel value={progress} />
					</div>
				</AppBar>

				{/* {isLoading ? (
					<MoonLoader />
				) : isError ? (
					<Button>Try Again</Button>
				) : (
					<div>hello</div>
				)} */}
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
