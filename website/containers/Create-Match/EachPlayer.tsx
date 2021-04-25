import { Card, IconButton, Typography } from '@material-ui/core';
import React from 'react';

import classes from './EachPlayer.module.scss';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

interface EachPlayerProps {
	playername: string;
	credits: string;
	isplusFunction: () => void;
	isnotplusFunction: () => void;
}

const EachPlayer: React.FC<EachPlayerProps> = (props) => {
	const [isplus, setisplus] = React.useState(true);
	console.log(props);
	return (
		<div className={classes.PlayerCard}>
			<Typography className={classes.subTitle}>{props.playername}</Typography>
			<Typography className={classes.subTitle}>{props.credits}</Typography>
			<IconButton
				style={{ marginRight: '20px' }}
				onClick={() => {
					if (isplus) {
						props.isplusFunction();
					} else {
						props.isnotplusFunction();
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
		</div>
	);
};

export default EachPlayer;
