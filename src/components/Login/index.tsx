import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

import { Button, Container, IconButton, InputAdornment, styled, TextField, Typography } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

import styles from './Login.module.scss';
import { useState } from 'react';

const validationSchema = yup.object({
  userId: yup
      .string().matches(/^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i,
          {message: 'User ID isn\'t correct'})
      .required('User ID is required'),
  name: yup
      .string()
      .min(2, 'Incorrect Name')
      .max(50, 'Incorrect Name')
      .required('Name is required'),
});

const LoginTextField = styled(TextField)(({theme}) => ({
  hiddenLabel: true,
  size: 'medium',
  type: 'text',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  boxShadow: 'rgba(50, 50, 93, 0.25) 0px 4px 12px -20px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
  '& fieldset': {border: 'none'},
  '& .MuiFormHelperText-root.Mui-error': {
    position: 'absolute',
    top: '100%',
  },
}));

export const Login = (): JSX.Element => {
  const [copied, setCopied] = useState(false);
  const formik = useFormik({
    initialValues: {
      userId: '',
      name: '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values: object) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const theme = useTheme();

  const generateUserId = (): void => {
    formik.setFieldValue('userId', uuidv4());
    setCopied(false);
  };

  const copyToClipboard = async (): Promise<void> => {
    await navigator.clipboard.writeText(formik.values.userId);
    setCopied(true);
  };

  return (
      <Container
          maxWidth='lg'
          sx={{
            marginTop: 4,
            height: 'calc(100vh - 50vh)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
      >
        <Typography component='h2' variant='h6' fontSize={18} align='center' className={styles.gradientText}>
          Enter your name and ID to login or register
        </Typography>
        <form onSubmit={formik.handleSubmit} className={styles.rootForm}>
          <LoginTextField
              fullWidth
              inputProps={{maxLength: 50}}
              placeholder='John Bell'
              id='name'
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{margin: '32px 32px 32px 32px'}}
          />
          <LoginTextField
              fullWidth
              inputProps={{maxLength: 50}}
              placeholder='156Ihjk555...'
              id='userId'
              name='userId'
              value={formik.values.userId}
              onChange={formik.handleChange}
              error={formik.touched.userId && Boolean(formik.errors.userId)}
              helperText={formik.touched.userId && formik.errors.userId}
              sx={{margin: '0 32px 16px 32px'}}
              InputProps={{
                endAdornment:
                    <InputAdornment position='end' sx={{marginRight: 1}}>
                      <IconButton
                          onClick={copyToClipboard}
                          sx={{color: `${copied ? theme.palette.secondary.dark : theme.palette.primary.main}`}}
                      >
                        <ContentCopyRoundedIcon />
                      </IconButton>
                      <IconButton
                          onClick={generateUserId}
                          edge='end'
                          color='primary'
                      >
                        <AutorenewRoundedIcon />
                      </IconButton>
                    </InputAdornment>
              }}
          />
          <Typography color={theme.palette.secondary.main} sx={{marginBottom: 2}}>
            Save your ID to login next times
          </Typography>
          <Container
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexWrap: 'no-wrap',
                width: '100%',
                padding: 0,
              }}
          >
            <Button
                style={{
                  backgroundColor: theme.palette.secondary.main,
                  marginRight: '32px',
                  textTransform: 'none',
                  width: '120px'
                }}
                variant='contained'
                size='medium'
                type='submit'
            >
              Register
            </Button>
            <Button
                style={{
                  backgroundColor: theme.palette.primary.light,
                  textTransform: 'none',
                  width: '100px'
                }}
                variant='contained'
                size='medium'
                type='submit'
            >
              Login
            </Button>
          </Container>
        </form>
      </Container>
  );
};