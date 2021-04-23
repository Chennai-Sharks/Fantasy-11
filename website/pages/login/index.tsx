import Head from 'next/head';
import React from 'react';
import { Button, Card, Typography } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';

import classes from '../../styles/Login.module.scss';
import styles from '../../styles/Home.module.scss';

const PhoneLoginForm: React.FC = () => {
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
						<Button
							className={classes.Button}
							startIcon={<FacebookIcon style={{ color: '#4267B2' }} />}
						>
							Login With Facebook
						</Button>
						<Typography
							className={styles.title}
							style={{
								fontSize: '20px',
							}}
						>
							Or
						</Typography>
						<Button className={classes.Button}>Login using OTP</Button>
						<Typography
							className={styles.title}
							style={{
								fontSize: '20px',
							}}
						>
							Or
						</Typography>
						<Button className={classes.Button}>
							Login Using Email and Passoword
						</Button>
					</div>
				</Card>
			</div>
		</React.Fragment>
	);
};

export default PhoneLoginForm;
