import React, { FC, ReactNode } from 'react';
import { Pagination } from '@mui/material';
import styled, { css } from 'styled-components';
import { makeStyles } from '@material-ui/core';
import { FontSize, FontWeight, LineHeight, LetterSpacing } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import UISpacer from './UISpacer';
import SessionRatings from './NewUIRating';

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
        '& .MuiPaginationItem-icon': {
            backgroundColor: `${ThemeColor.second}`,
            borderRadius: '50%',
        },
        '& svg': {
            fill: `${ThemeColor.secondDark}`,
        },
        '& .MuiPaginationItem-root': {
            color: `${ThemeColor.subtitle}`,
        },
        '& .Mui-selected': {
            color: `${ThemeColor.secondDark}`,
            backgroundColor: 'white !important' as 'white',
        },
        '& .MuiPaginationItem-previousNext': {
            backgroundColor: `${ThemeColor.second}`,
        },

        '&.page-item': {
            '&:hover': {
                button: {
                    backgroundColor: 'green',
                    borderColor: 'green',
                },
            },
        },
    },
}));

interface IProps {
    className?: string;
    count: number;
    page: number;
    size?: string;
    onChange: (a, b) => void;
}

const UIPaginations: FC<IProps> = (props) => {
    const classes = useStyles();
    const { className, count, page, size, onChange } = props;
    return (
        <Container className={classes.root}>
            <Pagination count={count} page={page} onChange={onChange}></Pagination>
        </Container>
    );
};

UIPaginations.defaultProps = {};
export default UIPaginations;
