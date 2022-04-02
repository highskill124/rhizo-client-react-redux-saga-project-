import React, { FC, ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IMenu } from '../../store/dto/IMenu';
import { ArrowRightIcon, NavHomeIcon, NavMyCourseIcon, NavMySessionIcon, NavSettingsIcon, NavUpcomingSessionIcon, UniversityIcon, MessageIcon, NotificationIcon } from '../../ui-kit/icon/UIIconAssets';
import { NodeUtil } from '../../util/node-util';
import { createCloseDrawerAction, createOpenDrawerAction } from '../../store/state/PageState';
import { Tween } from '../../settings/Tween';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import UIDevider from '../../ui-kit/core/UIDevider';
import UISpacer from '../../ui-kit/core/UISpacer';
import { Device } from '../../settings/Device';

const duration = 0.25;
const menuHeight = 42;
const iconMaxSize = 24;

const Wrapper = styled.div`
    display: flex;
    flex: 1 100%;
    flex-direction: column;
    background-color: ${ThemeColor.white};
`;

const MenuItem = styled.div<any>`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Div = styled.div`
    baackground-color: red;
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent;
    }
`;

const HighlightBar = styled.div`
    position: absolute;
    right: 0px;
    top: 10px;
    bottom: 10px;
    display: flex;
    flex-direction: row;
    width: 3px;
    height: 22px;
    background-color: ${ThemeColor.primary};
    border-radius: 3px 0px 0px 3px;
    pointer-events: none;
`;
const HighlightArea = styled.div`
    position: absolute;
    left: 0px;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    width: calc(100% - 0px);
    height: 42px;
    pointer-events: none;
    background-color: rgba(94, 198, 157, 0.1);
`;

const IconWrapper = styled.div<any>`
    position: relative;
    display: ${({ level }) => (level === 0 ? 'flex' : 'none')};
    flex: 0 0 42px;
    height: 42px;
    width: 42px;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    z-index: 3;

    > svg {
        width: ${iconMaxSize}px;
        height: ${iconMaxSize}px;
        * {
            fill: ${ThemeColor.grey165};
        }
    }
`;

const AdminWrapper = styled.div<any>`
    position: relative;
    display: ${({ level }) => (level === 0 ? 'flex' : 'none')};
    flex: 0 0 0px;
    height: 15px;
    width: 15px;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    z-index: 3;

    > svg {
        width: ${iconMaxSize}px;
        height: ${iconMaxSize}px;
        * {
            fill: ${ThemeColor.grey165};
        }
    }
`;

const ContentWrapper = styled.div<any>`
    display: flex;
    cursor: pointer;
    overflow: hidden;
    flex: 0 0 100%;
    height: 42px;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    margin-left: ${(props) => (props.isNavOpen ? 12 : 12)}px;
    transition: margin-left ${duration}s ${Tween.ease};
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
    }
    & > .highlight-bar {
        z-index: 1;
        opacity: 0;
    }

    & > .highlight-area {
        z-index: 2;
        opacity: 0;
    }

    &:hover {
        & > .highlight-area {
            opacity: 1;
        }
        > .label {
            color: ${ThemeColor.primary};
        }
        svg {
            * {
                fill: ${ThemeColor.primary};
            }
        }
    }

    ${(props) => {
        if (props.selected) {
            return css`
                > .label {
                    color: ${ThemeColor.primary};
                }
                svg {
                    * {
                        fill: ${ThemeColor.primary};
                    }
                }
                & > .highlight-bar {
                    z-index: 1;
                    opacity: 1;
                }
            `;
        }
        return null;
    }}
`;

const TextWrapper = styled.div<any>`
    display: flex;
    flex: 1 1 100%;
    height: 42px;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    z-index: 4;
    font-style: normal;
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.md};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.grey165};
    transition: opacity ${Tween.duration}s ${Tween.ease};
    opacity: ${(props) => (props.isNavOpen ? 1 : 0)};
    user-select: none;
`;

const StatusWrapper = styled.div<any>`
    display: ${(props) => (props.nodes && props.nodes.length ? 'flex' : 'none')};
    flex: 0 0 32px;
    height: 42px;
    width: 32px;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    z-index: 5;
    width: ${(props) => (props.isNavOpen ? '32' : '0')}px;
    display: ${(props) => (props.isNavOpen ? 'flex' : 'none')};
    opacity: ${(props) => (props.nodes && props.nodes.length > 0 ? 1 : 0)};
    > svg {
        width: 24px;
        height: 24px;
        transition: transform ${duration}s ${Tween.ease};
        transform: ${(props) => (props.open ? 'rotate(90deg)' : 'rotate(0deg)')};
    }
`;

const NodeWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 0px;
    transition: height ${duration}s ${Tween.ease};
    background-color: rgba(0, 0, 0, 0.07);
    overflow: hidden;
`;

const Messages = styled.div`
    background-color: ${ThemeColor.dangerBack};
    padding: 2px;
    width: 20px;
    height: 20px;
    text-align: center;
    border-radius: 50%;
    color: ${ThemeColor.lightDangerLine};
`;

