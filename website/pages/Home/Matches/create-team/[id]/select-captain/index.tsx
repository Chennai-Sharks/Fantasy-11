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
import captainStore from '../../../../../../stores/CaptainStore';
import idStore from '../../../../../../stores/saveidStore';
import selectedPlayersStore from '../../../../../../stores/SelectedPlayersStore';
import versusMatchStore from '../../../../../../stores/VersusMatchStore';

import classes from '../../../../../../styles/CreateTeam.module.scss';

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
			<Card raised className={classes.leftPortionCard}>
				<AppBar
					position='static'
					style={{
						backgroundColor: '#FD3A4A',
						height: '30%',
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
						<Card key={index}>
							{eachselectedplayer}

							<Button
								onClick={() => {
									if (
										captain.captain === eachselectedplayer ||
										captain.vicecaptain === eachselectedplayer
									)
										return;
									captain.setcaptain(eachselectedplayer);
								}}
							>
								{' '}
								Captain
							</Button>

							<Button
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
						</Card>
					);
				})}
				{/* <Card className={classes.PlayerCard}>
					<Typography className={classes.subTitle}>
						{props.playername}
					</Typography>
					<Typography
						className={classes.subTitle}
						style={{ marginLeft: '36%' }}
					>
						{props.credits}
					</Typography>
					<IconButton
						style={{ marginRight: '20px' }}
						onClick={() => {
							// console.log(inc);
							// if (inc === 12) return;
							if (isplus) {
								props.isplusFunction();
								// setinc((previnc) => previnc + 1);
							} else {
								props.isnotplusFunction();
								// setinc((previnc) => previnc - 1);
							}
							setisplus(!isplus);
						}}
					>
						{isplus ? (
							<AddIcon style={{ color: '#07003b' }} />
						) : (
							<RemoveIcon style={{ color: '#07003b' }} />
						)}
					</IconButton>
				</Card> */}
			</Card>
			<div>captain:{captain.captain}</div>
			<div>vice captain :{captain.vicecaptain}</div>
			<Fab
				variant='extended'
				size='small'
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
	);
};

export default SelectCaptainScreen;
