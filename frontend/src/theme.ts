import { createTheme } from '@mui/material/styles'

const theme = createTheme({
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
    fontSize: 12,
    allVariants: {
      fontSize: 12,
    },
    button: {
      textTransform: 'none',
      fontSize: 12,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: '12px',
        },
        body: {
          backgroundColor: '#f5f3ff',
          minHeight: '100vh',
          fontSize: '12px',
        },
        '*': {
          fontSize: '12px',
        },
      },
    },
  },
})

export default theme
