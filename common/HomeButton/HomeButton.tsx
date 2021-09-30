import React from 'react';
import { useRouter } from 'next/router';
import { Tooltip, Button } from '@material-ui/core';
import SportsCricketIcon from '@material-ui/icons/SportsCricket';
interface HomeButtonProps {}

const HomeButton: React.FC<HomeButtonProps> = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      <Tooltip title='Home/Matches Page' aria-label='Home/Matches Page'>
        <Button
          style={{
            backgroundColor: '#fd3a4b',
          }}
          onClick={() => {
            router.push('/home/matches');
          }}
        >
          <SportsCricketIcon style={{ color: 'white' }} />
        </Button>
      </Tooltip>
    </React.Fragment>
  );
};
export default HomeButton;
