import React from 'react';
import { Card, Typography } from '@material-ui/core';

import classes from '../../../styles/Login.module.scss';
import styles from '../../../styles/Home.module.scss';

const EmailLoginForm: React.FC = () => {
	return (
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
							fontSize: '35px',
							textAlign: 'center',
						}}
					>
						Login using Email and Password
					</Typography>
				</div>
				<div className={classes.rightPortionCard}></div>
			</Card>
		</div>
	);
};

export default EmailLoginForm;
