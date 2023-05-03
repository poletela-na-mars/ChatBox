import { useState } from 'react';
import { useFormik } from 'formik';
import { generateUserPassword } from '../../utils/passwordGenerator';
import { validationSchema } from './validationSchema';

import { LoginTextField } from './LoginTextField';
import { Button, Container, IconButton, InputAdornment, Typography } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';

import { useTheme } from '@mui/material/styles';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

import styles from './Login.module.scss';

export const Login = (): JSX.Element => {
  const [copied, setCopied] = useState(false);
  const intl = useIntl();

  const {touched, errors, isSubmitting, handleSubmit, handleChange, values, setFieldValue} = useFormik({
    initialValues: {
      password: '',
      name: '',
    },
    enableReinitialize: true,
    validateOnChange: true,
    validationSchema: validationSchema(intl),
    onSubmit: (values: object) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const theme = useTheme();

  const setGeneratedPasswordInField = (): void => {
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
          <FormattedMessage id='login.main' />
        </Typography>
        <form onSubmit={handleSubmit} className={styles.rootForm}>
          <LoginTextField
              fullWidth
              inputProps={{maxLength: 50}}
              placeholder={intl.formatMessage({id: 'login.placeholder.name'})}
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
              placeholder={intl.formatMessage({id: 'login.placeholder.password'})}
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
                          onClick={setGeneratedPasswordInField}
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
                  paddingRight: '20px',
                  paddingLeft: '20px',
                }}
                variant='contained'
                size='medium'
                type='submit'
                disabled={isSubmitting}
            >
              <FormattedMessage id='login.button.register' />
            </Button>
            <Button
                style={{
                  backgroundColor: theme.palette.primary.light,
                  textTransform: 'none',
                  paddingRight: '20px',
                  paddingLeft: '20px',
                }}
                variant='contained'
                size='medium'
                type='submit'
                disabled={isSubmitting}
            >
              <FormattedMessage id='login.button.login' />
            </Button>
          </Container>
        </form>
      </Container>
  );
};