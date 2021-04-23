import React from 'react';

import { Card, Typography, Button } from '@material-ui/core';
import { useRouter } from 'next/router';

import classes from '../styles/Home.module.scss';

const Home: React.FC = () => {
	const router = useRouter();
	return (
		<div className={classes.background}>
			<Card
				className={classes.Card}
				elevation={10}
				raised
				style={{
					borderRadius: '20px',
				}}
			>
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
				<Button
					className={classes.Button}
					onClick={() => {
						router.push('/login');
					}}
				>
					Login
				</Button>
			</Card>
		</div>
	);
};

export default Home;
