import React from 'react';

import userIdStore from '@stores/UserIdStore';
import axios from 'axios';
import { useQuery } from 'react-query';
import { MoonLoader } from 'react-spinners';
import { Button, Typography } from '@material-ui/core';

import classes from '@styles/CreateTeam.module.scss';

interface ProfileInfoProps {}

const ProfileInfo: React.FC<ProfileInfoProps> = (props) => {
  const { userId } = userIdStore((state) => state);

  const { isLoading, isError, data, refetch } = useQuery<{
    email: string;
    totalpoints: number;
  }>(
    'profile info',
    async () => {
      const { data } = await axios.get(`/api/user-info/${userId}`, {
        withCredentials: true,
      });
      return data;
    },
    {
      retry: false,
      retryDelay: 10000,
      refetchOnWindowFocus: false,
    }
  );
  console.log(data);
  return (
    <div>
      {isLoading ? (
        <div
          style={{ marginTop: '15px', display: 'grid', placeItems: 'center' }}
        >
          <MoonLoader loading={isLoading} />
        </div>
      ) : isError ? (
        <Typography className={classes.subTitle}>
          The Server is busy right Now.
          <br />
          <Button onClick={() => refetch()}>Try Again</Button>
        </Typography>
      ) : (
        <>
          <Typography className={classes.subTitle}>
            Email: {data?.email ?? '---'}
          </Typography>
          <Typography className={classes.subTitle}>
            Total points: {data?.totalpoints}
          </Typography>
        </>
      )}
    </div>
  );
};
export default ProfileInfo;
