import React from 'react';
import Image from 'next/image';

import { useRouter } from 'next/router';
import Head from 'next/head';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

import classes from '@styles/CreateTeam.module.scss';
import { AppBar, Card, Toolbar, Typography } from '@material-ui/core';
import LogoutButton from '@containers/Logout/LogoutButton';

const Scorecard: React.FC = () => {
	const router = useRouter();

	React.useEffect(() => {
		if (typeof cookies.get('authSession') === 'undefined') {
			router.replace('/');
		}
	}, []);

	return (
		<div className={classes.background}>
			<Head>
				<title>Fantasy 11 | Scoreboard</title>
				<link rel='icon' href='/logo.png' />
			</Head>
			<Card className={classes.leftPortionCard}>
				<AppBar
					position='static'
					style={{
						backgroundColor: '#FD3A4A',
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
							ScoreBoard
						</Typography>
						<LogoutButton />
					</Toolbar>
				</AppBar>
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
				<Typography className={classes.subTitle}>Score Card</Typography>
			</div>
		</div>
	);
};

export default Scorecard;
