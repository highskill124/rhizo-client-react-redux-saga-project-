import React, { FC, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import { closeFlashMessage } from '../../store/state/PageState';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface IProps {
    className?: string;
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
}
const UISnackbar: FC<IProps> = ({ open, message, severity }) => {
    const [show, setShow] = React.useState(open);

    const dispatch = useDispatch();

    useEffect(() => {
        setShow(open);
    }, [open]);

    const handleClose = (event, reason) => {
        // if (reason === 'clickaway') {
        //     return;
        // }

        dispatch(closeFlashMessage([]));
        setShow(false);
    };
    return (
        <Snackbar open={show} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default UISnackbar;
