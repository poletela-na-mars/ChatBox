import styles from './NotFound.module.scss';
import { Typography } from '@mui/material';

export const NotFound = (): JSX.Element => {
  return (
      <div className={styles.root}>
        <img src='/not-found.png' alt='Not found page' />
        <Typography className={styles.gradientText} component='h1' variant='h6' fontSize={24} align='center'>
          404<br />
          Page not found
        </Typography>
      </div>
  );
};