import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';

import UIButtonBase from '../button/UIButtonBase';
import UISpacer from '../core/UISpacer';
import { BinIcon, EditIcon, HMorelIcon, StatusApprovedIcon, StatusCompletedIcon, StatusHoldIcon, StatusPendingIcon } from '../icon/UIIconAssets';
import UIMenu from '../navigation/menu/UIMenu';
import { Device } from '../../settings/Device';
import { Tween } from '../../settings/Tween';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: stretch;

    box-sizing: border-box;
    border-radius: 13px;
    margin: 15px 0px 0px 0px;
    padding: 0px 15px;
    min-height: 48px;
    background: ${ThemeColor.basic};
    border-radius: 13px;

    @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
        min-height: 36px;
        border-radius: 10px;
    }

    @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
        margin: 10px 0px 0px 0px;
        padding: 0px 10px 0px 10px;

        .tablet-column {
            flex-direction: column;
        }

        .tablet-hidden {
            display: none;
        }
    }
    @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
        margin: 10px 0px 0px 0px;
        padding: 0px 10px 0px 10px;

        .tablet-column {
            flex-direction: column;
        }

        .tablet-hidden {
            display: none;
        }
    }

    @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
        margin: 10px 0px 0px 0px;
        padding: 0px 10px 0px 10px;

        .tablet-column {
            flex-direction: column;
        }

        .tablet-hidden {
            display: none;
        }
    }
`;

const Header = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;

    > div:nth-child(1) {
        display: inline-flex;
        flex-direction: row;
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
            margin: 0px;

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

    > button {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: transparent;
        margin: 0px;

        @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
            margin: 0px;
        }

        @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
            margin: 0px;
        }

        &:hover {
            background-color: ${ThemeColor.primary};
            svg {
                * {
                    fill: ${ThemeColor.white};
                }
            }
        }

        svg {
            * {
                transition: fill ${Tween.duration}s ${Tween.ease};
                fill: ${ThemeColor.grey165};
            }
        }
    }
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

// status: 'pending' | 'approved' | 'hold' | 'completed';
// title: string;
// profileName: string;
// profileType: 'tutor' | 'student';
// message: string;
// meetingLocation: string;
// meetingDate: string;
// meetingTime: string;
// meetingDuration: string;

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    showMenuButton?: boolean;
    major: string;
    course: string;
}

const CurrentClassItem: FC<IProps> = (props) => {
    const { id, major, course } = props;
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const list = [
        { label: 'Edit Session', value: 'edit', icon: EditIcon },
        { label: 'Cancel Session', value: 'cancel', icon: BinIcon },
    ];
    return (
        <Wrapper id={id}>
            <Header>
                <div>
                    <h4>{`${major} ${course}`}</h4>
                </div>
                <UISpacer className="tablet-hidden" width={10} />
                <UIButtonBase onClick={(e) => setMenuAnchorEl(e.target)}>
                    <HMorelIcon />
                </UIButtonBase>
            </Header>

            <UIMenu list={list} anchorEl={menuAnchorEl} onClose={() => setMenuAnchorEl(null)} />
        </Wrapper>
    );
};

CurrentClassItem.defaultProps = {
    showMenuButton: false,
};

export default CurrentClassItem;
