import React, { FC, ReactNode, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useFormik } from 'formik';
import { Skeleton, Pagination } from '@mui/material';
import { LinearProgress, makeStyles } from '@material-ui/core';
import SessionRatings from '../../ui-kit/core/NewUIRating';
import UIDrawer from './UIDrawer';
import { studentReview } from '../../page/mysession/temp-data/review';
import usePagination from '../../ui-kit/core/UIPagination';

import UIButtonBase from '../button/UIButtonBase';
import { courseOption } from '../../page/mysession/temp-data/course';
import UIBadge from './UIBadge';
import UIForm from '../form/UIForm';
import UISelectField from '../form/UISelectField';
import UIStaticField from '../form/UIStaticField';
import UITextAreaField from '../form/UITextAreaField';
import UISpacer from './UISpacer';
import FileUpload from '../form/NewFileUpload';
import { Device } from '../../settings/Device';
import { Tween } from '../../settings/Tween';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import { EditIcon, HMorelIcon, ActionRequiredIcon, PendingIcon, ResolvedIcon, ApprovedIcon, CompletedIcon, MessageIcon, CloseIcon, TickIcon, ActionNotRequiredIcon, SessionCashIcon, SessionCourseIcon, SessionLocationIcon, SessionPaymentIcon, SessionNameIcon, SessionTimeIcon, SessionUserIcon, VisaIcon, MastercardIcon, ApplepayIcon, PaypalIcon, UploadedFileIcon, DetailsIcon, CancelIcon, ReviewIcon } from '../icon/UIIconAssets';
import UIBox from '../layout/UIBox';
import UIDevider from './UIDevider';
import UIMenu from '../navigation/menu/UIMenu';
import UIButton from '../button/UIButton';
import NewUITextField from '../../ui-kit/form/NewUITextField';
import UIRadioSelectField from '../form/UIRadioSelectField';
import FileStorage from '../widget/FileStorage';
import UIUserProfile from '../../ui-kit/core/UIUserProfile';

const Wrapper = styled.div<Partial<IProps>>`
    position: relative;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 280px;
    min-width: 300px;
    max-width: 550px;
    padding: 0.5em;
    align-items: center;
    align-self: stretch;
    border-radius: 5px;
    background-color: ${ThemeColor.white};
    box-sizing: border-box;
    margin: 12px;
    padding: 20px;
    box-shadow: 0px 1px 11px 3px rgb(100 144 176 / 15%);
    @media (max-width: ${Device.tablet - 1}px) {
        margin: 10px 10px 10px 0;
    }
    &:hover {
        cursor: pointer;
    }

    svg {
        flex-shrink: 0;
    }

    &.sessionModal {
        margin-top: 30px;
    }
    &:before {
        ${(props) => {
            if ((props.status === 'pending' && props.type === 'student') || props.status === 'requested') {
                return css`
                    border: 1px solid ${ThemeColor.pendingDark};
                `;
            } else if (props.status === 'approved' || (props.status === 'pending' && props.type === 'tutor')) {
                return css`
                    border: 1px solid ${ThemeColor.secondDark};
                `;
            } else if (props.status === 'completed' || props.status === 'resolved') {
                return css`
                    border: 1px solid ${ThemeColor.completedDark};
                `;
            } else if (props.status === 'disputeAr' || props.status === 'disputeAnr') {
                return css`
                    border: 1px solid ${ThemeColor.lightDanger};
                `;
            }
            return null;
        }}

        &.MuiDrawer-paper {
            border-radius: 20px !important;
        }

        content: '';
        position: absolute;
        left: 0;
        // border: 1px solid ${ThemeColor.secondDark};
        right: 0;
        bottom: 0;
        height: 2px;
        margin-left: auto;
        margin-right: auto;
        width: 70%;
    }

    @media (max-width: ${Device.mobileMedium - 1}px) {
        border-radius: 10px;
        padding: 15px;
        margin: 10px 10px 10px 10px;
    }

    @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
        border-radius: 10px;
        padding: 15px;
        margin: 10px 10px 10px 10px;
    }
    @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
        border-radius: 10px;
        padding: 15px;
        margin: 10px 10px 10px 10px;
    }
`;

