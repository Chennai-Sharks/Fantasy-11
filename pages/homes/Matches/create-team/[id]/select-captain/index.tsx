import {
  AppBar,
  Button,
  Card,
  Fab,
  Toolbar,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useRouter } from 'next/router';
import idStore from '@stores/idStore';
import captainStore from '@stores/CaptainStore';
import versusMatchStore from '@stores/VersusMatchStore';
import Image from 'next/image';
import Head from 'next/head';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

import { useQuery } from 'react-query';
import { MoonLoader } from 'react-spinners';
import classes from '@styles/CreateTeam.module.scss';
import selectedPlayersStore from '@stores/SelectedPlayersStore';
import LogoutButton from '@containers/Logout/LogoutButton';
import HomeButton from '@containers/HomeButton/HomeButton';

const SelectCaptainScreen: React.FC = () => {
  const matchStore = versusMatchStore((state) => state);
  const selectedplayers = selectedPlayersStore((state) => state);
  const captain = captainStore((state) => state);

  const router = useRouter();
  const idstore = idStore((state) => state);

  const myRedirectFunction = function () {
    if (typeof window !== 'undefined') {
      router.push({
        pathname: 'select-captain/game',
        query: { id: idstore.id },
      });
    }
  };

  React.useEffect(() => {
    captain.setcaptain('-');
    captain.setvicecaptain('-');
    if (typeof cookies.get('authSession') === 'undefined') {
      router.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { isLoading, isError, data, refetch } = useQuery(
    'preMatchInfo',
    async () => {
      const { data } = await axios.get(
        `/api/match/preMatchInfo/${idstore.id}.json`,
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
        <title>Fantasy 11 | Select Captain</title>
        <link rel='icon' href='/logo.png' />
      </Head>
      <Card raised className={classes.leftPortionCard}>
        <AppBar
          position='static'
          style={{
            backgroundColor: '#FD3A4A',
            height: '20%',
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
              Select Captain and Vice Captain
            </Typography>
            <div>
              <HomeButton />
              <LogoutButton />
            </div>
          </Toolbar>
          <Typography variant='h6' style={{ textAlign: 'center' }}>
            {matchStore.oneTeam} vs {matchStore.twoTeam}
          </Typography>
        </AppBar>
        {selectedplayers.selectedPlayers.map((eachselectedplayer, index) => {
          return (
            <div className={classes.PlayerCard} key={index}>
              <Typography align='center' className={classes.subTitle}>
                {eachselectedplayer}
              </Typography>
              <div>
                <Button
                  className={classes.Button}
                  onClick={() => {
                    if (
                      captain.captain === eachselectedplayer ||
                      captain.vicecaptain === eachselectedplayer
                    )
                      return;
                    captain.setcaptain(eachselectedplayer);
                  }}
                >
                  Captain
                </Button>

                <Button
                  className={classes.Button}
                  onClick={() => {
                    if (
                      captain.captain === eachselectedplayer ||
                      captain.vicecaptain === eachselectedplayer
                    )
                      return;
                    captain.setvicecaptain(eachselectedplayer);
                  }}
                >
                  Vice Captain
                </Button>
              </div>
            </div>
          );
        })}
      </Card>
      <div className={classes.rightPortion}>
        <div className={classes.logo} />
        <Image
          src='/logo.png'
          alt='Logo of fantasy-11'
          width={80}
          height={80}
        />
        <Typography className={classes.title}>
          Captain and Vice Captain
        </Typography>
        <Typography className={classes.subTitle}>
          Captain: {captain.captain}
        </Typography>

        <Typography className={classes.subTitle}>
          Vice Captain: {captain.vicecaptain}
        </Typography>
        <Fab
          variant='extended'
          size='small'
          style={{
            marginTop: '10px',
            backgroundColor: '#fd3a4b',
          }}
          color='primary'
          aria-label='add'
          onClick={() => {
            if (captain.captain === '' || captain.vicecaptain === '') return;
            // do something then..
            myRedirectFunction();
          }}
        >
          Continue
        </Fab>

        {isLoading ? (
          <MoonLoader />
        ) : isError ? (
          <Typography
            style={{ marginTop: '10px' }}
            className={classes.subTitle}
          >
            Server is not Available.
            <br />
            <Button onClick={() => refetch()}>Try Again</Button>
          </Typography>
        ) : (
          <div style={{ marginTop: '10px' }}>
            <Typography className={classes.title} align='center'>
              {'    '}
              Pre Match Information
            </Typography>
            <Typography className={classes.subTitle}>
              City: {`${data.matchInfo[0].city ?? '-'}`}
            </Typography>
            <Typography className={classes.subTitle}>
              Competition: {`${data.matchInfo[0].competition ?? '-'}`}
            </Typography>
            <Typography className={classes.subTitle}>
              Toss Decision: {`${data.matchInfo[0].tossDecision ?? '-'}`}
            </Typography>
            <Typography className={classes.subTitle}>
              Toss Winning Team: {`${data.matchInfo[0].tossWinningTeam ?? '-'}`}
            </Typography>
            <Typography className={classes.subTitle}>
              Venue: {`${data.matchInfo[0].venue ?? '-'}`}
            </Typography>
            <Typography className={classes.subTitle}>
              Umpires: {`${data.matchInfo[0].umpires[0] ?? '-'}`},{' '}
              {`${data.matchInfo[0].umpires[1] ?? '-'}`}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectCaptainScreen;
