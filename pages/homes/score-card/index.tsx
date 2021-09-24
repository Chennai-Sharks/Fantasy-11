import React from 'react';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

import classes from '@styles/CreateTeam.module.scss';
import cardStyles from '@styles/ScoreCard.module.scss';
import LogoutButton from '@containers/Logout/LogoutButton';
import { AppBar, Button, Card, Toolbar, Typography } from '@material-ui/core';
import userIdStore from '@stores/UserIdStore';
import { useQuery } from 'react-query';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';
import HomeButton from '@containers/HomeButton/HomeButton';

const Scorecard: React.FC = () => {
  const router = useRouter();
  const useridstore = userIdStore((state) => state);

  React.useEffect(() => {
    if (typeof cookies.get('authSession') === 'undefined') {
      router.replace('/');
    }
  }, [router]);

  const { isLoading, isError, data, refetch } = useQuery<
    Array<{
      match: string;
      points: number;
    }>
  >(
    'scoreBoard',
    async () => {
      const { data } = await axios.get(
        `/api/scoreboard/${useridstore.userId}`,
        {
          withCredentials: true,
        }
      );
      return data;
    },
    {
      retry: false,
      retryDelay: 10000,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className={classes.background}>
      <Head>
        <title>Fantasy 11 | Scoreboard</title>
        <link rel='icon' href='/logo.png' />
      </Head>
      <Card className={classes.leftPortionCard}>
        <AppBar
          position='static'
          style={{
            backgroundColor: '#FD3A4A',
          }}
        >
          <Toolbar
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant='h6'
              style={{ margin: '10px', textAlign: 'center' }}
            >
              ScoreBoard
            </Typography>
            <div>
              <HomeButton />
              <LogoutButton />
            </div>
          </Toolbar>
        </AppBar>
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
          data?.map((eachMatch, index) => {
            return (
              <Card key={index} elevation={5} className={cardStyles.ScoreCard}>
                <Typography
                  style={{ marginLeft: '15px', marginRight: '15px' }}
                  className={classes.subTitle}
                >
                  Match:{` ${eachMatch.match}`}
                </Typography>
                <Typography align='left' className={classes.subTitle}>
                  Points:{` ${eachMatch.points}`}
                </Typography>
              </Card>
            );
          })
        )}
      </Card>
      <div className={classes.rightPortion}>
        <div className={classes.logo} />
        <div className={classes.logo} />

        <Image
          src='/logo.png'
          alt='Logo of fantasy-11'
          width={80}
          height={80}
        />
        <Typography className={classes.title}>Fantasy 11</Typography>
        <Typography className={classes.subTitle}>Score Card</Typography>
      </div>
    </div>
  );
};

export default Scorecard;
