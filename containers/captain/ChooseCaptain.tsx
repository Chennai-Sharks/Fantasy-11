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
  // const [inc, setinc] = React.useState(0);
  // console.log(props);
  // console.log(inc);

  return (
    <Card className={classes.PlayerCard}>
      <Typography className={classes.subTitle}>{props.playername}</Typography>
      <Typography className={classes.subTitle} style={{ marginLeft: '36%' }}>
        {props.credits}
      </Typography>
      <IconButton
        style={{ marginRight: '20px' }}
        onClick={() => {
          // console.log(inc);
          // if (inc === 12) return;
          if (isplus) {
            props.isplusFunction();
            // setinc((previnc) => previnc + 1);
          } else {
            props.isnotplusFunction();
            // setinc((previnc) => previnc - 1);
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
