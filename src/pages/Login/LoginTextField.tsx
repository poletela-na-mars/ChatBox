import { styled, TextField } from '@mui/material';

export const LoginTextField = styled(TextField)(({theme}) => ({
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