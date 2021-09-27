import React from 'react';
import { Button, Tooltip } from '@material-ui/core';
import { useRouter } from 'next/router';
import DashboardIcon from '@material-ui/icons/Dashboard';

interface ScoreBoardButtonProps {}

const ScoreBoardButton: React.FC<ScoreBoardButtonProps> = () => {
  const router = useRouter();

  return (
    <Tooltip title='ScoreBoard' aria-label='Scoreboard'>
      <Button
        style={{
          backgroundColor: '#fd3a4b',
        }}
        onClick={() => {
          router.push('/home/scoreboard');
        }}
      >
        <DashboardIcon style={{ color: 'white' }} />
      </Button>
    </Tooltip>
  );
};
export default ScoreBoardButton;
