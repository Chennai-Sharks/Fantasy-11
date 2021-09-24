import { Button, Card, Snackbar, Typography } from '@material-ui/core';
import axios from 'axios';
import React from 'react';

import classes from '../Match/MatchCard.module.scss';

interface MatchCardProps {
  playername: string;
  points: string;
}

const GameCard: React.FC<MatchCardProps> = (props) => {
  return (
    <React.Fragment>
      <Card raised className={classes.MatchCard}>
        <Typography className={classes.subTitle}>{props.playername}</Typography>
        <Typography className={classes.subTitle}>{props.points}</Typography>
      </Card>
    </React.Fragment>
  );
};

export default GameCard;
