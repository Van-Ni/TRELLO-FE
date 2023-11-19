import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
//https://mui.com/material-ui/customization/theming/
//https://mui.com/material-ui/customization/default-theme/
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: "#333"
    }
  },
});

export default theme;