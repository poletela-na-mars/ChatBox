import { useFormik } from 'formik';
// import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { generateUserPassword } from '../../utils/passwordGenerator';

import { Button, Container, IconButton, InputAdornment, styled, TextField, Typography } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

import styles from './Login.module.scss';
import { useState } from 'react';

const validationSchema = yup.object({
  password: yup
      .string().matches(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/,
          {message: 'Password should contain at least 2 letters in Upper and 3 letters in Lower Case, 1 special character (!@#$&*), 2 numerals (0-9))'})
      .required('Password is required'),
  name: yup
      .string()
      .min(2, 'Name is too short')
      .max(50, 'Name is too long')
      .required('Name is required'),
});

const LoginTextField = styled(TextField)(({theme}) => ({
  hiddenLabel: true,
  size: 'medium',
  type: 'text',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
  textColor: theme.palette.text.primary,
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
      password: '',
      name: '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values: object) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const theme = useTheme();

  const generatePassword = (): void => {
    formik.setFieldValue('password', generateUserPassword());
    setCopied(false);
  };

  const copyToClipboard = async (): Promise<void> => {
    await navigator.clipboard.writeText(formik.values.password);
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
          Enter your name and password to login or register
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
              placeholder='Your password'
              id='password'
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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