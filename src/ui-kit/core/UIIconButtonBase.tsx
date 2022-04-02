import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { ThemeColor } from '../../settings/ThemeColor';
import { Tween } from '../../settings/Tween';

const BaseButton = ({ type, onClick, children }) => {
    return (
        <button type={type} onClick={onClick}>
            {children}
        </button>
    );
};

const SButton = styled(BaseButton)<Partial<IProps>>`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transition: background-color ${Tween.duration}s ${Tween.ease};
    cursor: pointer;
    padding: 4px 4px;

    ${(props) => {
        return css`
            width: ${props.width};
            height: ${props.height};
            background-color: ${props.fill[0]};
            border: ${props.stroke[0]};
            border-radius: ${props.radius};
            padding: ${props.padding}
            margin: ${props.margin}
            cursor: disabled ? not-allowed : pointer;
            &:hover {
                background-color: ${props.fill[1]};
                border: ${props.stroke[1]};
            }
        `;
    }}
`;

interface IProps {
    className?: string;
    children: ReactNode;
    onClick: (e) => void;
    type?: 'button' | 'submit' | 'reset' | undefined;
    width?: string;
    height?: string;
    color?: Array<string>;
    fill?: Array<string>;
    stroke?: Array<string>;
    radius?: number;
    padding?: string;
    margin?: string;
    disabled?: boolean;
}

const UIIconButtonBase: FC<IProps> = ({ children, type, onClick, ...other }) => {
    return (
        <SButton type={type} onClick={onClick} {...other}>
            {children}
        </SButton>
    );
};

UIIconButtonBase.defaultProps = {
    type: 'button',
    color: [ThemeColor.white, ThemeColor.white],
    fill: [ThemeColor.primary, ThemeColor.primaryLight],
    stroke: ['none', 'none'],
    width: '32px',
    height: '32px',
    radius: 10,
    padding: '4px',
    margin: '0px',
    disabled: false,
};

export default UIIconButtonBase;
