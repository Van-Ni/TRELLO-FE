import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// #Trello1
// A custom theme for this app
//https://mui.com/material-ui/customization/theming/
//https://mui.com/material-ui/customization/default-theme/

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#C4E0E5',
        },
      },
      // (Bootstrap strategy)
    },
    dark: {
      palette: {
        // primary: {
        //   main: '#000',
        // },
      },
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
});

export default theme;