const SmallMessages = styled.div<any>`
    ${(props) => {
        if (props.isNavOpen) {
            return css`
                opacity: 0;
            `;
        } else {
            return css`
                opacity: 1;
                transition: 0.5s;
            `;
        }
        return null;
    }}
    position: absolute;
    background-color: ${ThemeColor.dangerBack};
    padding: 2px;
    width: 20px;
    height: 20px;
    text-align: center;
    border-radius: 50%;
    left: 20px;
    top: 0px;
    color: ${ThemeColor.lightDangerLine};
`;

const Space = styled.div`
    width: 15px;
    height: 15px;
    display: hidden;
`;

const NavIconMap = {
    HomeIcon: NavHomeIcon,
    MySessionIcon: NavMySessionIcon,
    UpcomingSessionIcon: NavUpcomingSessionIcon,
    MyCourseIcon: NavMyCourseIcon,
    SettingsIcon: NavSettingsIcon,
    UniversityIcon,
    MessageIcon,
    NotificationIcon,
};
interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    data: IMenu[];
    isNavOpen: boolean;
    onMenuClick: () => void;
}

const UINavigationMenu: FC<IProps> = (props) => {
    const dispatch = useDispatch();
    const { id, data, isNavOpen, onMenuClick } = props;
    const [menu, setMenu] = useState([...data]);
    const [selectedMenu, setSelectedMenu] = useState(menu[0]);
    const history = useHistory();

    // window.addEventListener('resize', function (event) {
    //     const width = document.body.clientWidth;
    //     if (width > Device.tablet) {
    //         handleDrawerOpen();
    //     }
    // });

    const onMenuItemClick = (node) => {
        const map = NodeUtil.toNodeMap(menu);
        history.push(node.url);
        setSelectedMenu(node);

        if (!isNavOpen && !node.open && node.level === 0) {
            return onMenuClick();
        }
        const width = document.body.clientWidth;

        if (isNavOpen && width < Device.tablet) {
            const action = createCloseDrawerAction();
            dispatch(action);
        } else if (!isNavOpen) {
            const action = createOpenDrawerAction();
            dispatch(action);
        }

        if (node.open) {
            Object.keys(map).map((x) => {
                if (map[x].id === node.id) {
                    map[x].open = !map[x].open;
                }
                return x;
            });
        } else {
            Object.keys(map).map((x) => {
                if (map[x].id === node.id) {
                    map[x].open = !map[x].open;
                }
            });
        }
        const list = NodeUtil.toNodeList(map);

        setMenu(list);
    };

    const calcHeight = (node) => {
        let h = 0;
        if (node && node.open && node.nodes) {
            h += node.nodes.length * menuHeight;
            node.nodes.map((x) => {
                h += calcHeight(x);
            });
        }
        return h;
    };

    const renderMenu = (nodes: any) => {
        return nodes.map((child: any) => {
            const Icon = NavIconMap[child.icon];
            return (
                <Div key={child.id}>
                    <MenuItem
                        key={child.id}
                        isNavOpen={isNavOpen}
                        selected={selectedMenu.id === child.id}
                        onClick={(e: any) => {
                            e.stopPropagation();
                            onMenuItemClick(child);
                        }}
                    >
                        <ContentWrapper selected={selectedMenu.id === child.id} isNavOpen={isNavOpen} level={child.level}>
                            <HighlightBar className="highlight-bar" />
                            <HighlightArea className="highlight-area" />
                            {child.icon ? (
                                <IconWrapper level={child.level} isNavOpen={isNavOpen}>
                                    {<Icon />}
                                    {(child.label === 'Messages' || child.label === 'Notifications') && <SmallMessages isNavOpen={isNavOpen}>{child.unreadMessages}</SmallMessages>}
                                </IconWrapper>
                            ) : (
                                <AdminWrapper level={child.level} isNavOpen={isNavOpen}>
                                    <Space />
                                    {child.label === 'Chat Log' && <SmallMessages isNavOpen={isNavOpen}>{child.unreadMessages}</SmallMessages>}
                                </AdminWrapper>
                            )}
                            <TextWrapper className="label" isNavOpen={isNavOpen}>
                                {child.label}
                                {(child.label === 'Messages' || child.label === 'Notifications' || child.label === 'Chat Log') && <Messages>{child.unreadMessages}</Messages>}
                            </TextWrapper>
                            <StatusWrapper isNavOpen={isNavOpen} {...child}>
                                <ArrowRightIcon fill={ThemeColor.white} />
                            </StatusWrapper>
                        </ContentWrapper>
                        <NodeWrapper style={{ height: isNavOpen ? calcHeight(child) : 0 }}>{child.nodes && child.nodes.length ? renderMenu(child.nodes) : null}</NodeWrapper>
                    </MenuItem>
                    {child.label === 'Messages' && (
                        <>
                            <UIDevider />
                            <UISpacer height={20}></UISpacer>
                        </>
                    )}
                </Div>
            );
        });
    };

    return <Wrapper id={id}>{menu && renderMenu(menu)}</Wrapper>;
};

UINavigationMenu.defaultProps = {
    data: [],
    isNavOpen: false,
    onMenuClick: () => {},
};

export default UINavigationMenu;
