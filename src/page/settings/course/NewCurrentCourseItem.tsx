import React, { FC, ReactNode, useState, useRef } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import usePagination from '../../../ui-kit/core/UIPagination';
import UIButtonBase from '../../../ui-kit/button/UIButtonBase';
import UIBox from '../../../ui-kit/layout/UIBox';
import UISpacer from '../../../ui-kit/core/UISpacer';
import { BinIcon, ReviewIcon, EditIcon, HMorelIcon, StatusApprovedIcon, StatusCompletedIcon, StatusHoldIcon, StatusPendingIcon } from '../../../ui-kit/icon/UIIconAssets';
import UIMenu from '../../../ui-kit/navigation/menu/UIMenu';
import UITruncateTag from '../../../ui-kit/core/UITruncateTag';
import UITooltip from '../../../ui-kit/core/UITooltip';
import UIDevider from '../../../ui-kit/core/UIDevider';
import UIDrawer from '../../../ui-kit/core/UIDrawer';
import UIUserProfile from '../../../ui-kit/core/UIUserProfile';
import UIPaginations from '../../../ui-kit/core/UIPaginations';
import SessionRatings from '../../../ui-kit/core/NewUIRating';
import { Device } from '../../../settings/Device';
import { Tween } from '../../../settings/Tween';
import { studentReview } from '../../../page/mysession/temp-data/review';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    align-self: stretch;
    background-color: ${ThemeColor.white};
    border: 1px solid ${ThemeColor.grey229};
    box-sizing: border-box;
    border-radius: 10px;
    margin: 15px 0px 0px 0px;
    padding: 15px 20px 20px;
    box-shadow: 4px 3px 10px -1px rgba(0, 0, 0, 0.07);

    @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
        margin: 15px 0px 0px 0px;
        padding: 8px 8px 8px 8px;
    }

    @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
        margin: 15px 0px 0px 0px;
        padding: 8px 8px 8px 8px;
    }
`;

const Header = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 1;
    align-self: stretch;
    margin: 4px 0px 0px 0px;
    padding: 0px 0px 0px 0px;

    > div:nth-child(2) {
        display: inline-flex;
        flex-direction: column;
        justify-content: flex-start;

        > svg {
        }

        > h4 {
            font-weight: ${FontWeight.regular};
            font-size: ${FontSize.sm};
            line-height: ${LineHeight.md};
            letter-spacing: ${LetterSpacing.md};
            color: ${ThemeColor.subtitle};
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

        @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
            margin-left: 2px;
        }

        @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
            margin-left: 2px;
        }

        > button {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: ${ThemeColor.white};
            margin: 0px;

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

const Div = styled.div`
    display: inline-flex;
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
`;

const Details = styled.div<any>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    flex-grow: 0;
    margin: 5px 15px 0px 0px;
    flex: 1;

    h4 {
        font-style: normal;
        font-weight: ${FontWeight.medium};
        font-size: ${FontSize.sm};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.grey104};
        flex: none;
        flex-grow: 0;
        opacity: 0.5;
        margin: 3px 0px;
    }

    p {
        font-family: Roboto;
        font-style: normal;
        font-weight: ${FontWeight.bold};
        font-size: ${FontSize.xl};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.subtitle};
        flex: none;
        flex-grow: 0;
        margin: 3px 0px 0px 0px;
    }
`;

const Title = styled.p`
    font-size: ${FontSize.xl};
    color: ${ThemeColor.subtitle};
    margin: 0;
    margin-bottom: 5px;
    cursor: pointer;
`;

const DisputeLabel = styled.p`
    margin: 0;
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.xl};
    font-weight: ${FontWeight.medium};
    margin: 20px 0 0;
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

const Content = styled.p`
    font-size: ${FontSize.lg};
    margin-top: 10px;
    color: ${ThemeColor.subtitle};
    margin-bottom: 0;
    padding-left: 40px;
`;

const Course = styled.div`
    padding: 2px 6px;
    font-size: ${FontSize.xs};
    color: ${ThemeColor.secondDark};
    background-color: ${ThemeColor.second};
    border-radius: 12px;
    white-space: nowrap;
    &:hover {
        background-color: ${ThemeColor.secondMiddle};
    }
`;

const Description = styled.p`
    font-size: ${FontSize.label};
    color: ${ThemeColor.subtitle};
    font-weight: ${FontWeight.regular};
    line-height: 150%;
    letter-spacing: 0.01em;
`;

const ModalTutorDetails = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-color: ${ThemeColor.white};
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    margin: 8px 0px 0px 0px;
    padding: 0px 0px 0px 40px;
    height: 38px;

    > div:nth-child(1) {
        width: 38px;
        height: 38px;
        background-color: ${ThemeColor.basic};
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
        img {
            width: 100%;
            height: auto;
        }
    }

    > div:nth-child(2) {
        margin: 0px 12px 0px 12px;
        padding: 0;

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
                color: ${ThemeColor.subtitle};
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

const Review = styled.div`
    font-size: ${FontSize.sm};
    color: ${ThemeColor.subtitle};
`;

const CommentHeader = styled.div`
    font-size: ${FontSize.md};
    color: ${ThemeColor.subtitle};
    font-weight: ${FontWeight.medium};
