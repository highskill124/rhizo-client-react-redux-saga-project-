import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Tween } from '../../settings/Tween';
import { ThemeColor } from '../../settings/ThemeColor';

const SButton = styled.button<Partial<IProps>>`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-self: initial;
    transition: background-color ${Tween.duration}s ${Tween.ease};
    cursor: pointer;
    padding: 4px 4px;
    /* min-width: 32px; */
    height: 32px;
    background-color: ${ThemeColor.primary};
    border: none;
    border-radius: 6px;
`;

interface IProps {
    className?: string;
    id?: string;
    name?: string;
    children: ReactNode;
    onClick?: (e) => void;
    type?: 'button' | 'submit' | 'reset' | undefined;
    disabled?: boolean;
    style?: any;
}

const UIButtonBase: FC<IProps> = ({ children, type, style, onClick }) => {
    return (
        <SButton type={type} onClick={onClick} style={style}>
            {children}
        </SButton>
    );
};

UIButtonBase.defaultProps = {
    type: 'button',
    disabled: false,
    onClick: (e) => {},
};

export default UIButtonBase;
