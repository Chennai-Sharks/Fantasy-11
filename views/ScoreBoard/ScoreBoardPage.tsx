import React from 'react';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import axios from 'axios';
import { useQuery } from 'react-query';
import Cookies from 'universal-cookie';
import { MoonLoader } from 'react-spinners';
import { AppBar, Button, Card, Toolbar, Typography } from '@material-ui/core';

import userIdStore from '@stores/UserIdStore';
import LogoutButton from '@common/LogoutButton/LogoutButton';
import HomeButton from '@common/HomeButton/HomeButton';

import classes from '@styles/CreateTeam.module.scss';
import cardStyles from '@styles/ScoreCard.module.scss';

const cookies = new Cookies();

const ScoreBoardPage: React.FC = () => {
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
      <Card
        className={classes.leftPortionCard}
        style={{ width: '500px', height: data?.length === 5 ? 'auto' : '100%' }}
      >
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
        ) : data?.length !== 0 ? (
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
        ) : (
          <Typography className={classes.subTitle} style={{ padding: '20px' }}>
            No ScoreBoard data available for this user. Play some games to see
            your scoreboard.
            <br />
            <Button
              style={{ marginTop: '30px' }}
              onClick={() => router.push('/home/matches/')}
            >
              Matches Page
            </Button>
          </Typography>
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
        <div style={{ marginTop: '30px' }} />

        <Typography className={classes.subTitle} style={{ fontWeight: 'bold' }}>
          Profile Info
        </Typography>
      </div>
    </div>
  );
};

export default ScoreBoardPage;
