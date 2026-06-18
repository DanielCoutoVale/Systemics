import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#5b3cc4',
      },
      secondary: {
        main: '#f59e0b',
      },
      background: {
        default: '#f5f3ff',
        paper: '#ffffff',
      },
    },
    typography: {
      fontFamily: ['Inter', 'Roboto', 'Arial', 'sans-serif'].join(','),
      h4: {
        fontWeight: 700,
      },
      button: {
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: '#f5f3ff',
            minHeight: '100vh',
          },
        },
      },
    },
  }),
)

export default theme
