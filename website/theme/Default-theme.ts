import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// You can create modify this theme or add new theme in any component. That theme will
// override this default theme.
const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#556cd6',
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
	},
});

export default theme;
