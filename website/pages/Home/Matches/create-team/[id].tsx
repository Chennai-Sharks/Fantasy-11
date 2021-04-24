import React from 'react';
import { useRouter } from 'next/router';

import { AppBar, Button, Card, Toolbar, Typography } from '@material-ui/core';
import axios from 'axios';
import { useQuery } from 'react-query';

import classes from '../../../../styles/CreateTeam.module.scss';
import { MoonLoader } from 'react-spinners';

const CreateTeamScreen: React.FC = () => {
	const router = useRouter();
	const {
		query: { dynamic, id },
	} = router;

	return (
		<div className={classes.background}>
			<Card raised className={classes.leftPortionCard}>
				<AppBar
					position='static'
					style={{ backgroundColor: '#FD3A4A', height: '30%' }}
				>
					<Toolbar>
						<Typography variant='h6'>Welcome to Fantasy 11 League</Typography>
					</Toolbar>
				</AppBar>
				<Typography className={classes.title}>Available Matches</Typography>
				{/* {isLoading ? (
					<MoonLoader />
				) : isError ? (
					<Button>Try Again</Button>
				) : (
					<div>hello</div>
				)} */}
			</Card>
		</div>
	);
};

export default CreateTeamScreen;
