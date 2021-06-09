import { createMuiTheme } from '@material-ui/core/styles';

// app theme
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#ffffff',
      main: '#f5f5f5',
      dark: '#c2c2c2',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffc4ff',
      main: '#ce93d8',
      dark: '#9c64a6',
      contrastText: '#000',
    },
    warning: {
      main: '#b40000'
    }
  },
  typography: {
    fontFamily: [
      'Open Sans',
      'sans-serif',
      "Segoe UI",
    ].join(','),
    fontSize: 14,
  },
});

export default theme