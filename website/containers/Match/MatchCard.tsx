import { Button, Card, Snackbar, Typography } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { MoonLoader } from 'react-spinners';

import classes from './MatchCard.module.scss';

interface MatchCardProps {
	one: string;
	two: string;
	onTap: () => void;
}

const MatchCard: React.FC<MatchCardProps> = (props) => {
	return (
		<React.Fragment>
			<Card raised className={classes.MatchCard} onClick={props.onTap}>
				<Typography className={classes.subTitle}>{props.one}</Typography>
				<Typography className={classes.subTitle}>Vs</Typography>
				<Typography className={classes.subTitle}>{props.two}</Typography>
			</Card>
		</React.Fragment>
	);
};

export default MatchCard;
