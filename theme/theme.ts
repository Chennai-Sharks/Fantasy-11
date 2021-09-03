import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// You can create modify this theme or add new theme in any component. That theme will
// override this default theme.
const theme = createTheme({
  palette: {
    primary: {
      main: '#fd3a4b',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#ffffff',
    },
    text: {
      secondary: '#ffffff',
    },
  },
});

export default theme;
