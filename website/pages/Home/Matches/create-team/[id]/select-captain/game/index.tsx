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
import captainStore from '../../../../../../../stores/CaptainStore';
import idStore from '../../../../../../../stores/saveidStore';
import selectedPlayersStore from '../../../../../../../stores/SelectedPlayersStore';
import versusMatchStore from '../../../../../../../stores/VersusMatchStore';

import classes from '../../../../../../../styles/CreateTeam.module.scss';

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
					<Typography
						variant='h6'
						style={{ margin: '10px', textAlign: 'center' }}
					>
						Match
					</Typography>
					<Typography variant='h6' style={{ textAlign: 'center' }}>
						{matchStore.oneTeam} vs {matchStore.twoTeam}
					</Typography>
				</AppBar>
			</Card>
		</div>
	);
};

export default SelectCaptainScreen;
