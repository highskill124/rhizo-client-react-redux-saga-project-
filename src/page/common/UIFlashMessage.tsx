import React, { FC, ReactNode, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import infoFill from '@iconify/icons-eva/info-fill';
import alertCircleFill from '@iconify/icons-eva/alert-circle-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
import { useSelector, useDispatch } from 'react-redux';
import closeFill from '@iconify/icons-eva/close-fill';
import * as polished from 'polished';

import { IconButton, createStyles, makeStyles, Box } from '@material-ui/core';
import styled from 'styled-components';
import { closeFlashMessage, updateFlashMessageStatus } from '../../store/state/PageState';
import { RootState } from '../../store/state/RootReducer';
import { Color } from '../../settings/Color';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
    const isLight = true;

    const createVariantStyle = (v) => {
        return {
            color: `${Color[v]} !important`,
            backgroundColor: `${polished.lighten(0.35, Color[v])} !important`,
            border: `1px solid ${polished.lighten(0.34, Color[v])} !important`,
            // boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important',
            boxShadow: `${polished.lighten(0.35, Color[v])} 0px 7px 29px 0px !important`,
        };
    };

    return createStyles({
        containerRoot: {
            pointerEvents: 'unset',
        },
        contentRoot: {
            width: '100%',
            padding: theme.spacing(1.5),
            margin: theme.spacing(0.25, 0),
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
            borderRadius: theme.shape.borderRadius,
            color: theme.palette.grey[isLight ? 0 : 800],
            backgroundColor: theme.palette.grey[isLight ? 900 : 0],
        },
        message: {
            padding: 0,
            fontWeight: 400,
        },
        action: {
            marginRight: -4,
            '& svg': {
                width: 20,
                height: 20,
                opacity: 0.48,
                '&:hover': { opacity: 1 },
            },
        },
        info: createVariantStyle('info'),
        success: createVariantStyle('success'),
        warning: createVariantStyle('warning'),
        error: createVariantStyle('error'),
    });
});

// ----------------------------------------------------------------------

interface ISnackbarIconProps {
    icon: any;
    color: string;
}

const SnackbarIcon: FC<ISnackbarIconProps> = ({ icon, color }) => {
    return (
        <Box
            component="span"
            sx={{
                mr: 1.5,
                width: 40,
                height: 40,
                display: 'flex',
                borderRadius: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                color: `${color}.main`,
                // bgcolor: polished.lighten(0.35, Color[color]),
                bgcolor: polished.lighten(0.4, Color[color]),
            }}
        >
            <Icon icon={icon} color={Color[color]} width={24} height={24} />
        </Box>
    );
};

interface IProps {
    children: ReactNode;
}

export const UIFlashMessageProvider: FC<IProps> = ({ children }) => {
    const classes: any = useStyles();

    return (
        <SnackbarProvider
            dense
            maxSnack={5}
            // preventDuplicate
            autoHideDuration={3000}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            iconVariant={{
                success: <SnackbarIcon icon={checkmarkCircle2Fill} color="success" />,
                error: <SnackbarIcon icon={infoFill} color="error" />,
                warning: <SnackbarIcon icon={alertTriangleFill} color="warning" />,
                info: <SnackbarIcon icon={alertCircleFill} color="info" />,
            }}
            classes={{
                containerRoot: classes.containerRoot,
                // contentRoot: classes.contentRoot,
                variantInfo: classes.info,
                variantSuccess: classes.success,
                variantWarning: classes.warning,
                variantError: classes.error,
            }}
        >
            {children}
        </SnackbarProvider>
    );
};

const UIFlashMessage = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const notes = useSelector<RootState, Array<any>>((state) => state.pageState.flashMessageList.filter((x) => x.status === 1));
    const dispatch = useDispatch();

    useEffect(() => {
        if (notes && notes.length) {
            notes.map((x, i) => {
                const { id, message, severity } = x;
                dispatch(updateFlashMessageStatus({ id, status: 2 }));

                return setTimeout(() => {
                    enqueueSnackbar(message, {
                        variant: severity,
                        onClose: () => {
                            dispatch(closeFlashMessage({ id }));
                        },
                        action: (key) => (
                            <IconButton size="small" onClick={() => closeSnackbar(key)}>
                                <Icon icon={closeFill} color={polished.darken(0.2, Color.danger)} />
                            </IconButton>
                        ),
                    });
                }, 300 * i);
            });
        }
    }, [closeSnackbar, dispatch, enqueueSnackbar, notes]);

    return <></>;
};

export default React.memo(UIFlashMessage);
