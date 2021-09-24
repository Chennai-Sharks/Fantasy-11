import { Card, IconButton, Typography } from '@material-ui/core';
import React from 'react';

import classes from './EachPlayer.module.scss';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

interface EachPlayerProps {
  playername: string;
  credits: string;
  isplusFunction: () => void;
  isnotplusFunction: () => void;
}

const EachPlayer: React.FC<EachPlayerProps> = (props) => {
  const [isplus, setisplus] = React.useState(true);

  return (
    <Card className={classes.PlayerCard}>
      <Typography className={classes.subTitle}>{props.playername}</Typography>
      <Typography className={classes.subTitle} style={{ marginLeft: '36%' }}>
        {props.credits}
      </Typography>
      <IconButton
        style={{ marginRight: '20px' }}
        onClick={() => {
          if (isplus) {
            props.isplusFunction();
          } else {
            props.isnotplusFunction();
          }
          setisplus(!isplus);
        }}
      >
        {isplus ? (
          <AddIcon style={{ color: '#07003b' }} />
        ) : (
          <RemoveIcon style={{ color: '#07003b' }} />
        )}
      </IconButton>
    </Card>
  );
};

export default EachPlayer;
