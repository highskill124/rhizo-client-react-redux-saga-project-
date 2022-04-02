import { Box, ClickAwayListener, Fade, makeStyles, Paper, Popper, PopperPlacementType, Typography } from '@material-ui/core';
import React, { FC, ReactElement } from 'react';
import styled, { css } from 'styled-components';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';
import { Tween } from '../../../settings/Tween';
import UIButtonBase from '../../button/UIButtonBase';
import UIBackdrop from '../../core/UIBackdrop';
import { EditIcon } from '../../icon/UIIconAssets';

const radius = 10;

const SPopper = styled(Popper)<any>`
    z-index: 2000;
    &[x-placement*='bottom'] {
        .arrow {
            top: 0px;
            left: 0px;
            margin-top: -0.71em;
            margin-left: 4px;
            margin-right: 4px;
            &::before {
                transform-origin: 0 100%;
            }
        }
    }

    &[x-placement*='top'] {
        .arrow {
            bottom: 0px;
            left: 0px;
            margin-bottom: -0.71em;
            margin-left: 4px;
            margin-right: 4px;
            &::before {
                transform-origin: 100% 0;
            }
        }
    }
    &[x-placement*='right'] {
        .arrow {
            top: 24px !important;
            left: 0px;
            margin-left: -9px;
            height: 14.1421px;
            width: 10px;
            margin-top: 0px;
            margin-bottom: 0px;
            &::before {
                transform-origin: 100% 100%;
            }
        }
    }
    &[x-placement*='left'] {
        .arrow {
            right: 0px;
            margin-right: -0.71em;
            height: 1em;
            width: 0.71em;
            margin-top: 4px;
            margin-bottom: 4px;
            &::before {
                transform-origin: 0 0;
            }
        }
    }
`;

const Arrow = styled.div<any>`
    overflow: hidden;
    position: absolute;
    width: 10px;
    height: 14.1421px /* = width / sqrt(2) = (length of the hypotenuse) */;
    box-sizing: border-box;
    color: ${(props) => props.fill};
    &::before {
        content: '';
        margin: auto;
        display: block;
        width: 100%;
        height: 100%;
        box-shadow: none;
        background-color: ${(props) => props.fill};
        transform: rotate(45deg);
    }
`;

const Root = styled.div<any>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: #ffffff;
    box-shadow: 0px 21px 73px rgba(0, 0, 0, 0.16);
    border-radius: ${radius}px;
    max-width: 200px;
`;

const Wrapper = styled.div<any>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: #ffffff;
    /* box-shadow: 0px 21px 73px rgba(0, 0, 0, 0.16); */
    border-radius: ${radius}px;
    max-width: 200px;
`;

const ContentWrapper = styled.div<any>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    padding: 10px 12px;
`;

const FooterWrapper = styled.div<any>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    margin: 0px 0px 0px 0px;
    /* padding: 10px 12px; */
    padding: 0px;

    height: 32px;

    background: #e5e5e5;
    opacity: 0.3;
    border-radius: 0px 0px ${radius}px ${radius}px;

    > button {
        height: 32px;
        border-radius: ${radius}px;
        background-color: #e5e5e5;
        color: ${ThemeColor.grey45};
        border-radius: 0px 0px ${radius}px ${radius}px;
        align-self: stretch;
        font-weight: ${FontWeight.bold};
        font-size: ${FontSize.sm};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        justify-content: flex-start;
        padding: 0px 12px;

        ${(props) => {
            return css`
                margin: 0px;
            `;
        }}

        &:hover {
            background-color: ${ThemeColor.basicDark};
            svg {
                * {
                    fill: ${ThemeColor.grey45};
                }
            }
        }

        svg {
            width: 10px;
            height: 10px;
            margin-right: 6px;
            * {
                transition: fill ${Tween.duration}s ${Tween.ease};
                fill: ${ThemeColor.grey45};
            }
        }
    }
`;

const HeaderWrapper = styled.div<any>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    margin: 0px 0px 0px 0px;
    padding: 10px 12px;
    height: 54px;

    background: #ff7c7c;
    border-radius: ${radius}px ${radius}px 0px 0px;

    > h4 {
        font-style: normal;
        font-weight: ${FontWeight.bold};
        font-size: ${FontSize.md};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: #ffffff;
        margin: 0px;
        width: 100%;
    }

    > div {
        font-style: normal;
        font-weight: ${FontWeight.medium};
        font-size: ${FontSize.xs};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: #ffffff;
        margin-top: 4px;
        width: 100%;
    }
`;

interface IProps {
    children?: ReactElement;
    open: boolean;
    onClose?: () => void;
    arrow?: boolean;
    placement?: PopperPlacementType;
    anchorEl: any;
    headerColor?: string;
}

const RichTooltip: FC<IProps> = ({ placement = 'top', arrow = true, open, onClose = () => {}, children, anchorEl = null, headerColor = '#FF7C7C' }) => {
    const [arrowRef, setArrowRef] = React.useState<HTMLElement | null>(null);

    return (
        <SPopper
            open={open}
            anchorEl={anchorEl}
            placement={placement}
            transition
            // anchorOrigin={{ vertical: 'middle', horizontal: 20 }}
            // transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            modifiers={{
                preventOverflow: {
                    enabled: true,
                    boundariesElement: 'window',
                },
                arrow: {
                    enabled: arrow,
                    element: arrowRef,
                },
                offset: {
                    enabled: true,
                    offset: '60%, 10',
                },
            }}
        >
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Root>
                        <ClickAwayListener onClickAway={onClose}>
                            <Wrapper>
                                {arrow ? <Arrow className="arrow" fill={headerColor} ref={setArrowRef} /> : null}
                                <HeaderWrapper>
                                    <Typography noWrap component="h4">
                                        Higher Mathematics
                                    </Typography>
                                    <Typography noWrap component="div">
                                        Biology, Medicine, Natural Product Chemistry, Spices & Medicinal Plants
                                    </Typography>
                                </HeaderWrapper>
                                <ContentWrapper>{children}</ContentWrapper>
                                <FooterWrapper>
                                    <UIButtonBase onClick={(e) => {}}>
                                        {
                                            <>
                                                <EditIcon /> <span>Hide Event</span>
                                            </>
                                        }
                                    </UIButtonBase>
                                </FooterWrapper>
                            </Wrapper>
                        </ClickAwayListener>
                    </Root>
                </Fade>
            )}
        </SPopper>
    );
};

export default RichTooltip;
