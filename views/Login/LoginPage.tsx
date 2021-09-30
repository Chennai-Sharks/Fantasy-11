import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import Cookies from 'universal-cookie';
import { Card, Typography } from '@material-ui/core';

import LoginForm from './components/LoginForm';

import styles from '@styles/Home.module.scss';
import classes from '@styles/Login.module.scss';

const cookies = new Cookies();

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (typeof cookies.get('authSession') !== 'undefined') {
      router.replace('/home/matches');
    }
  }, [router]);

  return (
    <React.Fragment>
      <Head>
        <title>Fantasy 11 | Login</title>
      </Head>
      <div className={classes.background}>
        <Card
          className={classes.Card}
          variant='elevation'
          raised
          style={{
            borderRadius: '20px',
          }}
        >
          <div className={classes.leftPortionCard}>
            <Typography
              className={styles.title}
              style={{
                color: 'white',
              }}
            >
              Login
            </Typography>
          </div>
          <div className={classes.rightPortionCard}>
            <LoginForm />
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
};
export default LoginPage;
