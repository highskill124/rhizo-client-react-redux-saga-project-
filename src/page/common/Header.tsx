import React, { FC, ReactNode, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Device } from '../../settings/Device';
import { Tween } from '../../settings/Tween';
import { Depth } from '../../settings/Depth';
import { createOpenDrawerAction, createCloseDrawerAction, PageState } from '../../store/state/PageState';
import UIButtonBase from '../../ui-kit/button/UIButtonBase';
import UIBox from '../../ui-kit/layout/UIBox';
import UISpacer from '../../ui-kit/core/UISpacer';
import UIHeaderMenu from '../../ui-kit/navigation/menu/UIHeaderMenu';
import UISearch from '../../ui-kit/form/UISearch';
import { ArrowBackIcon, ArrowLeftIcon, ArrowRightIcon, ExpandIcon, LogoutIcon, MessageIcon, NavMyCourseIcon, NavSettingsIcon, NotificationIcon, SearchIcon, UniversityIcon, VMoreIcon } from '../../ui-kit/icon/UIIconAssets';
import { RootState } from '../../store/state/RootReducer';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import { HideMenuButton, IconWrapper, ControlWrapper, OpenIconWrapper } from './UINavigation';
import { ReactComponent as LogoImage } from '../../media/image/logo-image.svg';
import { ReactComponent as LogoText } from '../../media/image/logo-text.svg';

const Wrapper = styled.header<any>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${ThemeColor.white};
    position: fixed;
    top: 0;
    left: ${(props) => (props.isNavOpen ? 207 : 63)}px;
    right: 0;
    border: 1px solid ${ThemeColor.border};
    /* width: 100vw; */
    flex: 1;
    max-width: 1440px;
    align-self: stretch;
    height: 60px;
    z-index: ${Depth.appBar};
    transition: background-color ${Tween.duration}s ${Tween.ease}, box-shadow ${Tween.duration}s ${Tween.ease}, left ${Tween.duration}s ${Tween.ease}, width ${Tween.duration}s ${Tween.ease};
    border-right: none;

    ${(props) => {
        if (props.shadow) {
            return css`
                background-color: ${ThemeColor.white};
                box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
            `;
        }
    }}

    @media (max-width: ${Device.mobileLarge}px) {
        left: 0px;
    }
`;

const Title = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex: 1;
    align-self: stretch;
    margin: 0px 8px 0px 8px;
    padding: 0px 0px 0px 0px;
    overflow: hidden;
    flex-wrap: nowrap;
    font-style: normal;
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.md};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    display: none;
    @media (max-width: ${Device.mobileMedium - 1}px) {
        display: flex;
    }
`;

const WrapperLeft = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex: ${(props) => (props.showSearch ? 1 : 'none')};
`;
const WrapperRight = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    flex: none;
`;

const UniversityButtonWrapper = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex: none;
    margin: 0px 24px 0px 0px;
    padding: 0px 0px 0px 0px;
    @media (max-width: 1105px) {
        display: none;
    }
    > button {
        height: 40px;
        border-radius: 10px;
        background-color: ${ThemeColor.second};
        color: ${ThemeColor.secondDark};
        padding: 0px 24px;
        margin: 0px;

        span {
            font-style: normal;
            font-weight: ${FontWeight.medium};
            font-size: ${FontSize.md};
            line-height: ${LineHeight.md};
            letter-spacing: ${LetterSpacing.md};
        }

        svg {
            margin-right: 15px;
            * {
                fill: ${ThemeColor.secondDark};
            }
        }

        &:hover {
            background-color: ${ThemeColor.secondMiddle};
            color: ${ThemeColor.secondDark};
        }
    }
`;

const NoteButtonWrapper = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-start;
    border-color: ${ThemeColor.white};
    flex: none;
    flex-grow: 0;
    margin: 0px 24px 0px 0px;
    padding: 0px 0px 0px 0px;
    width: 24px;
    height: 24px;

    @media (max-width: ${Device.tablet - 1}px) {
        display: none;
    }

    > button {
        width: 24px;
        height: 24px;
        border-radius: 10px;
        background-color: transparent;
        color: ${ThemeColor.white};
        padding: 0px 0px;
        margin: 0px 0px;
        position: relative;

        div {
            position: absolute;
            top: 0px;
            right: 0px;
            width: 9px;
            height: 9px;
            background: ${ThemeColor.danger};
            border: 2px solid ${ThemeColor.white};
            border-radius: 50%;
        }

        svg {
            * {
                transition: fill ${Tween.duration}s ${Tween.ease};
                fill: ${ThemeColor.grey197};
            }
        }

        &:hover {
            background-color: transparent;
            svg {
                * {
                    fill: ${ThemeColor.primary};
                }
            }
        }
    }
`;

