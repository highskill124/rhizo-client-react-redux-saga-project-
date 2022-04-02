import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import UIButtonBase from '../../../ui-kit/button/UIButtonBase';
import UIBadge from '../../../ui-kit/core/UIBadge';
import UIStaticField from '../../../ui-kit/form/UIStaticField';
import UISpacer from '../../../ui-kit/core/UISpacer';
import { BinIcon, CalendarIcon, DurationIcon, EditIcon, HMorelIcon, LocationPinIcon, StatusApprovedIcon, StatusCompletedIcon, StatusHoldIcon, StatusPendingIcon, TimeIcon } from '../../../ui-kit/icon/UIIconAssets';
import UIMenu from '../../../ui-kit/navigation/menu/UIMenu';
import UIButton from '../../../ui-kit/button/UIButton';
import FileStorage from '../../../ui-kit/widget/FileStorage';
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
    border: 1px solid ${ThemeColor.grey229};
    box-sizing: border-box;
    border-radius: 13px;
    margin: 10px 0px 10px 0px;
    padding: 15px 20px 20px;

    @media (max-width: ${Device.mobileMedium - 1}px) {
        border-radius: 10px;
        padding: 15px;
        margin: 15px 0px 0px 0px;
    }

    @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
        border-radius: 10px;
        padding: 15px;
        margin: 15px 0px 0px 0px;
    }
    @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
        border-radius: 10px;
        padding: 15px;
        margin: 15px 0px 0px 0px;
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
    height: 24px;

    > div:nth-child(1) {
        display: inline-flex;
        flex-direction: row;
        justify-content: flex-start;

        > svg {
            margin-top: 1px;
        }

        > h4 {
            font-weight: ${FontWeight.medium};
            font-size: ${FontSize.md};
            line-height: ${LineHeight.md};
            letter-spacing: ${LetterSpacing.md};
            color: ${ThemeColor.grey45};
            padding: 0px;
            margin: 0px 8px 8px 8px;
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

const TutorDetails = styled.div<any>`
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
    height: 38px;

    > div:nth-child(1) {
        width: 38px;
        height: 38px;
        background-color: ${ThemeColor.basic};
        border-radius: 50%50%;
        overflow: hidden;
        img {
            width: 100%;
            height: auto;
        }
    }

    > div:nth-child(2) {
        margin: 0px 12px 0px 12px;
        padding: 0px 10px;

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
`;

const DateTimeWrapper = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 1;
    align-self: stretch;
    overflow: hidden;
    @media (max-width: ${Device.tablet}px) {
        flex-direction: column;
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

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    data: any;
}

const CourseItem: FC<IProps> = (props) => {
    const { id, data } = props;
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const StatusIcon = CourseStatusMap[data.status].icon;
    const list = [
        { label: 'Edit Session', value: 'edit', icon: EditIcon },
        { label: 'Cancel Session', value: 'cancel', icon: BinIcon },
    ];
    return (
        <Wrapper id={id}>
            <Header>
                <div>
                    {<StatusIcon />}
                    <h4>{data.title}</h4>
                </div>
                <div>
                    {data.profileType === ProfileType.tutor && (
                        <>
                            <UIButton color="danger" size="medium">
                                Cancel
                            </UIButton>

                            <UISpacer width={10} />
                            <UIButton size="medium">Approve</UIButton>
                        </>
                    )}
                    {data.profileType === ProfileType.tutor && (
                        <>
                            <UISpacer width={10} />
                            <UIButtonBase onClick={(e) => setMenuAnchorEl(e.target)}>
                                <HMorelIcon />
                            </UIButtonBase>
                        </>
                    )}
                </div>
            </Header>
            <TutorDetails>
                <div>
                    <img src="./assets/image/tutor-1.png" alt="Tutor" />
                </div>
                <div>
                    <div>
                        <h4>{data.profileName}</h4>
                        <UIBadge label="Major" />
                    </div>
                    <span>{data.profileType === ProfileType.tutor ? 'Tutor' : 'Student'}</span>
                </div>
            </TutorDetails>
            <Message>{data.message}</Message>
            {data.profileType === ProfileType.tutor && <FileStorage />}
            <UIStaticField name="address" value={[data.meetingLocation]} icon={<LocationPinIcon />} style={{ margin: 0 }} />
            <UISpacer width={10} height={10} />
            <DateTimeWrapper>
                <UIStaticField name="date" value={[data.meetingDate]} icon={<CalendarIcon />} style={{ margin: 0 }} />
                <UISpacer width={10} height={10} />
                <UIStaticField name="time" value={[data.meetingTime]} icon={<TimeIcon />} style={{ margin: 0 }} />
                <UISpacer width={10} height={10} />
                <UIStaticField name="duration" value={[data.meetingDuration]} icon={<DurationIcon />} style={{ margin: 0 }} />
            </DateTimeWrapper>
            <UIMenu list={list} anchorEl={menuAnchorEl} onClose={() => setMenuAnchorEl(null)} />
        </Wrapper>
    );
};

CourseItem.defaultProps = {};

export default CourseItem;
