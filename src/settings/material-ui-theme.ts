import { red } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

const theme = (createTheme as any)({
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
    // overrides: {
    //     MuiCssBaseline: {
    //         '@global': {
    //             '@font-face': 'Avenir',
    //         },
    //     },
    // },
    palette: {
        type: 'light',
        text: {
            primary: '#686868',
            secondary: '#A4A4A4',
        },
        primary: {
            main: '#5EC69D',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#ff0000',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },

    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: '#5EC69D',
            },
        },
        MuiPickersCalendarHeader: {
            root: {
                // backgroundColor: lightBlue.A200,
                // color: "white",
            },
        },
        MuiPickersDay: {
            day: {
                color: '#495057',
                // border: '1px solid #e9ecef',
                // borderRadius: 0,
                fontSize: 12,
            },
            current: {
                color: '#5EC69D',
            },
            daySelected: {
                color: '#ffffff',
                backgroundColor: '#5EC69D',
                '&:hover': {
                    color: '#ffffff',
                    backgroundColor: '#5EC69D',
                },
            },
        },
        MuiDialogActions: {},
    },
});

export default theme;
