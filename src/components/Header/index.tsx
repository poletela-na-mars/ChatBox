import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import Brightness4RoundedIcon from '@mui/icons-material/Brightness4Rounded';
import { useTheme } from '@mui/material/styles';

export const Header = (): JSX.Element => {
  const theme = useTheme();

  return (
      <Box sx={{flexGrow: 1, textAlign: 'center'}}>
        <AppBar position='static' color='transparent' elevation={0} sx={{height: '80px'}}>
          <Toolbar>
            <Typography color={theme.palette.primary.light} variant='h6' component='h1' sx={{flexGrow: 1}}>
              ChatBox
            </Typography>
            <IconButton size='large' color='primary' aria-label='change language' sx={{mr: 2}}>
              <LanguageRoundedIcon />
            </IconButton>
            <IconButton size='large' color='primary' aria-label='change theme'>
              <Brightness4RoundedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
  )
};