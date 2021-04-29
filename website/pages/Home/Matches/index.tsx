import {
	AppBar,
	Button,
	Card,
	StylesProvider,
	Toolbar,
	Typography,
} from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Image from 'next/image';

import { MoonLoader } from 'react-spinners';
import MatchCard from '@containers/Match/MatchCard';

import { useRouter } from 'next/router';

import classes from '@styles/Match.module.scss';
import versusMatchStore from '@stores/VersusMatchStore';
import Head from 'next/head';
import { motion } from 'framer-motion';

const stagger = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const MatchScreen: React.FC = () => {
	const router = useRouter();

	const { isLoading, isError, data, refetch } = useQuery(
		'matches',
		async () => {
			const { data } = await axios.get('http://localhost:4000/api/match', {
				withCredentials: true,
			});
			return data;
		},
		{
			retry: false,
			retryDelay: 10000,
			refetchOnWindowFocus: false,
		}
	);

	const matchStore = versusMatchStore((state) => state);

	return (
		<motion.div
			initial='initial'
			animate='animate'
			exit={{ opacity: 0 }}
			className={classes.background}
		>
			<Head>
				<title>Fantasy 11 | Matches</title>
				<link rel='icon' href='/logo.png' />
			</Head>
			<StylesProvider injectFirst>
				<Card raised className={classes.leftPortionCard}>
					<AppBar position='static' style={{ backgroundColor: '#fd3a4b' }}>
						<Toolbar
							style={{
								display: 'grid',
								placeItems: 'center',
							}}
						>
							<Typography
								variant='h6'
								align='center'
								style={{
									fontWeight: 'bold',
								}}
							>
								Welcome to Fantasy 11 League
							</Typography>
						</Toolbar>
					</AppBar>
					<Typography className={classes.title}>Available Matches</Typography>

					{isLoading ? (
						<MoonLoader />
					) : isError ? (
						<div>
							<Typography className={classes.subTitle}>
								You are not authenticated or the Server is busy right now.
								<br />
								<br />
								<Button onClick={() => refetch()}>Try Again</Button>
							</Typography>
						</div>
					) : (
						(data.teamInfo as Array<{
							match: string;
							teams: string[];
						}>).map((eachMatchInfo, index) => {
							return (
								<motion.div style={{ width: '100%' }} variants={stagger}>
									<MatchCard
										key={index}
										onTap={() => {
											matchStore.setoneTeam(eachMatchInfo['teams'][0]);
											matchStore.setTwoTeam(eachMatchInfo['teams'][1]);
											router.push(
												`Matches/create-team/${eachMatchInfo['match'].substring(
													0,
													6
												)}`
											);
										}}
										one={eachMatchInfo['teams'][0]}
										two={eachMatchInfo['teams'][1]}
									/>
								</motion.div>
							);
						})
					)}
				</Card>
			</StylesProvider>
			<motion.div variants={stagger} className={classes.rightPortion}>
				<div className={classes.logo} />
				<Image
					src='/logo.png'
					alt='Logo of fantasy-11'
					width={100}
					height={100}
					className={classes.logo}
				/>
				<Typography className={classes.title}>Fantasy 11</Typography>
				<Typography className={classes.subTitle}>
					Make sure you make the right choices
				</Typography>
			</motion.div>
		</motion.div>
	);
};

export default MatchScreen;
