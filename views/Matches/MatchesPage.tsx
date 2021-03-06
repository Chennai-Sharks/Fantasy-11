import React from 'react';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import axios from 'axios';
import { useQuery } from 'react-query';
import Cookies from 'universal-cookie';
import { motion } from 'framer-motion';
import { MoonLoader } from 'react-spinners';
import { AppBar, Button, Card, Toolbar, Typography } from '@material-ui/core';

import MatchCard from './components/MatchCard';
import versusMatchStore from '@stores/VersusMatchStore';
import LogoutButton from '@common/LogoutButton/LogoutButton';
import ScoreBoardButton from '@common/ScoreBoardButton/ScoreBoardButton';

import classes from '@styles/Match.module.scss';

interface MatchesPageProps {}

const cookies = new Cookies();

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const MatchesPage: React.FC<MatchesPageProps> = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (typeof cookies.get('authSession') === 'undefined') {
      router.replace('/');
    }
  }, [router]);

  const { isLoading, isError, data, refetch } = useQuery(
    'matches',
    async () => {
      const { data } = await axios.get(`/api/match`, {
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

  const matchStore = versusMatchStore((state) => state);

  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit={{ opacity: 0 }}
      className={classes.background}
    >
      <Head>
        <title>Fantasy 11 | Matches</title>
        <link rel='icon' href='/logo.png' />
      </Head>
      <Card raised className={classes.leftPortionCard}>
        <AppBar position='static' style={{ backgroundColor: '#fd3a4b' }}>
          <Toolbar
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant='h6'
              align='center'
              style={{
                fontWeight: 'bold',
              }}
            >
              Welcome to Fantasy 11 League
            </Typography>
            <ScoreBoardButton />
            <LogoutButton />
          </Toolbar>
        </AppBar>
        <Typography className={classes.title}>Available Matches</Typography>

        {isLoading ? (
          <MoonLoader />
        ) : isError ? (
          <Typography className={classes.subTitle}>
            You are not authenticated or the Server is busy right Now.
            <br />
            <Button onClick={() => refetch()}>Try Again</Button>
          </Typography>
        ) : (
          (
            data.teamInfo as Array<{
              match: string;
              teams: string[];
            }>
          ).map((eachMatchInfo, index) => {
            return (
              <motion.div
                style={{ width: '100%' }}
                key={index}
                variants={stagger}
              >
                <MatchCard
                  key={index}
                  onTap={() => {
                    matchStore.setoneTeam(eachMatchInfo['teams'][0]);
                    matchStore.setTwoTeam(eachMatchInfo['teams'][1]);
                    router.push(
                      `matches/create-team/${eachMatchInfo['match'].substring(
                        0,
                        6
                      )}`
                    );
                  }}
                  one={eachMatchInfo['teams'][0]}
                  two={eachMatchInfo['teams'][1]}
                />
              </motion.div>
            );
          })
        )}
      </Card>
      <motion.div variants={stagger} className={classes.rightPortion}>
        <div className={classes.logo} />
        <Image
          src='/logo.png'
          alt='Logo of fantasy-11'
          width={100}
          height={100}
          className={classes.logo}
        />
        <Typography className={classes.title}>Fantasy 11</Typography>
        <Typography className={classes.subTitle}>
          Make sure you make the right choices
        </Typography>
      </motion.div>
    </motion.div>
  );
};
export default MatchesPage;
