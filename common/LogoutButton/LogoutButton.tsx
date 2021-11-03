import axios from 'axios';
import React from 'react';
import { useRouter } from 'next/router';
import { Button, CircularProgress, Tooltip } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PopUpDialog from '@common/Dialog/Dialog';

interface LogoutButtonProps {}

const LogoutButton: React.FC<LogoutButtonProps> = () => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <React.Fragment>
      <Tooltip title='Logout' aria-label='logout'>
        <Button
          style={{
            backgroundColor: '#fd3a4b',
          }}
          onClick={async () => {
            setOpenDialog(true);
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

      <PopUpDialog
        open={openDialog}
        content={
          <div
            style={{
              width: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress
              style={{
                color: '#fd3a4b',
              }}
            />
          </div>
        }
        title={'Logging out...'}
      />
    </React.Fragment>
  );
};
export default LogoutButton;
