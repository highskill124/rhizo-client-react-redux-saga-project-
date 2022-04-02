import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import UIButton from '../button/UIButton';
import UIButtonBase from '../button/UIButtonBase';
import UIBadge from '../core/UIBadge';
import UISpacer from '../core/UISpacer';
import UITruncateTag from '../core/UITruncateTag';
import UIStaticField from '../form/UIStaticField';
import { CalendarIcon, DurationIcon, ExpandIcon, ShrinkIcon, StatusVerifiedIcon, TimeIcon } from '../icon/UIIconAssets';
import UIBox from '../layout/UIBox';
import FileStorage from './FileStorage';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    margin: 15px 0px 0px 0px;
`;

const ContentWrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 13px 12px 15px;
    background: ${ThemeColor.white};
    border: 1px solid ${ThemeColor.grey229};
    box-sizing: border-box;
    border-radius: 13px;
    /* flex: none; */
    flex: 1;
    align-items: stretch;
    /* flex-grow: 0; */
    /* width: auto; */
    /* max-width: calc(100% - 64px); */
    /* max-width: 100%; */
    > div:nth-child(1) {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        flex-grow: 0;
        margin: 6px 0px;
        flex-wrap: wrap;
        h4 {
            font-style: normal;
            font-weight: ${FontWeight.bold};
            font-size: ${FontSize.md};
            line-height: ${LineHeight.md};
            letter-spacing: ${LetterSpacing.md};
            color: ${ThemeColor.grey45};
            margin: 0px 10px 0px 0px;
        }

        > button {
            width: 22px;
            height: 22px;
            border-radius: 8px;
            background-color: ${ThemeColor.primary};
            color: ${ThemeColor.white};
            padding: 0px 4px;
            &:hover {
                background-color: ${ThemeColor.primary};
            }
        }
    }
`;

export const Label = styled.span`
    font-style: normal;
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.md};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.grey45};
    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 10px 0px;
    user-select: none;
    margin: 10px 0px;
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
    margin-bottom: 15px;
    flex: none;
`;

const StudentDetails = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-color: ${ThemeColor.white};
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    height: 46px;

    > div:nth-child(1) {
        width: 46px;
        height: 46px;
        background-color: ${ThemeColor.basic};
        border-radius: 50%50%;
        overflow: hidden;
        img {
            width: 100%;
            height: auto;
        }
    }

    > div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        margin: 0px 12px 0px 5px;
        padding: 0px 10px;
        height: 46px;

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

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    title: string;
    tags: Array<any>;
    // ---
    meetingLocation: string;
    meetingDate: string;
    meetingTime: string;
    meetingDuration: string;
    message: string;
    studentName: string;
}

const TutorSessionApprovalItem: FC<IProps> = (props) => {
    const { id, title, tags, meetingDate, meetingTime, meetingDuration, message, studentName } = props;
    const [open, setOpen] = useState(false);
    return (
        <Wrapper id={id}>
            <ContentWrapper>
                <div>
                    <h4>{title}</h4>
                    <UITruncateTag list={tags}></UITruncateTag>
                    <UISpacer expand />
                    <UIButtonBase onClick={(e) => setOpen(!open)}>{open ? <ExpandIcon /> : <ShrinkIcon />}</UIButtonBase>
                </div>
                <UIBox direction="row">
                    <UIStaticField name="date" value={[meetingDate]} icon={<CalendarIcon />} style={{ margin: 0 }} />
                    <UISpacer width={10} />
                    <UIStaticField name="time" value={[meetingTime]} icon={<TimeIcon />} style={{ margin: 0 }} />
                    <UISpacer width={10} />
                    <UIStaticField name="duration" value={[meetingDuration]} icon={<DurationIcon />} style={{ margin: 0 }} />
                </UIBox>
                {open && (
                    <UIBox direction="column">
                        <Label>Meeting</Label>
                        <UIBox justifyContent="row">
                            <UIButton color="info">Zoom meeting</UIButton>
                            <UISpacer width={10} />
                            <UIButton color="info">Google meeting</UIButton>
                        </UIBox>
                        <Label>Comment</Label>
                        <Message>{message}</Message>
                        <FileStorage />
                        <Label>Student</Label>
                        <StudentDetails>
                            <div>
                                <img src="./assets/image/student-1.png" alt="Student" />
                            </div>
                            <div>
                                <div>
                                    <h4>{studentName}</h4>
                                    <UISpacer width={5} />

                                    {<StatusVerifiedIcon />}
                                </div>
                                <UIBadge label="Major" style={{ marginLeft: 0 }} />
                            </div>
                            <UISpacer expand />
                            <UIBox direction="row">
                                <UIButton color="danger">Reject</UIButton>
                                <UISpacer width={10} />
                                <UIButton color="primary">Approve</UIButton>
                            </UIBox>
                        </StudentDetails>
                    </UIBox>
                )}
                <UISpacer height={5} />
            </ContentWrapper>
        </Wrapper>
    );
};

TutorSessionApprovalItem.defaultProps = {};

export default TutorSessionApprovalItem;
