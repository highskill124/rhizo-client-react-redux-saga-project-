import React, { FC, ReactNode } from 'react';
import { makeStyles, createTheme, MuiThemeProvider, withStyles } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import styled, { css } from 'styled-components';
import { ThemeColor } from '../../settings/ThemeColor';
import { FontWeight } from '../../settings/Font';

const useStyles = makeStyles((theme) => ({}));

interface IProps {
    className?: string;
    children: any;
    tooltip: string;
}

const UITooltip: FC<IProps> = ({ children, tooltip }) => {
    const classes = useStyles();
    const defaultTheme = createTheme();
    const theme = createTheme({
        overrides: {
            MuiTooltip: {
                tooltip: {
                    color: ThemeColor.secondDark,
                    fontSize: '12px',
                    boxShadow: '0px 14px 24px rgba(122, 137, 148, 0.2)',
                    padding: '10px',
                    backgroundColor: ThemeColor.white,
                    fontWeight: FontWeight.regular,
                },
                arrow: {
                    '&::before': {
                        backgroundColor: ThemeColor.white,
                    },
                },
            },
        },
    });

    return (
        <MuiThemeProvider theme={defaultTheme}>
            <MuiThemeProvider theme={theme}>
                <Tooltip title={tooltip} arrow>
                    {children}
                </Tooltip>
            </MuiThemeProvider>
        </MuiThemeProvider>
    );
};

UITooltip.defaultProps = {};

export default UITooltip;