const ProfileWrapper = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-color: ${ThemeColor.white};
    margin: 0px 20px 0px 0px;
    padding: 0px 0px 0px 0px;

    @media (max-width: ${Device.tablet}px) {
        > div:nth-child(3) button {
            display: none;
        }
    }

    > div:nth-child(1) {
        width: 34px;
        height: 34px;
        border-radius: 16px;
        overflow: hidden;
        img {
            width: 100%;
            height: auto;
        }
    }

    > div:nth-child(2) {
        > button {
            width: 18px;
            height: 18px;
            background: ${ThemeColor.white};
            border-radius: 4px;
            padding: 0px 0px;
            padding-left: 5px;
            margin: 0px 0px;
            position: relative;

            svg {
                * {
                    transition: fill ${Tween.duration}s ${Tween.ease};
                    fill: ${ThemeColor.grey104};
                }
            }

            &:hover {
                background-color: transparent;
                svg {
                    * {
                        fill: ${ThemeColor.primary};
                    }
                }
            }
        }
    }
`;

const MoreButtonWrapper = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-color: ${ThemeColor.white};
    margin: 0px 8px 0px 0px;
    padding: 0px 0px 0px 0px;
    display: none;

    > button {
        width: 32px;
        height: 32px;
        background: ${ThemeColor.basic};
        border-radius: 16px;
        padding: 0px 0px;
        margin: 0px 0px;
        position: relative;

        svg {
            width: 24px;
            height: 24px;
            * {
                transition: fill ${Tween.duration}s ${Tween.ease} stroke ${Tween.duration}s ${Tween.ease};
                stroke: ${ThemeColor.grey104};
                fill: ${ThemeColor.grey104};
            }
        }

        &:hover {
            background-color: ${ThemeColor.primary};
            svg {
                * {
                    stroke: ${ThemeColor.white};
                    fill: ${ThemeColor.white};
                }
            }
        }
    }
`;

const BackButtonWrapper = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-color: ${ThemeColor.white};
    margin: 0px 8px 0px 0px;
    padding: 0px 0px 0px 0px;

    @media (min-width: ${Device.tablet + 1}px) {
        display: none;
    }

    > button {
        width: 32px;
        height: 32px;
        background: ${ThemeColor.white};
        border-radius: 16px;
        padding: 0px 0px;
        margin: 0px 0px;
        position: relative;

        svg {
            width: 24px;
            height: 24px;
            * {
                transition: stroke ${Tween.duration}s ${Tween.ease};
                stroke: ${ThemeColor.grey104};
            }
        }

        &:hover {
            background-color: ${ThemeColor.primary};
            svg {
                * {
                    stroke: ${ThemeColor.white};
                }
            }
        }
    }
`;

const SearchButtonWrapper = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-color: ${ThemeColor.white};
    margin: 0px 8px 0px 0px;
    padding: 0px 0px 0px 0px;

    @media (min-width: ${Device.tablet + 1}px) {
        display: none;
    }

    > button {
        width: 32px;
        height: 32px;
        background-color: ${ThemeColor.white};
        border-radius: 16px;
        padding: 0px 0px;
        margin: 0px 0px;
        position: relative;

        svg {
            width: 16px;
            height: 16px;
            * {
                transition: fill ${Tween.duration}s ${Tween.ease};
                fill: ${ThemeColor.grey104};
            }
        }

        &:hover {
            background-color: ${ThemeColor.primary};
            svg {
                * {
                    fill: ${ThemeColor.white};
                }
            }
        }
    }
`;

const UIDiv = styled.div`
    display: none;
    align-items: center;
    @media (max-width: ${Device.mobileLarge}px) {
        display: flex;
    }
    > div:nth-child(1) {
        justify-content: center;
        border-right: 1px solid ${ThemeColor.border};
    }
`;

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
}

