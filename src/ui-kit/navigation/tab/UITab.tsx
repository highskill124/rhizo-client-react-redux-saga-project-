import { Tab } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';

const STab = styled((props) => <Tab {...props} />)<any>`
    &.MuiTab-root {
        display: inline-flex;
        text-transform: none;
        min-width: auto;
        margin-right: 0px;
        padding-left: 16px;
        padding-right: 16px;
        color: ${ThemeColor.subtitle};
        font-style: normal;
        font-weight: ${FontWeight.medium};
        font-size: ${FontSize.md};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        opacity: 1;
        width: auto;

        &:hover {
            color: ${ThemeColor.primary};
            opacity: 1;
        }

        // &$tabSelected: {
        //     color: ${ThemeColor.primary};
        //     font-weight: ${FontWeight.medium};
        //     opacity: 1;
        // }

        &:focus {
            color: ${ThemeColor.primary};
            opacity: 1;
        }
    }
`;

interface IProps {
    className?: string;
    id?: string;
    label: string;
    index?: number;
}

const UITab: FC<IProps> = (props) => {
    const { id, index, label, ...other } = props;

    const a11yProps = (i: any) => {
        return {
            id: `${id}-tab-${i}`,
            'aria-controls': `${id}-tabpanel-${i}`,
        };
    };

    return <STab disableRipple label={label} {...other} {...a11yProps(index)} />;
};

UITab.defaultProps = {};

export default UITab;
