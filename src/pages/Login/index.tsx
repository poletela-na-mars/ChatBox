import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { generateUserPassword } from '../../utils/passwordGenerator';

import { LoginTextField } from './LoginTextField';
import { Button, Container, IconButton, InputAdornment, Typography } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

import styles from './Login.module.scss';
import { FormattedMessage } from 'react-intl';

const validationSchema = yup.object({
  password: yup
      .string().matches(/^(?=.*[A-ZЁА-Я].*[A-ZЁёА-Я])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-zёа-я].*[a-zёа-я].*[a-zёа-я]).{8,}$/,
          {message: 'Password should contain at least 2 letters in Upper and 3 letters in Lower Case, 1 special character (!@#$&*), 2 numerals (0-9))'})
      .required('Password is required'),
  name: yup
      .string()
      .min(2, 'Name is too short')
      .max(50, 'Name is too long')
      .required('Name is required'),
});

export const Login = (): JSX.Element => {
  const [copied, setCopied] = useState(false);
  const {touched, errors, isSubmitting, handleSubmit, handleChange, values, setFieldValue} = useFormik({
    initialValues: {
      password: '',
      name: '',
    },
    enableReinitialize: true,
    validateOnChange: true,
    validationSchema: validationSchema,
    onSubmit: (values: object) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const theme = useTheme();

  const generatePassword = (): void => {
    setFieldValue('password', generateUserPassword());
    setCopied(false);
  };

  const copyToClipboard = async (): Promise<void> => {
    await navigator.clipboard.writeText(values.password);
    setCopied(true);
  };

  return (
      <Container
          maxWidth='lg'
          sx={{
            marginTop: 6,
            height: 'calc(100vh - 50vh)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
      >
        <Typography component='h2' variant='h6' fontSize={18} align='center' className={styles.gradientText}>
          <FormattedMessage
              id = 'login'
              defaultMessage='Enter your name and password to login or register'
          />
        </Typography>
        <form onSubmit={handleSubmit} className={styles.rootForm}>
          <LoginTextField
              fullWidth
              inputProps={{maxLength: 50}}
              placeholder='John Bell'
              id='name'
              name='name'
              value={values.name}
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              sx={{margin: '32px 32px 32px 32px'}}
          />
          <LoginTextField
              fullWidth
              inputProps={{maxLength: 50}}
              placeholder='Your password'
              id='password'
              name='password'
              value={values.password}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{margin: '0 32px 74px 32px'}}
              InputProps={{
                endAdornment:
                    <InputAdornment position='end' sx={{marginRight: 1}}>
                      <IconButton
                          onClick={copyToClipboard}
                          sx={{color: `${copied ? theme.palette.secondary.dark : theme.palette.primary.light}`}}
                      >
                        <ContentCopyRoundedIcon />
                      </IconButton>
                      <IconButton
                          onClick={generatePassword}
                          edge='end'
                          sx={{color: theme.palette.primary.light}}
                      >
                        <AutorenewRoundedIcon />
                      </IconButton>
                    </InputAdornment>
              }}
          />
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
            >
              Login
            </Button>
          </Container>
        </form>
      </Container>
  );
};