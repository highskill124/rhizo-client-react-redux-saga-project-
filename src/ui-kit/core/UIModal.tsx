import { Backdrop, Fade, Modal } from '@material-ui/core';
import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Device } from '../../settings/Device';
import UIButton from '../button/UIButton';
import UISpacer from './UISpacer';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

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
    border: 1px solid rgba(94, 198, 157, 0.6);
    max-width: 480px;
    @media (max-width: ${Device.mobileMedium - 1}px) {
        max-width: 340px;
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
        margin: 0px 0px 20px 0px;
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
    min-height: 16px;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
`;

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    open: boolean;
    title?: string;
    desc?: string;
    mainButtonLabel?: string;
    subButtonLabel?: string;
    onClose: (x) => void;
}

const UIModal: FC<IProps> = (props) => {
    const { id, open, onClose, title, desc, mainButtonLabel, subButtonLabel } = props;

    return (
        <SModal
            aria-labelledby={`${id}-modal-title`}
            aria-describedby={`${id}-modal-description`}
            open={open}
            onClose={onClose}
            closeAfterTransition
            disableEnforceFocus
            BackdropComponent={SBackdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <ContentWrapper>
                    <h4 id={`${id}-modal-title`}>{title}</h4>
                    <span id={`${id}-modal-description`}>{desc}</span>
                    <ControlWrapper>
                        {subButtonLabel && (
                            <UIButton color="basic" onClick={(e) => onClose(false)}>
                                {subButtonLabel}
                            </UIButton>
                        )}
                        <UISpacer width={10} />
                        <UIButton onClick={(e) => onClose(true)}>{mainButtonLabel}</UIButton>
                    </ControlWrapper>
                </ContentWrapper>
            </Fade>
        </SModal>
    );
};

UIModal.defaultProps = {
    mainButtonLabel: 'OK',
};

export default UIModal;
