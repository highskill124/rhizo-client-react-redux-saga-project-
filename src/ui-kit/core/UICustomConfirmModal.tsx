import { Backdrop, Fade, Modal } from '@material-ui/core';
import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Device } from '../../settings/Device';
import UIButton from '../button/UIButton';
import UISpacer from './UISpacer';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import UIModalTitle from './UIModalTitle';
import UIBox from '../layout/UIBox';
import { CloseIcon } from '../icon/UIIconAssets';

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
        margin: 0px 0px 0px 0px;
    }
`;

const ControlWrapper = styled.div<any>`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    min-height: 44px;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    div {
        width: 50%;
        height: 44px;
    }
`;

const CloseButton = styled.div`
    padding: 15px 15px 11px 15px;
    background-color: ${ThemeColor.second};
    border-radius: 50%;
    &:hover {
        cursor: pointer;
    }
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
    confirm?: boolean;
}

const UICustomModal: FC<IProps> = (props) => {
    const { id, open, onClose, title, desc, mainButtonLabel, subButtonLabel, children, confirm } = props;

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
                timeout: 0,
            }}
            disableBackdropClick
        >
            <Fade in={open}>
                <ContentWrapper>
                    <UIBox justifyContent="space-between" alignItems="center">
                        <UIModalTitle content={title} />
                        <CloseButton onClick={(e) => onClose(true)}>
                            <CloseIcon />
                        </CloseButton>
                    </UIBox>
                    <UISpacer height={10}></UISpacer>
                    {props.children}
                    <ControlWrapper>
                        {subButtonLabel && (
                            <UIButton color="basic" onClick={(e) => onClose(false)}>
                                {subButtonLabel}
                            </UIButton>
                        )}
                        <UISpacer width={10} />
                        <UIButton color="lightDanger" onClick={(e) => (confirm ? null : onClose(true))} disabled={!!confirm}>
                            {mainButtonLabel}
                        </UIButton>
                    </ControlWrapper>
                </ContentWrapper>
            </Fade>
        </SModal>
    );
};

UICustomModal.defaultProps = {
    mainButtonLabel: 'OK',
};

export default UICustomModal;
