import { PaletteMode } from '@mui/material';

export const theme = {
    typography: {
        fontFamily: [
            'Roboto',
            'sans-serif',
        ].join(','),
        //variants
        h6: {
            fontWeight: 'bold',
            fontSize: '22px',
        },
        button: {
          fontWeight: 'bold',
        },
    },
    shape: {
        borderRadius: 50,
    },
};

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: {
                    light: '#0033FF',
                    main: '#FFF',
                    dark: '#000033',
                },
                secondary: {
                    light: '#F5F5F5',
                    main: '#999999',
                    dark: '#C582E5',
                },
                // divider: amber[200],
                text: {
                    // primary: '#999999',

                },
            }
            : {
                // palette values for dark mode
                primary: {
                    light: '#0033FF',
                    main: '#000066',
                    dark: '#F5F5F5',
                },
                secondary: {
                    light: '#000033',
                    main: '#C582E5',
                    dark: '#C582E5',
                },
                // divider: deepOrange[700],
                // background: {
                //     default: deepOrange[900],
                //     paper: deepOrange[900],
                // },
                text: {
                    // primary: '#fff',
                    primary: '#FFF',
                    // secondary: grey[500],
                },
            }),
    },
});
