import { Button, Card, Snackbar, Typography } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { MoonLoader } from 'react-spinners';

import classes from './MatchCard.module.scss';
const MatchCard: React.FC = () => {
	const [openAlert, setOpenAlert] = React.useState(false);
	const [snackContent, setsnackContent] = React.useState(' ');

	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenAlert(false);
	};

	// const { isLoading, isError, data, error } = useQuery('matches', async () => {
	// 	const { data } = await axios.get('http://localhost:4000/api/match');
	// 	return data;
	// });

	// if (isLoading) {
	// 	return <MoonLoader />;
	// }

	// if (isError) {
	// 	setsnackContent((error as Error).message);
	// 	return <Button>Try Again</Button>;
	// }

	return (
		<React.Fragment>
			<Card raised className={classes.MatchCard}>
				<Typography>one</Typography>
				<Typography>one</Typography>
				<Typography>one</Typography>
			</Card>
			<Snackbar
				open={openAlert}
				autoHideDuration={3000}
				onClose={handleClose}
				message={snackContent}
				action={
					<Button onClick={handleClose} style={{ color: 'white' }}>
						Close
					</Button>
				}
			/>
		</React.Fragment>
	);
};

export default MatchCard;
