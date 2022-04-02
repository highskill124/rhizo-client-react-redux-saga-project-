import React, { FC, ReactNode, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import UITabs from './UITabs';
import UITab from './UITab';
import { makeStyles } from '@material-ui/core';
import { ThemeColor } from '../../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    /* display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    border-color: ${ThemeColor.white};
    flex: none;
    flex-grow: 0; */
    width: 100%;
    & .MuiTabs-fixed {
        overflow-x: auto !important;
        &::-webkit-scrollbar {
            background-color: ${ThemeColor.border};
            height: 5px;
        }
        &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px ${ThemeColor.border};
            border-radius: 6px;
        }
        &::-webkit-scrollbar-thumb {
            background: ${ThemeColor.subtitle};
            border-radius: 6px;
        }
    }

    & div[data-swipeable] {
        max-width: 100%;
        overflow-x: hidden;
    }
`;

const useStyles = makeStyles((theme) => ({
    tab: {
    }
}));

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    labels: Array<any>;
    onChange: (x) => void;
}

const UITabNav: FC<IProps> = (props) => {
    const classes = useStyles();
    const { id, labels, children, onChange, className } = props;
    const [index, setIndex] = useState(0);

    const changeIndex = (e, x) => {
        setIndex(x);
        onChange(x);
    };

    const changeIndex2 = (e, x) => {};
    return (
        <Wrapper id={id} className={className}>
            <UITabs id={id} value={index} onChange={changeIndex}>
                {labels && labels.length > 0 && labels.map((x, i) => <UITab id={id} index={i} label={x.label} />)}
            </UITabs>
            <SwipeableViews axis={'x'} index={index} onChangeIndex={changeIndex2} disabled={true}>
                {children}
            </SwipeableViews>
        </Wrapper>
    );
};

UITabNav.defaultProps = {};

export default UITabNav;
