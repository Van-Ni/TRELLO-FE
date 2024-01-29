import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfirmProvider } from 'material-ui-confirm';

ReactDOM.createRoot(document.getElementById('root')!).render(
  ////React.StrictMode
  <>
    <ToastContainer position="bottom-right" />
    <CssVarsProvider theme={theme}>
      {/* # https://dev.to/akshaysrepo/building-a-confirmation-dialog-component-with-react-and-material-ui-4468 */}
      <ConfirmProvider
        // Globally
        defaultOptions={{
          allowClose: false, // escape or backdrop click
          cancellationText: "Cancel",
          confirmationText: "Confirm",
          dialogProps: {
            maxWidth: "sm"
          },
          confirmationButtonProps: {
            color: "error", variant: "outlined",
          },
          cancellationButtonProps: {
            color: "primary",
          },
          confirmationKeywordTextFieldProps: {
            sx: {
              "& .MuiInputBase-input": {
                color: "primary.dark",
              }
            }
          },
          buttonOrder: ["cancel", "confirm"]
        }}>
        <CssBaseline />
        <App />
      </ConfirmProvider>
    </CssVarsProvider >
  </>,
)