`;

const Tags = ['Robots', 'Technics', 'Physics', 'OT', 'Ardunio', 'Math', 'Programming'];

const useStyles = makeStyles((theme) => ({
    averageRating: {
        '& > p': {
            marginBottom: 0,
        },
        '& > div': {
            width: 'auto',
        },
    },
}));

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    showMenuButton?: boolean;
    title: string;
    totalSessions: number;
    hoursTaught: number;
    tags: Array<any>;
    verified?: boolean;
    itemId?: any;
}

const NewCurrentCourseItem: FC<IProps> = (props) => {
    const classes = useStyles();
    const { id, showMenuButton, title, totalSessions, itemId, verified, className, hoursTaught, tags } = props;
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [openCourseModal, setOpenCourseModal] = useState(false);
    const [page, setPage] = useState(1);
    const visibility = React.useContext(VisibilityContext);

    const visible = visibility.isItemVisible(itemId);

    const list = [
        { label: 'Edit Session', value: 'edit', icon: EditIcon },
        { label: 'Cancel Session', value: 'cancel', icon: BinIcon },
    ];

    const PER_PAGE = 4;
    const count = Math.ceil(studentReview.length / PER_PAGE);
    const DATA = usePagination(studentReview, PER_PAGE);
    const myRef = useRef(null);
    const handleChange = (e: any, p: any) => {
        setPage(p);
        DATA.jump(p);
        myRef.current.scrollIntoView();
    };

    const onCourseModal = () => {
        setOpenCourseModal(true);
    };

    const closeModal = () => {
        setOpenCourseModal(false);
    };

    const FAKEAVATAR = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQReHBiC0Gc-A_3XgGn3kb4h0qyolCbojb5qQ&usqp=CAU';
    const avatar = '';
    const profileName = 'Mark Otto';
    const gender = 'He/Him/His';
    const course = 'Course';
    const message = 'Hello! She was trained in "Pedagogy and methods of teaching a foreign language". I got new knowledge, it was very interesting and accessible. Thank you for the opportunity to take distance learning, it is very convenient. They aroused interest in further development in the field of pedagogy. I especially liked the video materials, a lot of useful things for use in practice. I will recommend your courses to my colleagues.';
    const ratings = 4.6;
    const subject = 'ECON 101';

    return (
        <Wrapper id={id} className={className} tabIndex={0}>
            <Header>
                {verified ? <Div></Div> : <Div style={{ display: 'none' }}></Div>}
                <div>
                    {verified ? (
                        <UITooltip tooltip="verified Grade: A+">
                            <Title onClick={onCourseModal}>{title}</Title>
                        </UITooltip>
                    ) : (
                        <Title onClick={onCourseModal}>{title}</Title>
                    )}
                    <UITruncateTag max={2} list={tags}></UITruncateTag>
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
            <UISpacer height={5} />
            <UIBox direction="row">
                <Details>
                    <p>{totalSessions}</p>
                    <h4>Total Sessions</h4>
                </Details>
                <Details>
                    <p>{hoursTaught}</p>
                    <h4>Hours Tahught</h4>
                </Details>
            </UIBox>
            <UIMenu list={list} anchorEl={menuAnchorEl} onClose={() => setMenuAnchorEl(null)} />

            {/** Course modal part */}
            <UIDrawer open={openCourseModal} onClose={closeModal} title="Course Details">
                <UIUserProfile avatar={avatar || FAKEAVATAR} profileName={profileName} gender={gender} ratings={ratings} subject={subject}></UIUserProfile>
                <DisputeLabel>Course</DisputeLabel>
                <Content style={{ paddingLeft: 0 }}>{course}</Content>
                <UISpacer height={10}></UISpacer>
                <DisputeLabel>Tags</DisputeLabel>
                <UISpacer height={15}></UISpacer>
                <UIBox alignItems="center" justifyContent="start" direction="row">
                    {Tags.map((item, index) => (
                        <div key={index}>
                            <Course>{item}</Course>
                            <UISpacer width={5}></UISpacer>
                        </div>
                    ))}
                </UIBox>
                <DisputeLabel>Description</DisputeLabel>
                <Description style={{ paddingLeft: 0 }}>{message}</Description>
                <UIBox justifyContent="space-between" alignItems="center">
                    <DisputeLabel style={{ marginTop: 0 }}>Student Reviews</DisputeLabel>
                    <ReviewIcon />
                </UIBox>
                <div ref={myRef}>
                    {DATA.currentData().map((item, index) => (
                        <>
                            <UISpacer height={30}></UISpacer>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <ModalTutorDetails style={{ paddingLeft: 0 }}>
                                    <div>
                                        <img src={item.rAvatar ? `${item.rAvatar}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQReHBiC0Gc-A_3XgGn3kb4h0qyolCbojb5qQ&usqp=CAU'} alt="" />
                                    </div>
                                    <div>
                                        <div>
                                            <h4>{item.rName}</h4>
                                            <UISpacer width={5}></UISpacer>
                                            <Course>{item.rCourse}</Course>
                                        </div>
                                        <Review>
                                            {item.rSessionNumber}Sessions&nbsp;•&nbsp;{item.rTotalHours}hrs total
                                        </Review>
                                    </div>
                                </ModalTutorDetails>
                                <div className={classes.averageRating}>
                                    <p>Average Rating</p>
                                    <SessionRatings value={item.rRating} />
                                </div>
                            </div>
                            <UISpacer height={15}></UISpacer>
                            <CommentHeader>Student Comments</CommentHeader>
                            <Description>{item.rComment}</Description>
                            <UIDevider></UIDevider>
                        </>
                    ))}
                </div>
                <UIPaginations count={count} page={page} onChange={handleChange}></UIPaginations>
            </UIDrawer>
        </Wrapper>
    );
};

NewCurrentCourseItem.defaultProps = {
    showMenuButton: true,
};

export default NewCurrentCourseItem;
