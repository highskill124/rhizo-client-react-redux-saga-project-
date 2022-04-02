import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import UIButtonBase from './UIButtonBase';
import UILoader from '../core/UILoader';
import UISpacer from '../core/UISpacer';
import { Tween } from '../../settings/Tween';
import { ThemeColor } from '../../settings/ThemeColor';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import Theme from '../../settings/Theme';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0px;
    margin: 0px;
    min-height: 16px;
    height: auto;
    border-radius: 4px;

    /* overflow: hidden; */
    ${(props) => {
        if (props.block) {
            return css`
                flex: none;
                flex-grow: 1;
                flex-shrink: 0;
                /* align-self: stretch; */
            `;
        } else {
            return css`
                flex: none;
                flex-grow: 0;
                flex-shrink: 0;
                align-self: auto;
                /* width: auto; */
            `;
        }
        return null;
    }}

    > button {
        display: flex;
        min-width: 24px;
        border-radius: 4px;
        align-self: stretch;
        flex: none;
        flex-shrink: 0;
        flex-grow: 1;
        margin: 0px 0px;
        padding: 2px;

        svg {
            * {
                transition: fill ${Tween.duration}s ${Tween.ease};
                fill: ${ThemeColor.grey165};
            }
        }

        span {
            display: flex;
            align-self: auto;
            margin: 0px;
            padding: 0px;
            font-weight: ${FontWeight.bold};
            font-size: ${FontSize.md};
            line-height: ${LineHeight.md};
            letter-spacing: ${LetterSpacing.md};
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
            return null;
        }}

        ${(props) => {
            if (props.size === 'small') {
                return css`
                    padding-left: 1rem;
                    padding-right: 1rem;
                    min-height: 1.625rem;
                    border-radius: 0.438rem;

                    span {
                        font-weight: ${FontWeight.bold};
                        font-size: ${FontSize.xs};
                        line-height: ${LineHeight.md};
                        letter-spacing: ${LetterSpacing.md};
                    }
                `;
            } else if (props.size === 'medium') {
                return css`
                    padding-left: 0.75rem;
                    padding-right: 0.75rem;
                    min-height: 1.875px;
                    border-radius: 0.5rem;

                    span {
                        font-weight: ${FontWeight.bold};
                        font-size: ${FontSize.sm};
                        line-height: ${LineHeight.md};
                        letter-spacing: ${LetterSpacing.md};
                    }
                `;
            } else if (props.size === 'large') {
                return css`
                    padding-left: 1.1rem;
                    padding-right: 1.1rem;
                    border-radius: 0.325rem;
                    min-height: 2.5rem;
                    span {
                        font-weight: ${FontWeight.bold};
                        font-size: ${FontSize.md};
                        line-height: ${LineHeight.md};
                        letter-spacing: ${LetterSpacing.md};
                    }
                `;
            }

            return null;
        }}

        ${(props) => {
            if (props.disabled) {
                return css`
                    background-color: rgba(0, 0, 0, 0.12);
                    span {
                        color: rgba(0, 0, 0, 0.26);
                    }
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
                        background-color: ${ThemeColor.primaryLight};
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
                    span {
                        color: ${ThemeColor.white};
                    }
                `;
            } else if (props.color === 'basic') {
                return css`
                    background-color: ${ThemeColor.basic};
                    color: ${ThemeColor.title};
                    &:hover {
                        background-color: ${ThemeColor.basicDark};
                        svg {
                            * {
                                fill: ${ThemeColor.title};
                            }
                        }
                    }
                    svg {
                        * {
                            fill: ${ThemeColor.title};
                        }
                    }
                    span {
                        color: ${ThemeColor.title};
                    }
                `;
            } else if (props.color === 'danger') {
                return css`
                    background-color: ${ThemeColor.danger};
                    &:hover {
                        background-color: ${ThemeColor.dangerDark};
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
                    span {
                        color: ${ThemeColor.white};
                    }
                `;
            } else if (props.color === 'info') {
                return css`
                    background-color: ${ThemeColor.info};
                    &:hover {
                        background-color: ${ThemeColor.infoLight};
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
                    span {
                        color: ${ThemeColor.white};
                    }
                `;
            } else if (props.color === 'dangerline') {
                return css`
                    background-color: ${ThemeColor.white};
                    border: 1px solid ${ThemeColor.danger};
                    color: ${ThemeColor.danger};
                    &:hover {
                        background-color: ${ThemeColor.lightDanger};
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
            } else if (props.color === 'second') {
                return css`
                    background-color: ${ThemeColor.second};
                    color: ${ThemeColor.secondDark};
                    &:hover {
                        background-color: ${ThemeColor.secondMiddle};
                        svg {
                            * {
                                fill: ${ThemeColor.secondDark};
                            }
                        }
                    }
                    svg {
                        * {
                            fill: ${ThemeColor.secondDark};
                        }
                    }
                    span {
                        color: ${ThemeColor.secondDark};
                    }
                `;
            } else if (props.color === 'secondDark') {
                return css`
                    background-color: ${ThemeColor.secondDark};
                    color: ${ThemeColor.white};
                    &:hover {
                        background-color: ${ThemeColor.secondDark};
                        svg {
                            * {
                                fill: ${ThemeColor.secondDark};
                            }
                        }
                    }
                    svg {
                        * {
                            fill: ${ThemeColor.secondDark};
                        }
                    }
                    span {
                        color: ${ThemeColor.white};
                    }
                `;
            } else if (props.color === 'basicline') {
                return css`
                    background-color: ${ThemeColor.white};
                    color: ${ThemeColor.subtitle};
                    border: 1px solid ${ThemeColor.basicDark};
                    &:hover {
                        background-color: ${ThemeColor.basic};
                        color: ${ThemeColor.title};
                        svg {
                            * {
                                fill: ${ThemeColor.basicBlack};
                            }
                        }
                    }
                    svg {
                        * {
                            fill: ${ThemeColor.basicBlack};
                        }
                    }
                    span {
                        color: ${ThemeColor.subtitle};
                        font-weight: ${FontWeight.regular};
                    }
                `;
            } else if (props.color === 'lightDanger') {
                return css`
                    background-color: ${ThemeColor.lightDanger};
                    color: ${ThemeColor.lightDangerLine};
                    &:hover {
                        background-color: ${ThemeColor.lightDanger};
                        color: ${ThemeColor.lightDangerLine};
                        svg {
                            * {
                                fill: ${ThemeColor.lightDangerLine};
                            }
                        }
                    }
                    svg {
                        * {
                            fill: ${ThemeColor.lightDangerLine};
                        }
                    }
                    span {
                        color: ${ThemeColor.lightDangerLine};
                    }
                `;
            } else if (props.color === 'completed') {
                return css`
                    background-color: ${ThemeColor.completed};
                    color: ${ThemeColor.completedDark};
                    &:hover {
                        background-color: ${ThemeColor.completedHover};
                        color: ${ThemeColor.completedDark};
                        svg {
                            * {
                                fill: ${ThemeColor.completedDark};
                            }
                        }
                    }
                    svg {
                        * {
                            fill: ${ThemeColor.completedDark};
                        }
                    }
                    span {
                        color: ${ThemeColor.completedDark};
                    }
                `;
            } else if (props.color === 'pending') {
                return css`
                    background-color: ${ThemeColor.pending};
                    color: ${ThemeColor.pendingDark};
                    &:hover {
                        background-color: ${ThemeColor.pendingHover};
                        color: ${ThemeColor.pendingDark};
                        svg {
                            * {
                                fill: ${ThemeColor.pendingDark};
                            }
                        }
                    }
                    svg {
                        * {
                            fill: ${ThemeColor.pendingDark};
                        }
                    }
                    span {
                        color: ${ThemeColor.pendingDark};
                    }
                `;
            } else if (props.color === 'dispute') {
                return css`
                    background-color: ${ThemeColor.dispute};
                    color: ${ThemeColor.disputeDark};
                    &:hover {
                        background-color: ${ThemeColor.disputeHover};
                        color: ${ThemeColor.disputeDark};
                        svg {
                            * {
                                fill: ${ThemeColor.disputeDark};
                            }
                        }
                    }
                    svg {
                        * {
                            fill: ${ThemeColor.disputeDark};
                        }
                    }
                    span {
                        color: ${ThemeColor.disputeDark};
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
    color?: 'primary' | 'basic' | 'danger' | 'info' | 'dangerline' | 'second' | 'basicline' | 'lightDanger' | 'completed' | 'pending' | 'dispute' | 'secondDark';
    type?: 'button' | 'submit' | 'reset';
    activity?: boolean;
    disabled?: boolean;
    block?: boolean;
    style?: any;
}

const UIButton: FC<IProps> = (props) => {
    const { id, type, onClick, children, size, color, activity, disabled, block, style, className } = props;
    return (
        <Wrapper size={size} color={color} disabled={disabled} block={block} style={style} className={className}>
            <UIButtonBase id={id} name={id} type={type} onClick={(e) => !disabled && onClick(e)}>
                {activity && <UILoader size={size} />}
                {activity && <UISpacer width={8} />}
                <span style={{ gap: '10px', alignItems: 'center' }}>{children}</span>
            </UIButtonBase>
        </Wrapper>
    );
};

UIButton.defaultProps = {
    type: 'button',
    size: 'large',
    color: 'primary',
    onClick: (e) => {},
    activity: false,
    disabled: false,
    block: false,
};

export default UIButton;
