import { Drawer, makeStyles } from '@material-ui/core';
import React, { FC, ReactNode, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { Device } from '../../settings/Device';
import { IMenu } from '../../store/dto/IMenu';
import { createCloseDrawerAction, createOpenDrawerAction } from '../../store/state/PageState';
import { setUserType } from '../../store/state/ProfileState';
import { RootState } from '../../store/state/RootReducer';
import { ArrowLeftIcon, ArrowRightIcon, EditIcon, SwitchIcon, LockIcon, UserIcon, LogoutIcon, SwitchConfirmIcon, NotificationIcon } from '../../ui-kit/icon/UIIconAssets';
import UINavigationMenu from './UINavigationMenu';
import { ReactComponent as LogoImage } from '../../media/image/logo-image.svg';
import { ReactComponent as LogoText } from '../../media/image/logo-text.svg';
import UIButtonBase from '../../ui-kit/button/UIButtonBase';
import UICustomModal from '../../ui-kit/core/UICustomModal';
import UISpacer from '../../ui-kit/core/UISpacer';
import UIButton from '../../ui-kit/button/UIButton';
import UIBadge from '../../ui-kit/core/UIBadge';
import UIBackdrop from '../../ui-kit/core/UIBackdrop';
import { Tween } from '../../settings/Tween';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import UIBox from '../../ui-kit/layout/UIBox';

const SDrawer = styled(Drawer)<any>`
    .MuiDrawer-paper {
        position: fixed;
        white-space: nowrap;
        overflow: hidden;
        position: fixed;
        left: 0px;
        top: 0px;
        bottom: 0px;
        height: 100vh;
        box-shadow: none;
        border: none;
        transition: width ${Tween.duration}s ${Tween.ease};
        width: ${(props) => (props.isOpen ? 208 : 64)}px;

        @media (max-width: ${Device.mobileLarge}px) {
            width: ${(props) => (props.isOpen ? 208 : 0)}px;
        }
    }
    .MuiDrawer-paperAnchorDockedLeft {
        border-right: none;
    }
`;
const ButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
    > div {
        width: 50%;
    }
`;

const Wrapper = styled.div<any>`
    display: flex;
    border-right: 1px solid ${ThemeColor.border};
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    background: ${ThemeColor.white};
    box-shadow: none;
`;

const LogoWrapper = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    height: 64px;
    @media (max-width: ${Device.tablet}) {
        width: 100%;
        height: 64px;
    }
    background-color: transparent;
    margin: 8px 0px 0px ${(props) => (props.isOpen ? 20 : 10)}px;
    transition: all ${Tween.duration}s ${Tween.ease};
    svg {
        flex-shrink: 0;
    }
`;

const LogoTextWrapper = styled.div<any>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 64px;
    flex: 0;
    transition: opacity ${Tween.duration}s ${Tween.ease};
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    margin-left: ${(props) => (props.isOpen ? 8 : 8)}px;
`;

const ProfileSwitchWrapper = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: ${(props) => (props.isOpen ? 'flex-start' : 'center')};
    align-items: center;
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    margin: 0px 0px 20px 0px;
    padding-right: ${(props) => (props.isOpen ? 20 : 0)}px;
    padding-left: ${(props) => (props.isOpen ? 20 : 0)}px;
    height: 36px;
    transition: all ${Tween.duration}s ${Tween.ease};

    > button {
        width: ${(props) => (props.isOpen ? '100%' : '32px')};
        height: 36px;
        background-color: ${ThemeColor.second};
        border-radius: ${(props) => (props.isOpen ? '10px' : '10px')};
        padding-left: ${(props) => (props.isOpen ? 24 : 0)}px;
        padding-right: ${(props) => (props.isOpen ? 10 : 0)}px;
        transition: all ${Tween.duration}s ${Tween.ease};

        span {
            font-style: normal;
            font-weight: ${FontWeight.medium};
            font-size: ${FontSize.md};
            line-height: ${LineHeight.md};
            letter-spacing: ${LetterSpacing.md};
            color: ${ThemeColor.secondDark};
            margin: 0px 10px;
            display: ${(props) => (props.isOpen ? 'flex' : 'none')};
        }

        &:hover {
            background-color: ${ThemeColor.secondLight};
            svg {
                * {
                    fill: ${ThemeColor.secondDark};
                }
            }
        }

        > svg {
            * {
                transition: fill ${Tween.duration}s ${Tween.ease};
                fill: ${ThemeColor.secondDark};
            }
        }

        .right-icon {
            display: ${(props) => (props.isOpen ? 'flex' : 'none')};
        }
    }
`;

const MenuWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-self: stretch;
    > div:nth-child(1) {
        > div:nth-child(1) {
            &::-webkit-scrollbar {
                width: 0px;
                background: transparent; /* make scrollbar transparent */
            }
            margin-right: 0 !important;
            margin-left: 0 !important;
        }
    }
`;

export const ControlWrapper = styled.div<any>`
    width: 50px;
    height: 50px;
    display: none;
    transition: all ${Tween.duration}s ${Tween.ease};
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    background-color: rgba(255, 255, 255, 1);
    @media (max-width: ${Device.tablet - 1}px) {
        display: flex;
    }
`;

export const HideMenuButton = styled.div<any>`
    cursor: pointer;
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: row;
    justify-content: flex-end;

    display: ${(props) => (props.isOpen ? 'flex' : 'none')};

    > span {
        color: ${ThemeColor.grey165};
        height: 64px;
        display: flex;
        font-size: ${FontSize.sm};
        font-weight: ${FontWeight.medium};
        align-items: center;
        border-right: 1px solid rgba(0, 0, 0, 0.07);
        padding-right: 24px;
        letter-spacing: ${LetterSpacing.md};
        text-transform: uppercase;
        justify-content: flex-end;
        display: ${(props) => (props.isOpen ? 'flex' : 'none')};
    }
`;

export const IconWrapper = styled.div<any>`
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    border-left: 1px solid rgba(255, 255, 255, 0.25);
    flex-direction: row;
    justify-content: center;

    > svg {
        fill: ${ThemeColor.grey165};
        width: 20px;
        height: 20px;
        display: flex;
    }
`;

export const OpenIconWrapper = styled.div<any>`
    width: 20px;
    height: 20px;
    align-items: center;
    border-left: 1px solid rgba(255, 255, 255, 0.25);
    flex-direction: row;
    justify-content: center;
    display: ${(props) => (props.isOpen ? 'none' : 'flex')};
    transition: opacity ${Tween.duration}s ${Tween.ease};
    cursor: pointer;

    > svg {
        fill: ${ThemeColor.grey165};
        width: 30px;
        height: 30px;
        display: flex;
    }
`;

const SUIBackdrop = styled(UIBackdrop)<any>`
    @media (max-width: ${Device.desktop + 1}px) {
        &.MuiBackdrop-root {
            display: none;
        }
    }
`;

const IconContainer = styled.div`
    width: 100%;
    height: auto;
    text-align: center;
    > svg {
        width: 100px;
        height: 100px;
        margin-top: 30px;
        margin-bottom: 30px;
    }
`;

const ProfileDetailsWrapper = styled.div<Partial<any>>`
    display: none !important;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    padding: 8px;
    margin: 0px 0px;

    @media (max-width: ${Device.tablet}px) {
        ${(props) => {
            if (props.isOpen) {
                return css`
                    display: flex;
                    > h4 {
                        scale: 1;
                        opacity: 1;
                    }
                `;
            } else {
                return css`
                    display: flex;
                    > h4 {
                        scale: 0;
                        opacity: 0;
                    }

                    > :nth-child(3) {
                        display: none;
                    }
                `;
            }
            return null;
        }}
    }
`;

const ProfileDetails = styled.div<any>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex: 1;
    align-self: stretch;
    margin: 0px 0px 0px 8px;
    padding: 10px 0px 10px 0px;
    height: 64px;
    transition: opacity ${Tween.duration}s ${Tween.ease};

    > h4 {
        font-style: normal;
        font-weight: ${FontWeight.medium};
        font-size: ${FontSize.sm};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.grey45};
        margin: 0px 0px 6px 0px;
    }

    ${(props) => {
        if (props.isOpen) {
            return css`
                opacity: 1;
            `;
        } else {
            return css`
                opacity: 0;
            `;
        }
        return null;
    }}
`;

const ProfilePic = styled.div<any>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: none;
    flex-grow: 0;
    margin: 0px 0px 10px 0px;
    padding: 0px 0px 0px 0px;
    position: relative;
    transition: width ${Tween.duration}s ${Tween.ease}, height ${Tween.duration}s ${Tween.ease};

    ${(props) => {
        if (props.isOpen) {
            return css`
                width: 48px;
                height: 48px;
            `;
        } else {
            return css`
                width: 48px;
                height: 48px;
            `;
        }
        return null;
    }}

    img {
        width: 100%;
        height: auto;
    }

    > div {
        position: absolute;
        /* width: 20px;
        height: 20px; */
        left: 30px;
        top: 30px;
        border: 2px solid ${ThemeColor.white};
        border-radius: 50%;
        display: inline-flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        transition: opacity ${Tween.duration}s ${Tween.ease};

        ${(props) => {
            if (props.isOpen) {
                return css`
                    opacity: 1;
                `;
            } else {
                return css`
                    opacity: 0;
                `;
            }
            return null;
        }}

        > button {
            position: relative;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background-color: ${ThemeColor.primary};
            margin: 0px;

            &:hover {
                background-color: ${ThemeColor.primaryLight};
                svg {
                    * {
                        fill: ${ThemeColor.white};
                    }
                }
            }

            svg {
                width: 8px;
                height: 8px;
                * {
                    transition: fill ${Tween.duration}s ${Tween.ease};
                    fill: ${ThemeColor.white};
                }
            }
        }
    }
`;

const LogoutText = styled.div<any>`
    color: ${ThemeColor.lightDangerLine};
    font-size: ${FontSize.md};
    ${(props) => {
        if (props.isOpen) {
            return css`
                display: block;
            `;
        } else {
            return css`
                display: none;
            `;
        }
        return null;
    }}
`;

const LogoutContainer = styled.div`
    display: flex;
    justify-content: start;
    margin-left: 23px;
    margin-bottom: 23px;
    gap: 8px;
`;

const useStyles = makeStyles((theme) => ({
    confirmModal: {
        width: '500px !important',
    },
}));

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    admin?: boolean;
}

const UINavigation: FC<IProps> = (props) => {
    const classes = useStyles();
    const { admin } = props;
    const dispatch = useDispatch();
    const isOpen = useSelector<RootState, boolean>((s) => s.pageState.isOpen);
    const drawerWidth = useSelector<RootState, number>((s) => s.pageState.drawerWidth);
    const isTutor = useSelector<RootState, boolean>((s) => s.profileState.user.isTutor);
    const menu = useSelector<RootState, IMenu[]>((s) => s.menuState.data);
    const [profileType] = useState('student');
    const [profileName] = useState('Andrew Mashaew');
    const [profilePic] = useState('student-2.png');
    const [openConfirmSwitch, setOpenConfirmSwitch] = useState(false);

    const Menu = admin ? menu.slice(6, menu.length + 1) : menu.slice(0, 6);

    const handleDrawerClose = () => {
        const action = createCloseDrawerAction();
        dispatch(action);
    };

    const onCloseConfirmSwitch = () => {
        setOpenConfirmSwitch(false);
    };

    const handleDrawerOpen = () => {
        const action = createOpenDrawerAction();
        dispatch(action);
        console.log(action, 'action');
    };

    const onCancel = () => {
        setOpenConfirmSwitch(false);
    };

    const onConfirm = (userType) => {
        setOpenConfirmSwitch(false);
        dispatch(setUserType(userType));
    };

    const handleUserType = () => {
        setOpenConfirmSwitch(true);
    };

    React.useEffect(() => {
        const resizeWidth = (event) => {
            const width = document.body.clientWidth;
            if (width > Device.tablet) {
                const action = createOpenDrawerAction();
                dispatch(action);
            } else if (width < Device.tablet) {
                const action = createCloseDrawerAction();
                dispatch(action);
            }
        };

        window.addEventListener('resize', resizeWidth);

        // cleanup this component
        return () => {
            window.removeEventListener('resize', resizeWidth);
        };
    }, [dispatch]);

    return (
        <SDrawer
            // ---
            variant="permanent"
            open={isOpen}
            isOpen={isOpen}
            drawerWidth={drawerWidth}
        >
            <Wrapper isOpen={Boolean(isOpen)} drawerWidth={drawerWidth}>
                <UIBox alignItems="center" justifyContent="space-between">
                    <LogoWrapper isOpen={isOpen}>
                        <LogoImage />
                        <LogoTextWrapper isOpen={isOpen}>
                            <LogoText />
                        </LogoTextWrapper>
                    </LogoWrapper>
                    <ControlWrapper isOpen={isOpen} drawerWidth={drawerWidth}>
                        <OpenIconWrapper isOpen={isOpen} onClick={() => handleDrawerOpen()}>
                            <ArrowRightIcon fill={ThemeColor.grey165} className="ico" width={30} height={30} />
                        </OpenIconWrapper>
                        <HideMenuButton isOpen={isOpen} onClick={() => handleDrawerClose()}>
                            <IconWrapper isOpen={isOpen}>
                                <ArrowLeftIcon fill={ThemeColor.grey165} className="ico" width={30} height={30} />
                            </IconWrapper>
                        </HideMenuButton>
                    </ControlWrapper>
                </UIBox>
                {!admin ? (
                    <>
                        <ProfileDetailsWrapper isOpen={Boolean(isOpen)}>
                            <ProfilePic isOpen={Boolean(isOpen)}>
                                <img src={`./assets/image/${profilePic}`} alt={profileType} />
                                <div>
                                    <UIButtonBase>
                                        <EditIcon />
                                    </UIButtonBase>
                                </div>
                            </ProfilePic>
                            <ProfileDetails isOpen={Boolean(isOpen)}>
                                <h4>{profileName}</h4>
                                <UIBadge className="badge" label="Major" style={{ margin: 0 }} />
                            </ProfileDetails>
                        </ProfileDetailsWrapper>

                        <ProfileSwitchWrapper isOpen={isOpen}>
                            <UIButtonBase onClick={() => handleUserType()}>
                                <UserIcon />
                                <span>{isTutor ? 'Tutor' : 'Student'}</span>
                                <UISpacer expand />
                                <LockIcon className="right-icon" />
                            </UIButtonBase>
                        </ProfileSwitchWrapper>
                        <UICustomModal className={classes.confirmModal} open={openConfirmSwitch} onClose={onCloseConfirmSwitch} hideBack title="Switch user profile?" subTitle={`Are you sure you want to switch to your ${isTutor ? 'tutor' : 'student'} profile`}>
                            <IconContainer>
                                <SwitchConfirmIcon />
                            </IconContainer>
                            <ButtonsContainer>
                                <UIButton color="basicline" onClick={onCancel}>
                                    Cancel
                                </UIButton>
                                <UIButton color="second" onClick={() => onConfirm(!isTutor)}>
                                    Confirm
                                </UIButton>
                            </ButtonsContainer>
                        </UICustomModal>
                    </>
                ) : (
                    <UISpacer height={50}></UISpacer>
                )}
                <MenuWrapper>
                    <Scrollbars autoHide style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                        {Menu && Menu.length && <UINavigationMenu data={Menu} isNavOpen={Boolean(isOpen)} onMenuClick={handleDrawerOpen} />}
                    </Scrollbars>
                </MenuWrapper>
                <LogoutContainer>
                    <LogoutIcon />
                    <LogoutText isOpen={isOpen}>Log out</LogoutText>
                </LogoutContainer>
            </Wrapper>
            <SUIBackdrop open={isOpen} />
        </SDrawer>
    );
};

UINavigation.defaultProps = {
    admin: false,
};

export default UINavigation;
