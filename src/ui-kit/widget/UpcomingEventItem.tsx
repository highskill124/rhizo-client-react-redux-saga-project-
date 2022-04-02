import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import UIButtonBase from '../button/UIButtonBase';
import UIBadge from '../core/UIBadge';
import UIStaticField from '../form/UIStaticField';
import UIBox from '../layout/UIBox';
import UISpacer from '../core/UISpacer';
import { BinIcon, CalendarIcon, DurationIcon, EditIcon, HMorelIcon, StatusApprovedIcon, StatusCompletedIcon, StatusHoldIcon, StatusPendingIcon, TimeIcon } from '../icon/UIIconAssets';
import UIMenu from '../navigation/menu/UIMenu';
import UIButton from '../button/UIButton';
import { Device } from '../../settings/Device';
import { Tween } from '../../settings/Tween';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    background-color: ${ThemeColor.white};
    border: 1px solid ${ThemeColor.grey229};
    box-sizing: border-box;
    border-radius: 13px;
    margin: 15px 0px 0px 0px;
    padding: 15px 20px 20px;

    @media (max-width: ${Device.tablet}px) {
        margin: 10px 0px 0px 0px;
        padding: 15px;
        border-radius: 10px;

        .tablet-column {
            flex-direction: column;
        }

        .tablet-hidden {
            display: none;
        }

        button {
            margin-top: 10px;
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
    margin: 4px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    min-height: 24px;

    > div:nth-child(1) {
        display: inline-flex;
        flex-direction: row;
        justify-content: flex-start;

        > svg {
            width: 14px;
            height: 14px;
        }

        > h4 {
            font-weight: ${FontWeight.medium};
            font-size: ${FontSize.md};
            line-height: ${LineHeight.md};
            letter-spacing: ${LetterSpacing.md};
            color: ${ThemeColor.grey45};
            padding: 0px;
            margin: 0px 8px 8px 8px;
            @media (max-width: ${Device.tablet}px) {
                margin: 0px 0px 0px 8px;
                font-size: ${FontSize.md};
                line-height: ${LineHeight.md};
            }
        }
    }

    > div:nth-child(2) {
        display: inline-flex;
        flex-direction: row;
        justify-content: flex-end;

        > button {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: ${ThemeColor.white};

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
    }
`;

const UserDetails = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-color: ${ThemeColor.white};
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    margin: 8px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    min-height: 38px;

    > div:nth-child(1) {
        width: 38px;
        height: 38px;
        background-color: ${ThemeColor.basic};
        border-radius: 50%50%;
        overflow: hidden;
        flex: none;
        flex-shrink: 0;
        img {
            width: 100%;
            height: auto;
        }
    }

    > div:nth-child(2) {
        margin: 0px 12px 0px 12px;
        padding: 0px 10px;

        @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
            margin: 0px 0px 0px 0px;
            padding: 0px 8px;
        }

        > div {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            > h4 {
                font-weight: ${FontWeight.medium};
                font-size: ${FontSize.md};
                line-height: ${LineHeight.md};
                letter-spacing: ${LetterSpacing.md};
                color: ${ThemeColor.grey45};
                margin: 0px;
                padding: 0px;

                @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
                    margin: 0px 0px 0px 0px;
                    font-size: ${FontSize.sm};
                    line-height: ${LineHeight.md};
                }
                @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
                    margin: 0px 0px 0px 0px;
                    font-size: ${FontSize.sm};
                    line-height: ${LineHeight.md};
                }
            }
        }
        > span {
            font-weight: ${FontWeight.medium};
            font-size: ${FontSize.sm};
            line-height: ${LineHeight.md};
            letter-spacing: ${LetterSpacing.md};
            color: ${ThemeColor.grey104};
            margin: 3px 0px 0px 0px;
        }
    }
`;

const Message = styled.div<any>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    font-style: normal;
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.md};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.grey104};
    align-self: stretch;
    flex-grow: 0;
    margin: 15px 0px;
    flex: none;
    @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
        font-size: ${FontSize.sm};
        line-height: ${LineHeight.md};
    }
    @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
        font-size: ${FontSize.sm};
        line-height: ${LineHeight.md};
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
    status: string;
    title: string;
    userName: string;
    userType: string;
    message: string;
    meetingDate: string;
    meetingTime: string;
    meetingDuration: string;
}

const UpcomingEventItem: FC<IProps> = (props) => {
    const { id, showMenuButton, status, title, userName, userType, message, meetingDate, meetingTime, meetingDuration } = props;
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    // const menuButtonRef = useRef<HTMLButtonElement>(null);
    const StatusIcon = CourseStatusMap[status].icon;

    const menuList = [
        { label: 'Edit Session', value: 'edit', icon: EditIcon },
        { label: 'Cancel Session', value: 'cancel', icon: BinIcon },
    ];

    return (
        <Wrapper id={id}>
            <Header>
                <div>
                    {<StatusIcon />}
                    <h4>{title}</h4>
                </div>
                <div>
                    {showMenuButton && (
                        <>
                            <UISpacer width={10} />
                            <UIButtonBase onClick={(e) => setMenuAnchorEl(e.target)}>
                                <HMorelIcon />
                            </UIButtonBase>
                        </>
                    )}
                </div>
            </Header>
            <UserDetails>
                <div>
                    <img src="./assets/image/tutor-1.png" alt="Tutor" />
                </div>
                <div>
                    <div>
                        <h4>{userName}</h4>
                        <UIBadge label="Major" />
                    </div>
                    <span>{userType === ProfileType.tutor ? 'Tutor' : 'Student'}</span>
                </div>
            </UserDetails>

            <Message>{message}</Message>
            <UIBox direction="row">
                <UIStaticField name="date" value={[meetingDate]} icon={<CalendarIcon />} style={{ margin: 0 }} />
            </UIBox>
            <UISpacer height={10} />

            <UIBox className="tablet-column" direction="row">
                <UIStaticField name="time" value={[meetingTime]} icon={<TimeIcon />} style={{ margin: 0 }} />
                <UISpacer width={10} height={10} />
                <UIStaticField name="duration" value={[meetingDuration]} icon={<DurationIcon />} style={{ margin: 0 }} />
            </UIBox>
            <UISpacer className="tablet-hidden" height={10} />

            <UIBox direction="row">
                <UIButton block onClick={() => {}}>
                    Join Session
                </UIButton>
            </UIBox>

            <UIMenu list={menuList} anchorEl={menuAnchorEl} onClose={() => setMenuAnchorEl(null)} />
        </Wrapper>
    );
};

UpcomingEventItem.defaultProps = {
    showMenuButton: false,
};

export default UpcomingEventItem;
