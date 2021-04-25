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
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import captainStore from '../../../../../../../stores/CaptainStore';
import idStore from '../../../../../../../stores/saveidStore';
import selectedPlayersStore from '../../../../../../../stores/SelectedPlayersStore';
import versusMatchStore from '../../../../../../../stores/VersusMatchStore';

import classes from '../../../../../../../styles/CreateTeam.module.scss';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const SelectCaptainScreen: React.FC = () => {
	const matchStore = versusMatchStore((state) => state);
	const selectedplayers = selectedPlayersStore((state) => state);
	const idstore = idStore((state) => state);

	const router = useRouter();

	const [totalScore, setTotalScore] = React.useState(0);
	const [wickets, setWickets] = React.useState(0);
	const [playerPoints, setPlayerPoints] = React.useState({});

	const myRedirectFunction = function () {
		if (typeof window !== 'undefined') {
			router.push({
				pathname: 'select-captain/game',
				query: { id: idstore.id },
			});
		}
	};

	React.useEffect(() => {
		const connectionOptions: any = {
			'force new connection': true,
			reconnectionAttempts: 'Infinity',
			timeout: 10000,
			transports: ['websocket'],
		};

		socket = io('ws://localhost:5000/', connectionOptions);

		socket.emit(
			'startMatch',
			selectedplayers.selectedPlayers,
			`${idstore.id}.json`
		);
	});

	React.useEffect(() => {
		socket.on('score', (data) => console.log(data));
	});

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
