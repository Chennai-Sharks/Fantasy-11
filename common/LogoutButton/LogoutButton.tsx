import { Button, Snackbar, Tooltip } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useRouter } from 'next/router';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

interface LogoutButtonProps {}

const LogoutButton: React.FC<LogoutButtonProps> = () => {
  const router = useRouter();
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <React.Fragment>
      <Tooltip title='Logout' aria-label='logout'>
        <Button
          style={{
            backgroundColor: '#fd3a4b',
          }}
          onClick={async () => {
            setOpenAlert(true);
            await axios.post(
              `/api/logout`,
              {
                key: 'static_key',
              },
              {
                withCredentials: true,
              }
            );
            router.replace('/');
          }}
        >
          <ExitToAppIcon style={{ color: 'white' }} />
        </Button>
      </Tooltip>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleClose}
        message={'Logging Out...'}
        action={
          <Button onClick={handleClose} style={{ color: 'white' }}>
            Close
          </Button>
        }
      />
    </React.Fragment>
  );
};
export default LogoutButton;
