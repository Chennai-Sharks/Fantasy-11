import {
	AppBar,
	Button,
	Card,
	Fab,
	Toolbar,
	Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import captainStore from '@stores/CaptainStore';
import idStore from '@stores/saveidStore';
import selectedPlayersStore from '@stores/SelectedPlayersStore';
import versusMatchStore from '@stores/VersusMatchStore';
import Image from 'next/image';
import Head from 'next/head';

import classes from '@styles/CreateTeam.module.scss';

const SelectCaptainScreen: React.FC = () => {
	const matchStore = versusMatchStore((state) => state);
	const selectedplayers = selectedPlayersStore((state) => state);
	const captain = captainStore((state) => state);

	const router = useRouter();
	const idstore = idStore((state) => state);

	const myRedirectFunction = function () {
		if (typeof window !== 'undefined') {
			router.push({
				pathname: 'select-captain/game',
				query: { id: idstore.id },
			});
		}
	};

	return (
		<div className={classes.background}>
			<Head>
				<title>Fantasy 11 | Select Captain</title>
				<link rel='icon' href='/logo.png' />
			</Head>
			<Card raised className={classes.leftPortionCard}>
				<AppBar
					position='static'
					style={{
						backgroundColor: '#FD3A4A',
						height: '20%',
					}}
				>
					<Toolbar>
						<Typography
							variant='h6'
							style={{ margin: '10px', textAlign: 'center' }}
						>
							Select Captain and Vice Captain
						</Typography>
					</Toolbar>
					<Typography variant='h6' style={{ textAlign: 'center' }}>
						{matchStore.oneTeam} vs {matchStore.twoTeam}
					</Typography>
				</AppBar>
				{selectedplayers.selectedPlayers.map((eachselectedplayer, index) => {
					return (
						<div className={classes.PlayerCard} key={index}>
							<Typography align='center' className={classes.subTitle}>
								{eachselectedplayer}
							</Typography>
							<div>
								<Button
									className={classes.Button}
									onClick={() => {
										if (
											captain.captain === eachselectedplayer ||
											captain.vicecaptain === eachselectedplayer
										)
											return;
										captain.setcaptain(eachselectedplayer);
									}}
								>
									Captain
								</Button>

								<Button
									className={classes.Button}
									onClick={() => {
										if (
											captain.captain === eachselectedplayer ||
											captain.vicecaptain === eachselectedplayer
										)
											return;
										captain.setvicecaptain(eachselectedplayer);
									}}
								>
									Vice Captain
								</Button>
							</div>
						</div>
					);
				})}
			</Card>
			<div className={classes.rightPortion}>
				<div className={classes.logo} />
				<Image
					src='/logo.png'
					alt='Logo of fantasy-11'
					width={80}
					height={80}
				/>
				<Typography className={classes.title}>
					Captain and Vice Captain
				</Typography>
				<Typography className={classes.subTitle}>
					Captain: {captain.captain}
				</Typography>

				<Typography className={classes.subTitle}>
					Vice Captain: {captain.vicecaptain}
				</Typography>
				<Fab
					variant='extended'
					size='small'
					style={{
						marginTop: '10px',
						backgroundColor: '#fd3a4b',
					}}
					color='primary'
					aria-label='add'
					onClick={() => {
						if (captain.captain === '' || captain.vicecaptain === '') return;
						// do something then..
						myRedirectFunction();
					}}
				>
					Continue
				</Fab>
			</div>
		</div>
	);
};

export default SelectCaptainScreen;
