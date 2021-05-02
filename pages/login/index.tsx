import Head from 'next/head';
import React from 'react';
import { Card, Typography } from '@material-ui/core';

import classes from '@styles/Login.module.scss';
import styles from '@styles/Home.module.scss';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import LoginForm from '@containers/Auth/LoginForm';

const LoginScreen: React.FC = () => {
	const router = useRouter();

	React.useEffect(() => {
		if (typeof cookies.get('authSession') !== 'undefined') {
			router.replace('/Home/Matches');
		}
	}, []);

	return (
		<React.Fragment>
			<Head>
				<title>Fantasy 11 | Login</title>
			</Head>
			<div className={classes.background}>
				<Card
					className={classes.Card}
					variant='elevation'
					raised
					style={{
						borderRadius: '20px',
					}}
				>
					<div className={classes.leftPortionCard}>
						<Typography
							className={styles.title}
							style={{
								color: 'white',
							}}
						>
							Login
						</Typography>
					</div>
					<div className={classes.rightPortionCard}>
						<LoginForm />
					</div>
				</Card>
			</div>
		</React.Fragment>
	);
};

export default LoginScreen;
