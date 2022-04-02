import React, { FC, ReactNode } from 'react';
import { Switch } from '@material-ui/core';
import styled from 'styled-components';
import { Tween } from '../../settings/Tween';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: none;
`;

const SSwitch = styled(Switch)<any>`
    &.MuiSwitch-root {
        /* width: 54px; */
        height: 30px;
        padding: 0px;
        margin: 0px;
    }

    .MuiSwitch-switchBase {
        padding: 3px;
        &.Mui-checked {
            transform: translateX(28px);
            color: ${ThemeColor.white};
            + .MuiSwitch-track {
                background-color: ${ThemeColor.danger};
                opacity: 1;
                border: none;
            }
        }
    }

    .MuiSwitch-thumb {
        width: 24px;
        height: 24px;
    }

    .MuiSwitch-track {
        border-radius: 15px;
        /* width: 54px; */
        height: 30px;
        border: none;
        background-color: ${ThemeColor.grey165};
        opacity: 1;
        transition: background-color 0.2s ${Tween.ease}, border 0.2s ${Tween.ease};
    }
`;

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
}

const UISwitch: FC<IProps> = (props) => {
    const { id, ...other } = props;
    return (
        <Wrapper id={id}>
            <SSwitch
                // ---
                disableRipple
                {...other}
            />
        </Wrapper>
    );
};

UISwitch.defaultProps = {};

export default UISwitch;
