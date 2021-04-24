import { AppBar, Card, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import MatchCard from '../../../containers/Match/MatchCard';

import classes from '../../../styles/Match.module.scss';
const MatchScreen: React.FC = () => {
	return (
		<div className={classes.background}>
			<Card raised className={classes.leftPortionCard}>
				<AppBar position='static' style={{ backgroundColor: '#fd3a4b' }}>
					<Toolbar>
						<Typography variant='h6'>Welcome to Fantasy 11 League</Typography>
					</Toolbar>
				</AppBar>
				<Typography className={classes.title}>Available Matches</Typography>
				<MatchCard />
			</Card>
		</div>
	);
};

export default MatchScreen;
