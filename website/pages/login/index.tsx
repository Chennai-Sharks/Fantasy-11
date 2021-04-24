import Head from 'next/head';
import React from 'react';
import { Button, Card, Typography } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import FacebookLogin from 'react-facebook-login';

import classes from '../../styles/Login.module.scss';
import styles from '../../styles/Home.module.scss';
import LoginForm from '../../containers/Auth/LoginForm';

const PhoneLoginForm: React.FC = () => {
	const responseFacebook = (response: any) => {
		console.log(response);
	};
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
						<FacebookLogin
							appId='801446123894360'
							callback={responseFacebook}
							fields='id,email,name'
						/>
						<Typography
							className={styles.title}
							style={{
								fontSize: '20px',
								marginTop: '10px',
							}}
						>
							Or
						</Typography>
						<LoginForm />
					</div>
				</Card>
			</div>
		</React.Fragment>
	);
};

export default PhoneLoginForm;
