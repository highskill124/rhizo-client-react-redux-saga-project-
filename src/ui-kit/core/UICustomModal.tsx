import { Backdrop, Fade, Modal, makeStyles, SwipeableDrawer } from '@material-ui/core';
import React, { FC, ReactNode, useState } from 'react';
import Slide from '@material-ui/core/Slide/Slide';
import styled from 'styled-components';
import { Device } from '../../settings/Device';
import UIButton from '../button/UIButton';
import UISpacer from './UISpacer';
import UIDevider from './UIDevider';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import UIModalTitle from './UIModalTitle';
import UIBox from '../layout/UIBox';
import { ModalCloseIcon, BackIcon } from '../icon/UIIconAssets';

const SBackdrop = styled(Backdrop)<any>`
    &.MuiBackdrop-root {
        background-color: rgba(94, 198, 157, 0.3s);
    }
`;

const SModal = styled(Modal)<any>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    box-shadow: none;
`;

const ContentWrapper = styled.div<any>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex: none;
    flex-grow: 0;
    align-self: initial;
    margin: 0px 0px 0px 0px;
    padding: 25px;
    background-color: ${ThemeColor.white};
    border-radius: 8px;
    box-shadow: none;
    width: 40%;
    min-width: 425px;
    max-height: 90%;
    overflow-y: auto;
    @media (max-width: ${Device.tablet - 1}px) {
        // min-height: 600px;
        width: 100%;
        height: 85%;
        min-width: 300px;
    }
    &::-webkit-scrollbar {
        display: none;
    }
    &:focus-visible {
        outline: none !important;
    }

    > h4 {
        font-weight: ${FontWeight.bold};
        font-size: ${FontSize.xxl};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.grey45};
        flex: none;
        flex-grow: 0;
        margin: 0px 0px 10px 0px;
        padding: 0;
    }

    span {
        font-weight: normal;
        font-size: ${FontSize.xl};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.grey165};
        flex: none;
        align-self: stretch;
        flex-grow: 0;
        margin: 0px 0px 0px 0px;
    }
`;

const ControlWrapper = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
`;

const CloseButton = styled.div`
    &:hover {
        cursor: pointer;
    }
`;

const Subtitle = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.sm};
    margin: 0;
`;

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        outline: 0,
        boxShadow: theme.shadows[5],
        padding: '100px 32px 86px',
    },
    buttons: {
        paddingLeft: '50%',
    },
    drawer: {
        '&>div:nth-child(3)': {
            borderRadius: '10px 0 0 10px',
            '@media (max-width: 768px)': {
                borderRadius: '10px 10px 0 0',
            },
        },
    },
    close: {
        display: 'none',
    },

    hideBack: {
        display: 'none',
    },

    back: {
        '&:hover': {
            cursor: 'pointer',
        },
    },
    egClass: {
        outline: 'none !important',
        border: 'none',
    },
}));

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    open: boolean;
    title?: string;
    subTitle?: string;
    desc?: string;
    mainButtonLabel?: string;
    subButtonLabel?: string;
    onClose?: (x) => void;
    onBack?: (x) => void;
    onSave?: (x) => void;
    hideBack?: boolean;
    hideClose?: boolean;
}

const useScrollTop = () => {
    const [scrollTop, setScrollTop] = useState(0);
    const onScroll = (event) => setScrollTop(event.target.scrollTop);
    return [scrollTop, { onScroll }];
};

const UICustomModal: FC<IProps> = (props) => {
    const { id, open, onClose, onSave, onBack, hideClose, subTitle, hideBack, title, className, desc, mainButtonLabel, subButtonLabel, children } = props;
    const classes = useStyles();
    const width = window.innerWidth;
    const tablet = 768;
    const [scrollTop, scrollProps] = useScrollTop();

    return width > tablet ? (
        <SModal
            aria-labelledby={`${id}-modal-title`}
            aria-describedby={`${id}-modal-description`}
            open={open}
            onClose={onClose}
            closeAfterTransition
            disableEnforceFocus
            BackdropComponent={SBackdrop}
            BackdropProps={{
                timeout: 0,
            }}
            scroll="body"
        >
            <Slide direction="up" in={open}>
                <ContentWrapper className={className}>
                    <UIBox justifyContent="space-between" alignItems="center">
                        <BackIcon onClick={(e) => onBack(true)} className={hideBack ? classes.hideBack : classes.back} />
                        {subTitle ? (
                            <UIBox direction="column">
                                <UIModalTitle content={title} />
                                <UISpacer height={15}></UISpacer>
                                <Subtitle>{subTitle}</Subtitle>
                            </UIBox>
                        ) : (
                            <UIBox direction="column">
                                <UIModalTitle content={title} />
                            </UIBox>
                        )}
                        <CloseButton onClick={(e) => onClose(false)} className={hideClose ? classes.close : ''}>
                            <ModalCloseIcon />
                        </CloseButton>
                    </UIBox>
                    <UIDevider></UIDevider>
                    <UISpacer height={10}></UISpacer>
                    {children}
                    <UISpacer height={10}></UISpacer>
                    <ControlWrapper>
                        {subButtonLabel && (
                            <UIButton color="basic" onClick={(e) => onBack(false)}>
                                {subButtonLabel}
                            </UIButton>
                        )}
                        <UISpacer width={10} />
                        {mainButtonLabel && (
                            <UIButton color="second" onClick={(e) => onSave(true)}>
                                {mainButtonLabel}
                            </UIButton>
                        )}
                    </ControlWrapper>
                </ContentWrapper>
            </Slide>
        </SModal>
    ) : (
        <SwipeableDrawer anchor={width > tablet ? 'right' : 'bottom'} open={open} onClose={onClose} onOpen={() => true} className={classes.drawer} {...scrollProps}>
            <Fade in={open}>
                <ContentWrapper>
                    <UIBox justifyContent="space-between" alignItems="center">
                        <BackIcon onClick={(e) => onBack(true)} className={hideBack ? classes.hideBack : classes.back} />
                        <UIModalTitle content={title} />
                        <CloseButton onClick={(e) => onClose(false)} className={hideClose ? classes.close : ''}>
                            <ModalCloseIcon />
                        </CloseButton>
                    </UIBox>
                    <UISpacer height={10}></UISpacer>
                    {children}
                    <UISpacer height={10}></UISpacer>
                    <ControlWrapper>
                        {subButtonLabel && (
                            <UIButton color="basic" onClick={(e) => onBack(false)}>
                                {subButtonLabel}
                            </UIButton>
                        )}
                        <UISpacer width={10} />
                        {mainButtonLabel && (
                            <UIButton color="second" onClick={(e) => onSave(true)}>
                                {mainButtonLabel}
                            </UIButton>
                        )}
                    </ControlWrapper>
                </ContentWrapper>
            </Fade>
        </SwipeableDrawer>
    );
};

UICustomModal.defaultProps = {};

export default UICustomModal;
