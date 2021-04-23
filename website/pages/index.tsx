import React from 'react';

import { makeStyles, Card, Typography, Button } from '@material-ui/core';

const Home: React.FC = () => {
	const useStyles = makeStyles(() => ({
		background: {
			backgroundColor: '#E5EBF0',
			width: '100%',
			height: '100%',
			position: 'absolute',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
		},
		Card: {
			width: '50%',
			height: '65%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			borderRadius: '20px',
		},
		title: {
			fontFamily: 'Rubik, sans-serif',
			fontSize: '40px',
			color: '#07003B',
			fontWeight: 'bold',
			marginTop: '4%',
		},
		subTitle: {
			fontFamily: 'Rubik, sans-serif',
			fontSize: '20px',
			color: '#07003B',
			padding: '15px',
			textAlign: 'center',
		},
		Button: {
			borderRadius: '20px',
			backgroundColor: '#FD3A4B',
			color: 'white',
			width: '30%',
			marginTop: '15px',
			height: '50px',
			alignSelf: 'center',
			'&:hover': {
				color: 'black',
				borderRadius: '20px',
				border: '2px solid #FD3A4B',
			},
		},
	}));

	const classes = useStyles();
	return (
		<div className={classes.background}>
			<Card className={classes.Card} elevation={10}>
				<Typography className={classes.title}>Welcome to Fantasy 11</Typography>
				<Typography className={classes.subTitle}>
					Fantasy 11 is a Game of Skill where you create a team of real players
					for an upcoming match and compete with other fans for big prizes.
				</Typography>
				<Typography className={classes.subTitle}>
					Your team earns points based on your players’ performances in the
					real-life match, so make sure you make the right choices!
				</Typography>
				<Typography className={classes.subTitle}>
					Login to create your Fantasy 11 Team!!
				</Typography>
				<Button className={classes.Button}>Login</Button>
			</Card>
		</div>
	);
};

export default Home;
