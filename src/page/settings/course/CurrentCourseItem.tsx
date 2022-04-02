import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import UIButtonBase from '../../../ui-kit/button/UIButtonBase';
import UISpacer from '../../../ui-kit/core/UISpacer';
import { BinIcon, EditIcon, HMorelIcon, StatusApprovedIcon, StatusCompletedIcon, StatusHoldIcon, StatusPendingIcon } from '../../../ui-kit/icon/UIIconAssets';
import UITruncateTag from '../../../ui-kit/core/UITruncateTag';
import { Device } from '../../../settings/Device';
import { Tween } from '../../../settings/Tween';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    background-color: ${ThemeColor.white};
    border-bottom: 1px solid ${ThemeColor.border};
    box-sizing: border-box;
    padding: 20px 0px 20px;
    @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
        margin: 0px 0px 0px 0px;
    }
    @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
        margin: 0px 0px 0px 0px;
    }
`;

const Header = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    align-self: stretch;
    margin: 4px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    > div:nth-child(1) {
        display: none;
        flex-direction: column;
        justify-content: flex-start;
        width: 3px;
        background: ${ThemeColor.primary};
        border-radius: 1px;
        align-self: stretch;
        flex: none;
        order: 0;
        flex-grow: 0;
        margin: 0px 12px 0px 0px;
        @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
            margin: 0px 8px 0px 0px;
        }
    }
    > div:nth-child(2) {
        display: inline-flex;
        flex-direction: column;
        justify-content: flex-start;
        > svg {
        }
        > h4 {
            font-weight: ${FontWeight.bold};
            font-size: ${FontSize.md};
            line-height: ${LineHeight.md};
            letter-spacing: ${LetterSpacing.md};
            color: ${ThemeColor.grey45};
            padding: 0px;
            margin: 0px 8px 8px 0px;
            @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
                font-size: ${FontSize.sm};
                line-height: ${LineHeight.md};
            }
            @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
                font-size: ${FontSize.sm};
                line-height: ${LineHeight.md};
            }
        }
    }

    > div:nth-child(4) {
        display: inline-flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-start;
        margin-left: 10px;
        transform: rotate(90deg);

        @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
            margin-left: 2px;
        }

        @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
            margin-left: 2px;
        }

        > button {
            width: 32px;
            background-color: ${ThemeColor.second};
            height: 32px;
            border-radius: 50%;
            margin: 0px;
            &:hover {
                background-color: ${ThemeColor.second};
                svg {
                    * {
                        fill: ${ThemeColor.secondDark};
                    }
                }
            }
            svg {
                * {
                    transition: fill ${Tween.duration}s ${Tween.ease};
                    fill: ${ThemeColor.secondDark};
                }
            }
        }
    }
`;

const Subject = styled.div`
    font-size: ${FontSize.xl};
    color: ${ThemeColor.subtitle};
`;

export const CourseStatusMap = {
    pending: { status: 'pending', desc: 'Pending Tutor Approval', icon: StatusPendingIcon },
    approved: { status: 'approved', desc: 'Approved by the tutor', icon: StatusApprovedIcon },
    hold: { status: 'hold', desc: 'Hold', icon: StatusHoldIcon },
    completed: { status: 'completed', desc: 'Completed', icon: StatusCompletedIcon },
};
export const ProfileType = {
    student: 'student',
    tutor: 'tutor',
};

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    showMenuButton?: boolean;
    title: string;
    totalSessions: number;
    hoursTaught: number;
    tags: Array<any>;
    detailShow?: boolean;
}

const CurrentCourseItem: FC<IProps> = (props) => {
    const { id, showMenuButton, title, totalSessions, hoursTaught, detailShow, tags } = props;
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);

    const list = [
        { label: 'Set Default', value: 'default', icon: EditIcon },
        { label: 'Delete', value: 'delete', icon: BinIcon },
    ];

    return (
        <Wrapper id={id} style={{ width: '100%' }}>
            <Header>
                <div />
                <div>
                    <Subject>{title}</Subject>
                    {detailShow && (
                        <>
                            <UISpacer height={10}></UISpacer>
                            <UITruncateTag max={3} list={tags}></UITruncateTag>
                        </>
                    )}
                </div>
                <UISpacer expand />
                <div>
                    {showMenuButton && (
                        <UIButtonBase onClick={(e) => setMenuAnchorEl(e.target)}>
                            <HMorelIcon />
                        </UIButtonBase>
                    )}
                </div>
            </Header>
        </Wrapper>
    );
};

CurrentCourseItem.defaultProps = {
    showMenuButton: true,
    detailShow: true,
};

export default CurrentCourseItem;
