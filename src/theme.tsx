import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// #Trello1
// A custom theme for this app
//https://mui.com/material-ui/customization/theming/
//https://mui.com/material-ui/customization/default-theme/

// #Trello : Theme style overrides
// https://mui.com/material-ui/customization/theme-components/#theme-style-overrides
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#2E3641', //#2E3641 #08479E
          light: "#fff",
        },
        secondary: {
          main: "#3A4452", //#3A4452 #0B55BA
          light: "#161D25" //#161D25 #1A80D9
        },
        success: {
          main: "#579dff",
          light: "#70a5efe0"
        },
        grey: {
          500: "#ffffff33"
        }
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
  components: {

    // #Trello : customize scrollbars to all project
    // https://mui.com/material-ui/react-css-baseline/#scrollbars
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          overflow: 'hidden',
          '*::-webkit-scrollbar': {
            height: '4px',
            width: '6px'
          },
          '*::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px'
          },
          '*::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            background: '#555'
          }
        }
      }),
    },

    // Name of the component
    MuiButton: {
      styleOverrides: { //{ ownerState, theme }
        // Name of the slot
        root: ({ theme }) => ({
          // Some CSS
          '&:hover': {
            backgroundColor: '#a6c5e229',
          },
          '&.btn-add': {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.success.light,
              color: theme.palette.primary.light,
            }
          },
          // color: theme.palette.primary.light,
          textTransform: 'capitalize',
        }),
        endIcon: {
          marginLeft: "2px"
        }
      },
    },
    MuiButtonBase: {
      styleOverrides: { //{ ownerState, theme }
        // Name of the slot
        root: ({ theme }) => ({
          '& .css-1shb70a-MuiButtonBase-root-MuiButton-root:hover': {
            color: "#333"
          }
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            color: theme.palette.primary.light,
            fontSize: "14px",
            // #Trello : How to remove the border of the Material UI Select component?
            // https://stackoverflow.com/questions/69860132/how-to-remove-the-border-of-the-material-ui-select-component
            '& .MuiOutlinedInput-notchedOutline': {
              // border: '0'
            },
            '&:hover': {
              '.MuiOutlinedInput-notchedOutline': {
                // borderColor: theme.palette.primary.light
              },
            }
          };
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ }) => ({
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.4)'
          },
        }),
        input: ({ theme }) => ({
          outline: "none",
        })
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: "#fff",
          "&.Mui-focused": {
            color: theme.palette.primary.light
          }
        })
      }
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&:hover': {
            backgroundColor: '#a6c5e229',
          }
        })
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: ({ }) => ({
          cursor: "pointer"
        }),

      }
    },
  },
});

export default theme;