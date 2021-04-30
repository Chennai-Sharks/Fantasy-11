import React from 'react';
import Image from 'next/image';

import { useRouter } from 'next/router';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

import classes from '@styles/CreateTeam.module.scss';
import { Card, Typography } from '@material-ui/core';

const Scorecard: React.FC = () => {
	const router = useRouter();

	React.useEffect(() => {
		if (typeof cookies.get('authSession') === 'undefined') {
			router.replace('/');
		}
	}, []);

	return (
		<div className={classes.background}>
			<Card className={classes.leftPortionCard}></Card>
			<div className={classes.rightPortion}>
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
