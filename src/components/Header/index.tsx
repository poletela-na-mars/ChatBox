import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import Brightness4RoundedIcon from '@mui/icons-material/Brightness4Rounded';
import { useTheme } from '@mui/material/styles';

type HeaderProps = {
  modeSwitch: () => void;
};

export const Header = ({modeSwitch}: HeaderProps): JSX.Element => {
  const theme = useTheme();

  return (
      <Box sx={{flexGrow: 1, textAlign: 'center'}}>
        <AppBar position='static' color='transparent' elevation={0} sx={{height: '80px'}}>
          <Toolbar>
            <Typography color={theme.palette.primary.light} variant='h6' component='h1' sx={{flexGrow: 1, marginLeft: 10}}>
              ChatBox
            </Typography>
            <IconButton size='large' sx={{color: theme.palette.primary.light, mr: 2}} aria-label='change language'>
              <LanguageRoundedIcon />
            </IconButton>
            <IconButton size='large' sx={{color: theme.palette.primary.light}} onClick={() => modeSwitch()} aria-label='change theme'>
              <Brightness4RoundedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
  )
};