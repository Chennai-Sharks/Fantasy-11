import { AppBar, Button, Card, Toolbar, Typography } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { MoonLoader } from 'react-spinners';
import MatchCard from '../../../containers/Match/MatchCard';

import { useRouter } from 'next/router';

import classes from '../../../styles/Match.module.scss';
import versusMatchStore from '../../../stores/VersusMatchStore';
const MatchScreen: React.FC = () => {
	const router = useRouter();

	const { isLoading, isError, data, refetch } = useQuery(
		'matches',
		async () => {
			const { data } = await axios.get('http://localhost:4000/api/match');
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
		<div className={classes.background}>
			<Card raised className={classes.leftPortionCard}>
				<AppBar position='static' style={{ backgroundColor: '#fd3a4b' }}>
					<Toolbar>
						<Typography variant='h6'>Welcome to Fantasy 11 League</Typography>
					</Toolbar>
				</AppBar>
				<Typography className={classes.title}>Available Matches</Typography>
				{isLoading ? (
					<MoonLoader />
				) : isError ? (
					<Button onClick={() => refetch()}>Try Again</Button>
				) : (
					(data.teamInfo as Array<{
						match: string;
						teams: string[];
					}>).map((eachMatchInfo, index) => {
						return (
							<MatchCard
								key={index}
								onTap={() => {
									// console.log(eachMatchInfo['match'].substring(0, 6))
									matchStore.setoneTeam(eachMatchInfo['teams'][0]);
									matchStore.setTwoTeam(eachMatchInfo['teams'][1]);
									router.push(
										`matches/create-team/${eachMatchInfo['match'].substring(
											0,
											6
										)}`
									);
								}}
								one={eachMatchInfo['teams'][0]}
								two={eachMatchInfo['teams'][1]}
							/>
						);
					})
				)}
			</Card>
		</div>
	);
};

export default MatchScreen;
