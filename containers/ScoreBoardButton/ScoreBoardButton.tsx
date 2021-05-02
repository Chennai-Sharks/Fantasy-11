import { Button, Tooltip } from '@material-ui/core';
import React from 'react';
import { useRouter } from 'next/router';
import DashboardIcon from '@material-ui/icons/Dashboard';

interface ScoreBoardButtonProps {}

const ScoreBoardButton: React.FC<ScoreBoardButtonProps> = () => {
	const router = useRouter();

	return (
		<React.Fragment>
			<Tooltip title='ScoreBoard' aria-label='Scoreboard'>
				<Button
					style={{
						backgroundColor: '#fd3a4b',
					}}
					onClick={() => {
						router.push('/Home/score-card');
					}}
				>
					<DashboardIcon style={{ color: 'white' }} />
				</Button>
			</Tooltip>
		</React.Fragment>
	);
};
export default ScoreBoardButton;