const Header: FC<IProps> = (props) => {
    const [shadow, setShadow] = useState(false);

    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const isTutor = useSelector<RootState, boolean>((s) => s.profileState.user.isTutor);
    const pageState = useSelector<RootState, PageState>((s) => s.pageState);

    const list = [
        { label: 'Settings', value: 'edit', icon: NavSettingsIcon },
        { label: 'Log out', value: 'logout', icon: LogoutIcon },
    ];

    const moreList = [
        { label: 'My Course', value: 'my-course', icon: NavMyCourseIcon },
        { label: 'Change University', value: 'logout', icon: UniversityIcon },
        { label: 'Settings', value: 'edit', icon: NavSettingsIcon },
        { label: 'Log out', value: 'logout', icon: LogoutIcon },
    ];

    const handleScroll = () => {
        const scroll = document.documentElement.scrollTop;
        if (scroll > 74) {
            setShadow(true);
        } else {
            setShadow(false);
        }
    };

    useEffect(() => {
        window.onscroll = () => handleScroll();
    }, []);

    const isOpen = useSelector<RootState, boolean>((s) => s.pageState.isOpen);
    const handleDrawerClose = () => {
        const action = createCloseDrawerAction();
        dispatch(action);
    };

    const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        const action = createOpenDrawerAction();
        dispatch(action);
    };

    return (
        <Wrapper shadow={shadow} drawerWidth={pageState.drawerWidth} isNavOpen={pageState.isOpen}>
            <WrapperLeft showSearch={showSearch}>
                <UIDiv>
                    <ControlWrapper isOpen={isOpen} drawerWidth={208}>
                        <OpenIconWrapper isOpen={isOpen} onClick={() => handleDrawerOpen()}>
                            <ArrowRightIcon fill={ThemeColor.grey165} className="ico" width={30} height={30} />
                        </OpenIconWrapper>
                        <HideMenuButton isOpen={isOpen} onClick={() => handleDrawerClose()}>
                            <IconWrapper isOpen={isOpen}>
                                <ArrowLeftIcon fill={ThemeColor.grey165} className="ico" width={30} height={30} />
                            </IconWrapper>
                        </HideMenuButton>
                    </ControlWrapper>
                    {!showSearch && (
                        <UIBox alignItems="center" style={{ zoom: '0.7', paddingLeft: '20px' }}>
                            <LogoImage />
                            <UISpacer width={7}></UISpacer>
                            <LogoText />
                        </UIBox>
                    )}
                </UIDiv>
                {!isTutor && (
                    <>
                        <UISearch id="search" show={showSearch} block={showSearch} />
                    </>
                )}
            </WrapperLeft>

            {!showSearch && <Title>Landing</Title>}

            <WrapperRight>
                <UniversityButtonWrapper>
                    <UIButtonBase>
                        <UniversityIcon />
                        <span>Harvard University</span>
                    </UIButtonBase>
                </UniversityButtonWrapper>
                {showSearch && (
                    <BackButtonWrapper>
                        <UIButtonBase onClick={(e) => setShowSearch(false)}>
                            <ArrowBackIcon />
                        </UIButtonBase>
                    </BackButtonWrapper>
                )}
                {!showSearch && !isTutor && (
                    <SearchButtonWrapper>
                        <UIButtonBase onClick={(e) => setShowSearch(true)}>
                            <SearchIcon />
                        </UIButtonBase>
                    </SearchButtonWrapper>
                )}
                {!showSearch && (
                    <NoteButtonWrapper>
                        <UIButtonBase>
                            <MessageIcon />
                            <div />
                        </UIButtonBase>
                    </NoteButtonWrapper>
                )}
                {!showSearch && (
                    <NoteButtonWrapper>
                        <UIButtonBase>
                            <NotificationIcon />
                            <div />
                        </UIButtonBase>
                    </NoteButtonWrapper>
                )}
                {!showSearch && (
                    <ProfileWrapper>
                        <div>
                            <img src="./assets/image/student-2.png" alt="student" />
                        </div>
                        <div>
                            <UIButtonBase onClick={(e) => setMenuAnchorEl(e.target)}>
                                <ExpandIcon />
                            </UIButtonBase>
                        </div>
                    </ProfileWrapper>
                )}
                {!showSearch && (
                    <MoreButtonWrapper>
                        <UIButtonBase onClick={(e) => setMoreMenuAnchorEl(e.target)}>
                            <VMoreIcon />
                        </UIButtonBase>
                    </MoreButtonWrapper>
                )}
            </WrapperRight>

            <UIHeaderMenu list={list} anchorEl={menuAnchorEl} onClose={() => setMenuAnchorEl(null)} />

            <UIHeaderMenu list={moreList} anchorEl={moreMenuAnchorEl} onClose={() => setMoreMenuAnchorEl(null)} />
        </Wrapper>
    );
};

Header.defaultProps = {};

export default Header;
