import React from 'react';
import { Card, Typography } from '@material-ui/core';
import { motion, Variants } from 'framer-motion';

import classes from './MatchCard.module.scss';

interface MatchCardProps {
  one: string;
  two: string;
  onTap: () => void;
}

const fadeInUp: Variants = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const MatchCard: React.FC<MatchCardProps> = (props) => {
  return (
    <React.Fragment>
      <motion.div
        style={{
          width: '100%',

          display: 'flex',
          justifyContent: 'center',
        }}
        whileHover={{ scale: 1.03 }}
        variants={fadeInUp}
        whileTap={{ scale: 0.95 }}
      >
        <Card raised className={classes.MatchCard} onClick={props.onTap}>
          <Typography className={classes.subTitle}>{props.one}</Typography>
          <Typography className={classes.subTitle}>Vs</Typography>
          <Typography className={classes.subTitle}>{props.two}</Typography>
        </Card>
      </motion.div>
    </React.Fragment>
  );
};

export default MatchCard;
