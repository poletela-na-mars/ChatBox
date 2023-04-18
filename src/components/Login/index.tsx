import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTheme } from '@mui/material/styles';

import styles from './Login.module.scss';

const validationSchema = yup.object({
  userId: yup
      .string()
      .required('User ID is required'),
  name: yup
      .string()
      .required('Name is required'),
});

// TODO - add run-time validation
//      - TextField as const
//      - remove labels
//      - add icon
//      - error in fields

export const Login = (): JSX.Element => {
  const formik = useFormik({
    initialValues: {
      userId: '',
      name: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: object) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const theme = useTheme();

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
          <TextField
              fullWidth
              hiddenLabel
              size='medium'
              type='text'
              placeholder='John Bell'
              id='name'
              name='name'
              // label='Name'
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={(theme) => ({
                borderRadius: theme.shape.borderRadius,
                margin: '32px 32px 32px 32px',
                backgroundColor: 'white',
                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 4px 12px -20px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
                '& fieldset': {border: 'none'},
              })}
          />
          <TextField
              fullWidth
              hiddenLabel
              size='medium'
              type='text'
              placeholder='156Ihjk555...'
              id='userId'
              name='userId'
              // label='User ID'
              value={formik.values.userId}
              onChange={formik.handleChange}
              error={formik.touched.userId && Boolean(formik.errors.userId)}
              helperText={formik.touched.userId && formik.errors.userId}
              sx={(theme) => ({
                borderRadius: theme.shape.borderRadius,
                margin: '0 32px 32px 32px',
                backgroundColor: 'white',
                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 4px 12px -20px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
                '& fieldset': {border: 'none'},
              })}
          />
          <Box className={styles.buttonGroup}>
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
          </Box>
        </form>
      </Container>
  );
};