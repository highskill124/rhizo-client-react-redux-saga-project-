import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import UIButtonBase from './UIButtonBase';
import { Tween } from '../../settings/Tween';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    > button {
        width: 40px;
        height: 40px;
        border-radius: 13px;
        background-color: ${ThemeColor.primary};

        ${(props) => {
            return css`
                margin: ${props.margin ? props.margin.map((x) => `${x}px`).join(' ') : '0px'};
            `;
        }}
        &:hover {
            background-color: ${ThemeColor.primaryLight};
            svg {
                * {
                    fill: ${ThemeColor.white};
                }
            }
        }

        svg {
            width: 14px;
            height: 14px;
            * {
                transition: fill ${Tween.duration}s ${Tween.ease};
                fill: ${ThemeColor.white};
            }
        }
    }
`;

interface IProps {
    className?: string;
    id?: string;
    children: ReactNode;
    margin?: Array<number>;
    onClick?: () => void;
}

const UIActionButton: FC<IProps> = (props) => {
    const { id, children, onClick, margin } = props;

    return (
        <Wrapper id={id} margin={margin}>
            <UIButtonBase onClick={(e) => onClick()}>{children}</UIButtonBase>
        </Wrapper>
    );
};

UIActionButton.defaultProps = {
    onClick: () => {},
    margin: [0],
};

export default UIActionButton;