const Header = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: center;
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
    width: 280px;

    > div:nth-child(1) {
        width: 38px;
        height: 38px;
        background-color: ${ThemeColor.basic};
        border-radius: 50%;
        flex-shrink: 0;
        overflow: hidden;
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

const Message = styled.div<any>`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    font-style: normal;
    font-weight: ${FontWeight.regular};
    font-size: ${FontSize.sm};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.messages};
    align-self: stretch;
    flex-grow: 0;
    margin: 20px 0px;
    flex: none;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const SessionCardTitle = styled.div`
    font-size: ${FontSize.lg};
    font-weight: ${FontWeight.medium};
    color: ${ThemeColor.title};
    margin: 0;
    max-width: 230px;
    min-width: 100px;
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

const Courses = styled.div`
    padding: 2px 6px;
    font-size: ${FontSize.xs};
    color: ${ThemeColor.secondDark};
    background-color: ${ThemeColor.second};
    border-radius: 12px;
    white-space: nowrap;
`;

const P = styled.p`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 0;
`;

const Heading = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    button {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #fafafe;
        transform: rotate(90deg);
        svg {
            width: 10px;
            fill: ${ThemeColor.subtitle};
        }
    }
`;

const Details = styled.div`
    text-align: start;
    color: ${ThemeColor.lightContent};
    font-size: ${FontSize.sm};
    padding: 10px 0 10px 31px;
    font-weight: ${FontWeight.medium};
    margin: 0;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 10px;
    > div {
        flex-grow: 1;
    }
    button {
        min-width: 85px;
        padding: 2px;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        span {
            font-size: 11px;
        }
        svg {
            width: 12px;
            height: 12px;
        }
    }
    > div:nth-child(2) {
        button: nth-child(2) {
            svg {
                width: 10px;
                height: 10px;
            }
        }
    }
`;

const Label = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    p {
        margin: 0;
        margin-left: 23px;
        color: ${ThemeColor.subtitle};
        font-size: ${FontSize.xl};
        font-weight: ${FontWeight.medium};
    }
    margin-top: 15px;
`;

const DisputeLabel = styled.p`
    margin: 0;
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.xl};
    font-weight: ${FontWeight.medium};
    margin: 20px 0 0;
`;

const CardNumber = styled.p`
    font-size: ${FontSize.xl};
    color: ${ThemeColor.title};
    font-weight: ${FontWeight.regular};
    margin: 0;
`;

const Exp = styled.p`
    font-size: ${FontSize.sm};
    font-weight: ${FontWeight.regular};
    color: ${ThemeColor.subtitle};
    margin: 0;
`;

const Content = styled.p`
    font-size: ${FontSize.lg};
    margin-top: 10px;
    color: ${ThemeColor.subtitle};
    margin-bottom: 0;
    padding-left: 40px;
`;

const AvatarContainer = styled.div`
    flex-shrink: 0;
`;

const FilesContainer = styled.div`
    > div {
        padding-left: 20px;
        margin-bottom: 0;
    }
`;

const Description = styled.p`
    font-size: ${FontSize.label};
    color: ${ThemeColor.subtitle};
    font-weight: ${FontWeight.regular};
    line-height: 150%;
    letter-spacing: 0.01em;
`;

const FileName = styled.p`
    color: ${ThemeColor.title};
    font-size: ${FontSize.sm};
    font-weight: ${FontWeight.medium};
`;

const FileSize = styled.p`
    color: #545454;
    font-size: ${FontSize.xxs};
`;

const Refund = styled.p`
    padding: 6px 13px;
    background-color: #ffefef;
    color: #ff5f5f;
    font-size: 0.625rem;
    font-weight: 500;
    border-radius: 12px;
    display: flex;
    justify-content: start;
    width: 110px;
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

const Pages = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const useStyles = makeStyles((theme) => ({
    inputs: {
        marginLeft: '40px !important',
        marginTop: '10px !important',
    },
    selects: {
        marginLeft: '40px',
        marginTop: '10px',
        width: '92%',
    },
    select: {
        marginLeft: '40px !important',
        marginTop: '10px !important',
        width: '92% !important',
    },
    textClass: {
        paddingLeft: 40,
        fontSize: `${FontSize.lg}`,
        color: `${ThemeColor.subtitle}`,
        marginTop: 10,
    },
    review: {},
    averageRating: {
        '& > p': {
            marginBottom: 0,
        },
        '& > div': {
            width: 'auto',
        },
    },
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
        '& .MuiPaginationItem-icon': {
            backgroundColor: `${ThemeColor.second}`,
            borderRadius: '50%',
        },
        '& svg': {
            fill: `${ThemeColor.secondDark}`,
        },
        '& .MuiPaginationItem-root': {
            color: `${ThemeColor.subtitle}`,
        },
        '& .Mui-selected': {
            color: `${ThemeColor.secondDark}`,
            backgroundColor: 'white !important' as 'white',
        },
        '& .MuiPaginationItem-previousNext': {
            backgroundColor: `${ThemeColor.second}`,
        },

        '&.page-item': {
            '&:hover': {
                button: {
                    backgroundColor: 'green',
                    borderColor: 'green',
                },
            },
        },
    },
}));

export const SessionSatus = {
    pending: { status: 'pending', desc: 'Pending Tutor Approval', icon: PendingIcon },
    approved: { status: 'approved', desc: 'Approved by the tutor', icon: ApprovedIcon },
    completed: { status: 'completed', desc: 'Completed', icon: CompletedIcon },
    disputeAr: { status: 'disputeAr', desc: 'Action required', icon: ActionRequiredIcon },
    awaiting: { status: 'awaiting', desc: 'Awaiting Approval', icon: PendingIcon },
    resolved: { status: 'resolved', desc: 'Dispute resolved', icon: ResolvedIcon },
    disputeAnr: { status: 'disputeAn', desc: 'Action not required', icon: ActionNotRequiredIcon },
};

export const Payment = {
    visa: { icon: VisaIcon },
    masterecard: { icon: MastercardIcon },
    paypal: { icon: PaypalIcon },
    apple: { icon: ApplepayIcon },
};

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    status?: string;
    session?: string;
    profileName?: string;
    message?: string;
    course?: string;
    avatar?: any;
    date?: string;
    time?: string;
    duration?: string;
    meetingLocation?: any;
    isOnline?: boolean;
    ratings?: number;
    subject?: string;
    type?: string;
    payment?: any;
    disputeReason?: string;
    disputeMessage?: string;
    gender?: string;
}

const UICards: FC<IProps> = (props) => {
    const { id, status, session, profileName, gender, message, meetingLocation, disputeMessage, course, avatar, date, time, duration, isOnline, ratings, subject, type, payment, disputeReason } = props;
    const classes = useStyles();
    const ids = useStyles();
    const formik = useFormik({
        initialValues: {},
        onSubmit: (values: any) => {},
    });

    const FAKEAVATAR = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQReHBiC0Gc-A_3XgGn3kb4h0qyolCbojb5qQ&usqp=CAU';

    const radioOptions = [
        { label: 'virtual', value: 'virtual' },
        { label: 'inPerson', value: 'inPerson' },
    ];

    // DEVIDE MEETING OPTIONS TO VIRTUAL AND INPERSON
    const inPerson = [];
    const virtual = [];
    meetingLocation.map((item: any, index: any) => {
        if (item.type === 'in-person') {
            inPerson.push(item);
        } else if (item.type === 'virtual') {
            virtual.push(item);
        }
    });

    const optionArray = [
        { name: 'inPerson', value: inPerson },
        { name: 'virtual', value: virtual },
    ];

    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [isloading, setIsloading] = useState(true);

    // OPEN FIRST AND SECOND MODAL
    const [handleOpen, setHandleOpen] = useState(null);
    const [openSecondModal, setOpenSecondModal] = useState<boolean>(false);
    const [openCourseModal, setOpenCourseModal] = useState<boolean>(false);

    // SESSION NAME EDIT VARIABLES
    const [sessionName, setSessionName] = useState(`${session}`);
    const [temp, setTemp] = useState('');

    // COURSE NAME EDIT VARIABLES
    const [courseName, setCourseName] = useState(`${course}`);

    const [tutorResponse, setTutorResponse] = useState('');
    const [studentResponse, setStudentResponse] = useState('');
    const [progress, setProgress] = useState(67);

    // COPY LINK FUNCTIONS
    const [copyState, setCopyState] = useState<boolean>(false);

    // SETTING MODAL HEADING SAVE, CANCEL, EDIT STATES
    const [isEditing, setIsEditing] = useState(false);

    setTimeout(() => {
        setIsloading(false);
    }, 1000);

    const toCourse = (e: any) => {
        e.stopPropagation();
        setOpenCourseModal(true);
    };

    const detail = (e: any) => {
        e.stopPropagation();
    };

    const handleSessionName = (e: any) => {
        setSessionName(e.target.value);
    };

    const handleCourseName = (e: any) => {
        setCourseName(e.target.value);
    };

    const closeModal = (e) => {
        setHandleOpen(false);
        setOpenSecondModal(false);
        setOpenCourseModal(false);
    };

    const openModal = (e: any) => {
        setHandleOpen(true);
    };

    const openChat = (e) => {
        e.stopPropagation();
    };

    const rejectSession = (e) => {
        e.stopPropagation();
    };

    const approveSession = (e) => {
        e.stopPropagation();
    };

    // rest cards
    const viewDetails = (e) => {
        e.stopPropagation();
    };

    const disputeAnr = (e) => {
        e.stopPropagation();
        setOpenSecondModal(true);
    };

    const joinSession = (e) => {
        e.stopPropagation();
    };

    const respond = (e) => {
        e.stopPropagation();
        setHandleOpen(false);
        setOpenSecondModal(true);
    };

    const cancelRequest = (e) => {
        e.stopPropagation();
    };

    const handleOpenSecondModal = () => {
        setOpenSecondModal(true);
        setHandleOpen(false);
    };

    // HANDLING EDIT, SAVE, CANCEL BUTTONS OF CHILDREN MODAL
    const beginEditing = () => {
        setTemp(sessionName);
        setIsEditing(true);
    };

    const saving = () => {
        setIsEditing(false);
    };

    const canceling = () => {
        setSessionName(temp);
        setIsEditing(false);
    };

    // DISPUTE PART FOR TWO STEP MODAL FUNCTIONS
    const handleTutorResponse = (e: any) => {
        setTutorResponse(e.target.value);
    };

    const handleStudentResponse = (e: any) => {
        setStudentResponse(e.target.value);
    };

    const copyFunction = () => {
        setCopyState(true);
    };

    const StatusIcon = SessionSatus[status].icon;
    const listForDispute = [{ label: 'View Details', value: 'viewDetails', icon: DetailsIcon }];

    const listForApproved = [
        { label: 'Details', value: 'details', icon: DetailsIcon },
        { label: 'Cancel', value: 'cancel', icon: CancelIcon },
    ];

    const listForPending = [
        { label: 'Details', value: 'details', icon: DetailsIcon },
        { label: 'Edit', value: 'edit', icon: EditIcon },
        { label: 'Cancel', value: 'cancel', icon: CancelIcon },
    ];

    const Tags = ['Robots', 'Technics', 'Physics', 'OT', 'Ardunio', 'Math', 'Programming'];

    const PaymentIcon = Payment[payment.method].icon;

    // FOR PAGINATION
    const [page, setPage] = useState(1);
    const PER_PAGE = 4;

    const count = Math.ceil(studentReview.length / PER_PAGE);
    const DATA = usePagination(studentReview, PER_PAGE);

    const myRef = useRef(null);
    const handleChange = (e: any, p: any) => {
        setPage(p);
        DATA.jump(p);
        myRef.current.scrollIntoView();
    };

    return (
        <Wrapper id={id} status={status} type={type}>
            <UIForm formik={formik} style={{ width: '100%' }}>
                <div onClick={isloading ? null : status === 'disputeAnr' ? handleOpenSecondModal : openModal} style={{ width: '100%' }}>
                    <Heading>
                        <UIBox alignItems="center" style={{ width: '80%', gap: '10px' }}>
                            {isloading ? <Skeleton animation="wave" variant="circular" width={20} height={20} /> : <StatusIcon />}
                            {isloading ? (
                                <Skeleton animation="wave" width={'90%'} />
                            ) : (
                                <>
                                    <SessionCardTitle>
                                        <P>{session}</P>
                                    </SessionCardTitle>
                                    <Course onClick={isloading ? null : toCourse}>{course}</Course>
                                </>
                            )}
                        </UIBox>
                        {!isloading && (
                            <UIButtonBase
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setMenuAnchorEl(e.target);
                                }}
                            >
                                <HMorelIcon />
                            </UIButtonBase>
                        )}
                    </Heading>
                    {isloading ? (
                        <Skeleton animation="wave" width={'80%'} style={{ marginLeft: '30px' }} />
                    ) : (
                        <Details>
                            {date}&nbsp;AT&nbsp;{time} | {duration}&nbsp;MIN | {isOnline ? 'ONLINE' : 'OFFLINE'}
                        </Details>
                    )}
                    <TutorDetails onClick={isloading ? null : detail} style={{ alignItems: 'start' }}>
                        {isloading ? <Skeleton animation="wave" width={40} height={40} variant="circular" /> : <AvatarContainer>{<img src={avatar ? `${avatar}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQReHBiC0Gc-A_3XgGn3kb4h0qyolCbojb5qQ&usqp=CAU'} alt="Tutor" /> || <Skeleton animation="wave" />}</AvatarContainer>}
                        <div style={{ width: isloading ? '90%' : null }}>
                            {isloading ? (
                                <Skeleton animation="wave" width={'40%'} />
                            ) : (
                                <div>
                                    <h4>{profileName}</h4>
                                    <UISpacer width={5}></UISpacer>
                                    <Courses>{gender}</Courses>
                                </div>
                            )}
                            {isloading ? (
                                <>
                                    <Skeleton animation="wave" width={'30%'} />
                                    <UISpacer height={20}></UISpacer>
                                </>
                            ) : (
                                <SessionRatings value={ratings} subject={subject} />
                            )}
                        </div>
                    </TutorDetails>
                    {isloading ? (
                        <>
                            <UISpacer height={20}></UISpacer>
                            <Skeleton animation="wave" width={'100%'} />
                            <Skeleton animation="wave" width={'70%'} />
                            <Skeleton animation="wave" width={'80%'} />
                        </>
                    ) : (
                        <Message>{message}</Message>
                    )}
                    {(status === 'resolved' || status === 'disputeAnr' || status === 'disputeAr') && (
                        <UIMenu
                            list={listForDispute}
                            anchorEl={menuAnchorEl}
                            onClose={(e) => {
                                e.stopPropagation();
                                setMenuAnchorEl(null);
                            }}
                        />
                    )}
                    {status === 'approved' && (
                        <UIMenu
                            list={listForApproved}
                            anchorEl={menuAnchorEl}
                            onClose={(e) => {
                                e.stopPropagation();
                                setMenuAnchorEl(null);
                            }}
                        />
                    )}
                    {(status === 'pending' || status === 'awaiting') && (
                        <UIMenu
                            list={listForPending}
                            anchorEl={menuAnchorEl}
                            onClose={(e) => {
                                e.stopPropagation();
                                setMenuAnchorEl(null);
                            }}
                        />
                    )}
                    {status === 'pending' && type === 'tutor' && (
                        <ButtonGroup>
                            {isloading ? (
                                <Skeleton animation="wave" width={'30%'} height={50} />
                            ) : (
                                <UIButton color="second" onClick={openChat}>
                                    <MessageIcon />
                                    Message
                                </UIButton>
                            )}
                            {isloading ? (
                                <Skeleton animation="wave" width={'30%'} height={50} />
                            ) : (
                                <UIButton color="dispute" onClick={rejectSession}>
                                    <CloseIcon />
                                    Reject
                                </UIButton>
                            )}
                            {isloading ? (
                                <Skeleton animation="wave" width={'30%'} height={50} />
                            ) : (
                                <UIButton color="second" onClick={approveSession}>
                                    <TickIcon />
                                    Approve
                                </UIButton>
                            )}
                        </ButtonGroup>
                    )}
                    {status === 'approved' &&
                        (isloading ? (
                            <Skeleton animation="wave" height={50} />
                        ) : (
                            <UIButton color="second" style={{ width: '100%' }} onClick={joinSession}>
                                Join session
                            </UIButton>
                        ))}
                    {status === 'completed' &&
                        (isloading ? (
                            <Skeleton animation="wave" height={50} />
                        ) : (
                            <UIButton color="completed" style={{ width: '100%' }} onClick={viewDetails}>
                                View Details
                            </UIButton>
                        ))}
                    {status === 'pending' &&
                        type === 'student' &&
                        (isloading ? (
                            <Skeleton animation="wave" height={50} />
                        ) : (
                            <UIButton color="pending" style={{ width: '100%' }} onClick={cancelRequest}>
                                Cancel Request
                            </UIButton>
                        ))}
                    {status === 'disputeAr' &&
                        (isloading ? (
                            <Skeleton animation="wave" height={50} />
                        ) : (
                            <UIButton color="dispute" style={{ width: '100%' }} onClick={respond}>
                                Respond
                            </UIButton>
                        ))}
                    {status === 'disputeAnr' &&
                        (isloading ? (
                            <Skeleton animation="wave" height={50} />
                        ) : (
                            <UIButton color="pending" style={{ width: '100%' }} onClick={disputeAnr}>
                                View Details
                            </UIButton>
                        ))}
                    {status === 'resolved' &&
                        (isloading ? (
                            <Skeleton animation="wave" height={50} />
                        ) : (
                            <UIButton color="completed" style={{ width: '100%' }} onClick={handleOpenSecondModal}>
                                View Dispute
                            </UIButton>
                        ))}
                </div>

                {/* FIRST MODAL */}
                <UIDrawer open={handleOpen} onClose={closeModal} title="Session Details" edit={!!(type === 'student' && status === 'pending')} type={type} status={status} saving={saving} canceling={canceling} beginEditing={beginEditing} isEditing={isEditing} disputeAr={respond} disputeAnr={disputeAnr} resolved={handleOpenSecondModal}>
                    <Label>
                        <SessionUserIcon />
                        {type === 'tutor' && <p>Mentor</p>}
                        {type === 'student' && <p>Student</p>}
                    </Label>
                    <UISpacer height={2}></UISpacer>
                    <ModalTutorDetails>
                        <div>
                            <img src={avatar ? `${avatar}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQReHBiC0Gc-A_3XgGn3kb4h0qyolCbojb5qQ&usqp=CAU'} alt="" />
                        </div>
                        <div>
                            <div>
                                <h4>{profileName}</h4>
                                <UISpacer width={5}></UISpacer>
                                <Course>{gender}</Course>
                            </div>
                            <SessionRatings value={ratings} subject={subject} />
                        </div>
                    </ModalTutorDetails>
                    <UISpacer height={15}></UISpacer>
                    <Label>
                        <SessionNameIcon />
                        <p>Session Name</p>
                    </Label>
                    <NewUITextField id="sessionName" name="sessionName" value={sessionName} onChange={handleSessionName} readOnly={!isEditing} className={classes.inputs} />
                    <Label>
                        <SessionCourseIcon />
                        <p>Course</p>
                    </Label>
                    <UISelectField id="courseName" name="courseName" defaultValue={course} options={courseOption} readOnly={!isEditing} className={classes.select} textClass={classes.textClass} />
                    <Label>
                        <SessionTimeIcon />
                        <p>Time</p>
                    </Label>
                    <Content>{date}</Content>
                    <Content>
                        {time}&nbsp;{duration}MIN
                    </Content>
                    <UISpacer height={15}></UISpacer>
                    <UIBox justifyContent="space-between" alignItems="center">
                        <div>
                            <Label>
                                <SessionLocationIcon />
                                <p>Location</p>
                            </Label>
                            <UIRadioSelectField id="courseName" name="courseName" options={optionArray} wholeOptions={meetingLocation} radioOptions={radioOptions} readOnly={!isEditing} className={classes.selects} copy={copyState} />
                        </div>
                        <UIButton color="second" size="small" onClick={copyFunction}>
                            Copy Link
                        </UIButton>
                    </UIBox>
                    <Label>
                        <SessionCashIcon />
                        <p>Amound Paid</p>
                    </Label>
                    <Content>${payment.price}</Content>
                    <UISpacer height={15}></UISpacer>
                    <Label>
                        <SessionPaymentIcon />
                        <p>Payment Method</p>
                    </Label>
                    <UISpacer height={10}></UISpacer>
                    <UIBox justifyContent="start" alignItems="center" style={{ paddingLeft: '40px' }}>
                        {<PaymentIcon />}
                        <UISpacer width={20}></UISpacer>
                        <div>
                            <CardNumber>{payment.info}</CardNumber>
                            <Exp>Exp.&nbsp;{payment.expDate}</Exp>
                        </div>
                    </UIBox>
                    <UISpacer height={40}></UISpacer>
                    <Label>
                        <p>Additional Information</p>
                    </Label>
                    <UITextAreaField name="information" value={message} readOnly={!isEditing} style1={{ paddingLeft: '20px', marginTop: '15px', fontSize: '15px' }}></UITextAreaField>
                    <UISpacer height={40}></UISpacer>
                    <Label>
                        <p>Additional Files</p>
                    </Label>
                    <UISpacer height={20}></UISpacer>
                    {status !== 'pending' && (
                        <FilesContainer>
                            <FileStorage />
                        </FilesContainer>
                    )}
                    {type === 'student' && status === 'pending' && (
                        <UIBox>
                            <UploadedFileIcon />
                            <UISpacer width={12}></UISpacer>
                            <div style={{ width: '250px' }}>
                                <FileName>Rhizo CV_23/11.pdf</FileName>
                                <LinearProgress value={progress} />
                                <FileSize>978kv</FileSize>
                            </div>
                        </UIBox>
                    )}
                </UIDrawer>

                {/* SECOND MODAL  */}
                <UIDrawer open={openSecondModal} onClose={closeModal} title="Dispute" secondStatus={status}>
                    <Description style={{ fontStyle: 'italic' }}>A dispute has been filed by a student. Please respond to this dipute as soon as possible so that Rhizo can resolve the situation.</Description>
                    <ModalTutorDetails style={{ paddingLeft: 0 }}>
                        <div>
                            <img src={avatar ? `${avatar}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQReHBiC0Gc-A_3XgGn3kb4h0qyolCbojb5qQ&usqp=CAU'} alt="" />
                        </div>
                        <div>
                            <div>
                                <h4>{profileName}</h4>
                                <UISpacer width={5}></UISpacer>
                                <Course>{gender}</Course>
                            </div>
                            <SessionRatings value={ratings} subject={subject} />
                        </div>
                    </ModalTutorDetails>
                    <DisputeLabel>Dispute Reaason</DisputeLabel>
                    <Description>{disputeReason}</Description>
                    <DisputeLabel>Your Response</DisputeLabel>
                    <UISpacer height={15}></UISpacer>
                    <UITextAreaField name="response" placeholder="Enter your comment" style={{ rows: 30 }} value={type === 'tutor' ? tutorResponse : studentResponse} onChange={type === 'tutor' ? handleTutorResponse : handleStudentResponse} readOnly={status !== 'disputeAr'}></UITextAreaField>
                    <DisputeLabel>Supporting Documents</DisputeLabel>
                    <UISpacer height={15}></UISpacer>
                    {status === 'disputeAr' && <FileUpload />}
                    {status === 'disputeAnr' && <FileStorage />}
                    {status === 'resolved' && (
                        <>
                            <UIBox>
                                <UIBox>
                                    <UploadedFileIcon />
                                    <UISpacer width={12}></UISpacer>
                                    <div>
                                        <FileName>Rhizo CV_23/11</FileName>
                                        <FileSize>978kv</FileSize>
                                    </div>
                                </UIBox>
                            </UIBox>
                            <DisputeLabel>Dispute Resolution</DisputeLabel>
                            <Refund>Payment refunded</Refund>
                            <Description>{disputeMessage}</Description>
                        </>
                    )}
                </UIDrawer>

                {/* COURSE MODAL */}
                <UIDrawer open={openCourseModal} onClose={closeModal} title="Course Details">
                    <UIUserProfile avatar={avatar || FAKEAVATAR} profileName={profileName} gender={gender} ratings={ratings} subject={subject}></UIUserProfile>
                    <DisputeLabel>Course</DisputeLabel>
                    <Content style={{ paddingLeft: 0 }}>{course}</Content>
                    <UISpacer height={10}></UISpacer>
                    <DisputeLabel>Tags</DisputeLabel>
                    <UISpacer height={15}></UISpacer>
                    <UIBox alignItems="center" justifyContent="start" direction="row">
                        {Tags.map((item, index) => (
                            <>
                                <Course>{item}</Course>
                                <UISpacer width={5}></UISpacer>
                            </>
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
                                    <ModalTutorDetails style={{ paddingLeft: 0 }} className={classes.review}>
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
                    <Pages className={classes.root}>{count > 1 && <Pagination count={count} size="large" page={page} onChange={handleChange} />}</Pages>
                </UIDrawer>
            </UIForm>
        </Wrapper>
    );
};

UICards.defaultProps = {};

export default UICards;
