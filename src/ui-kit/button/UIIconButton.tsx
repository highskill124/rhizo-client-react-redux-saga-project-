import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import Color from 'color';
import UIButtonBase from './UIButtonBase';
import { Tween } from '../../settings/Tween';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    margin: 0px;
    min-height: 16px;
    height: auto;
    border-radius: 50%;

    > button {
        display: flex;
        min-width: 24px;
        border-radius: 10px;
        align-self: stretch;
        flex: none;
        flex-shrink: 0;
        flex-grow: 1;
        margin: 0px 0px;
        padding: 2px;

        svg {
            * {
                transition: fill ${Tween.duration}s ${Tween.ease};
                fill: ${ThemeColor.basic};
            }
        }

        ${(props) => {
            if (props.disabled) {
                return css`
                    cursor: not-allowed;
                `;
            } else {
                return css`
                    cursor: pointer;
                `;
            }
        }}

        ${(props) => {
            if (props.size === 'small') {
                return css`
                    padding: 0.375rem;
                    padding: 0.375rem;
                    width: 1.625rem;
                    height: 1.625rem;
                    border-radius: ${props.radius ? props.radius : '0.438rem'};
                `;
            } else if (props.size === 'medium') {
                return css`
                    padding: 0.5rem;
                    padding: 0.5rem;
                    width: 1.875px;
                    height: 1.875px;
                    border-radius: ${props.radius ? props.radius : '0.5rem'};
                `;
            } else if (props.size === 'large') {
                return css`
                    padding: 0.5rem;
                    padding: 0.5rem;
                    width: 2.5rem;
                    height: 2.5rem;
                    ${props.radius ? props.radius : '0.625rem'};
                `;
            }

            return null;
        }}

        ${(props) => {
            if (props.disabled) {
                return css`
                    background-color: rgba(0, 0, 0, 0.12);

                    svg {
                        * {
                            fill: rgba(0, 0, 0, 0.26);
                        }
                    }
                `;
            }
            if (props.color === 'primary') {
                return css`
                    background-color: ${ThemeColor.primary};
                    &:hover {
                        background-color: ${Color(ThemeColor.primary).lighten(0.1).toString()};
                        svg {
                            * {
                                fill: ${ThemeColor.white};
                            }
                        }
                    }
                    svg {
                        * {
                            fill: ${ThemeColor.white};
                        }
                    }
                `;
            } else if (props.color === 'basic') {
                return css`
                    background-color: ${ThemeColor.basic};
                    color: ${ThemeColor.title};
                    &:hover {
                        background-color: ${Color(ThemeColor.basic).lighten(0.1).toString()};
                        svg {
                            * {
                                fill: ${ThemeColor.basic};
                            }
                        }
                    }
                    svg {
                        * {
                            fill: ${ThemeColor.grey45};
                        }
                    }
                `;
            } else if (props.color === 'danger') {
                return css`
                    background-color: ${ThemeColor.danger};
                    &:hover {
                        background-color: ${Color(ThemeColor.danger).lighten(0.1).toString()};
                        svg {
                            * {
                                fill: ${ThemeColor.white};
                            }
                        }
                    }
                    svg {
                        * {
                            fill: ${ThemeColor.white};
                        }
                    }
                `;
            } else if (props.color === 'info') {
                return css`
                    background-color: ${ThemeColor.info};
                    &:hover {
                        background-color: ${Color(ThemeColor.info).lighten(0.1).toString()};
                        svg {
                            * {
                                fill: ${ThemeColor.white};
                            }
                        }
                    }
                    svg {
                        * {
                            fill: ${ThemeColor.white};
                        }
                    }
                `;
            }

            return null;
        }}
    }
`;

interface IProps {
    className?: string;
    id?: string;
    children: ReactNode;
    onClick?: (e) => void;
    size?: 'small' | 'medium' | 'large';
    color?: 'primary' | 'basic' | 'danger' | 'info';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    radius?: number;
}

const UIIconButton: FC<IProps> = (props) => {
    const { id, type, onClick, children, size, color, disabled } = props;
    return (
        <Wrapper size={size} color={color} disabled={disabled}>
            <UIButtonBase id={id} name={id} type={type} onClick={(e) => onClick(e)}>
                {children}
            </UIButtonBase>
        </Wrapper>
    );
};

UIIconButton.defaultProps = {
    type: 'button',
    size: 'large',
    color: 'primary',
    onClick: (e) => {},
    disabled: false,
};

export default UIIconButton;
