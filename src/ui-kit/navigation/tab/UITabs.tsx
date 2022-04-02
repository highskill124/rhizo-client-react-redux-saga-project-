import { Tabs } from '@material-ui/core';
import Scrollbars from 'react-custom-scrollbars';
import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { ThemeColor } from '../../../settings/ThemeColor';

const STabs = styled(Tabs)<any>`
    &.MuiTabs-root {
        border-bottom: 1px solid ${ThemeColor.grey229};
        box-shadow: none;
        // padding-left: 8px;
        padding-right: 8px;
        min-width: 10px;
        &:focus {
            box-shadow: none !important;
            border-style: none;
            outline: none;
        }
    }
    .Mui-selected > span {
        color: ${ThemeColor.secondDark};
    }

    .MuiTabs-indicator {
        height: 40px;
        background-color: ${ThemeColor.secondDark};
        opacity: 0.2;
        border-radius: 4px;
        margin-bottom: 4px;
        span {
            color: blue;
        }
    }
`;

interface IProps {
    className?: string;
    id?: string;
    children: ReactNode;
    value: number;
    onChange: (e, x) => void;
}

const UITabs: FC<IProps> = (props) => {
    const { id, value, onChange, children, ...other } = props;
    // variant="scrollable"
    // scrollButtons="auto"
    return (
        <STabs value={value} variant="standard" onChange={onChange} aria-label={`${id}-tab`} {...other}>
            {children}
        </STabs>
    );
};

UITabs.defaultProps = {};

export default UITabs;
