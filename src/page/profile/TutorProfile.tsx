import React, { FC, ReactNode, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useFormik } from 'formik';
import { makeStyles, RadioGroup } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@mui/material';
import { requestTagQuery, SearchState } from '../../store/state/SearchState';
import { RootState } from '../../store/state/RootReducer';
import usePagination from '../../ui-kit/core/UIPagination';
import Content from '../common/Content';
import Header from '../common/Header';
import UINavigation from '../common/UINavigation';
import UIBox from '../../ui-kit/layout/UIBox';
import UIHeading from '../../ui-kit/core/UIHeading';
import UIForm from '../../ui-kit/form/UIForm';
import UICard from '../../ui-kit/core/UICard';
import UISelectField from '../../ui-kit/form/UISelectField';
import UISpacer from '../../ui-kit/core/UISpacer';
import NewUIRating from '../../ui-kit/core/NewUIRating';
import UIButton from '../../ui-kit/button/UIButton';
import UICustomModal from '../../ui-kit/core/UICustomModal';
import UICheckBox from '../../ui-kit/form/UICheckBox';
import HList from '../../ui-kit/core/HList';
import UIDevider from '../../ui-kit/core/UIDevider';
import UIAutoComplete from '../../ui-kit/form/UIAutoComplete';
import UIFeedback from '../../ui-kit/core/UIFeedback';
import UIDatePicker from '../../ui-kit/form/UIDatePicker';
import UITextField from '../../ui-kit/form/UITextField';
import UITextAreaField from '../../ui-kit/form/UITextAreaField';
import TutorScheduler from '../../ui-kit/widget/TutorScheduler';
import PaymentMethodItem from '../../page/settings/payment/PaymentMethodItem';
import AddPaymentMethod from '../settings/payment/AddPaymentMethod';
import NewFileUpload from '../../ui-kit/form/NewFileUpload';
import { Device } from '../../settings/Device';
import { Margin } from '../../settings/Margin';
import { ThemeColor } from '../../settings/ThemeColor';
import { FontSize, FontWeight } from '../../settings/Font';
import { courseList } from '../../util/mock-api/data/course-list';
import { MessageIcon, CalendarIcon, ClockCircleIcon, SuccessImage, WarnIcon, FailedImage, InstiCircleIcon, ArrowRightIcon, ArrowLeftIcon, StarCircleIcon, TickWithCircleIcon, FilterListIcon, MeetingTypeIcon, VisaIcon, MastercardIcon, PaypalIcon, CreditCardIcon, AccountWalletIcon, BankIcon, QuestionIcon, LocationPinIcon } from '../../ui-kit/icon/UIIconAssets';
import { MeetingList, MeetingOptions } from '../../settings';

const PageContentWrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    flex: 1;
    margin: 0px !important;
    overflow: hidden;
    @media (max-width: ${Device.mobileMedium - 1}px) 
        margin: ${Margin.sm}px;
        #profileBar {
            display: none;
        }
    }
    @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
        margin: ${Margin.sm}px;
        #profileBar {
            display: none;
        }
    }
    @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
        margin: ${Margin.md}px;
        #profileBar {
            display: none;
        }
    }
    @media (min-width: ${Device.laptop}px) and (max-width: ${Device.laptopLarge - 1}px) {
        margin: ${Margin.md}px;
    }
    @media (min-width: ${Device.laptopLarge}px) and (max-width: ${Device.desktop - 1}px) {
        margin: ${Margin.lg}px;
    }
    @media (min-width: ${Device.desktop}px) {
        margin: ${Margin.xl}px;
    }
`;

const MainContentWrapper = styled.div<Partial<IProps>>`
    display: block;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    /* background: ${ThemeColor.white}; */
    flex: 1;
    align-self: stretch;
    max-height: 100%;
    padding: 40px 20px 0 20px !important;
    overflow: auto;
    > div:nth-child(3) {
        > div:nth-child(1) {
            margin-left: 20px;
            margin-right: 20px;
        }
    }
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
    }
    @media (max-width: ${Device.laptop - 1}px) {
        padding: 0 8px 0 8px;
    }
`;

const ProfileContent = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.sm};
    line-height: 19px;
`;

const Container = styled.div``;

const Avatar = styled.img`
    width: 106px;
    height: 106px;
    border-radius: 50%;
    margin: 0 auto;
`;

const Name = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.xl};
    margin: 0;
`;

const Level = styled.div`
    padding: 3px 6px;
    background-color: ${ThemeColor.second};
    color: ${ThemeColor.secondDark};
    font-size: 9.75px;
    border-radius: 12.18px;
    margin: 0;
`;

const Div = styled.div``;

const DivContainer = styled.div`
    width: calc(100% - 350px);
    @media (max-width: ${Device.laptopMedium - 1}px) {
        width: 100%;
    }
`;

const Value = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: 20px;
    font-weight: ${FontWeight.bold};
    margin: 0;
`;

const Exp = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.sm};
    margin: 0;
`;

const CourseContainer = styled.div`
    width: calc(100% - 350px);
    @media (max-width: ${Device.laptopMedium - 1}px) {
        width: 100%;
    }
`;

const LocationContainer = styled.div`
    width: calc(100% - 350px);
    padding-left: 20px;
    p {
        color: ${ThemeColor.messages};
        font-size: ${FontSize.lg};
        margin: 0;
    }
    @media (max-width: ${Device.laptopMedium - 1}px) {
        width: 100%;
    }
`;

const ReviewsContainer = styled.div`
    width: calc(100% - 350px);
    @media (max-width: ${Device.laptopMedium - 1}px) {
        width: 100%;
    }
`;

const Items = styled.div`
    p {
        color: ${ThemeColor.subtitle};
        font-size: ${FontSize.md};
        margin: 0;
    }
`;

const PageContainer = styled.div`
    width: 100%;
    text-align: center;
`;

const AddText = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.sm};
    margin: 0;
`;

const ModalAvatar = styled.img`
    width: 39px;
    height: 39px;
    border-radius: 50%;
`;

const Subject = styled.div`
    background-color: ${ThemeColor.second};
    color: ${ThemeColor.secondDark};
    border-radius: 10px;
    padding: 2px 6px;
`;

const HourlyRate = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.lg};
    margin: 0;
`;

const Label = styled.p`
    color: ${ThemeColor.title};
    font-size: ${FontSize.lg};
    margin: 0;
`;

const Week = styled.div`
    border-radius: 6px;
    background-color: #f2f2f3;
    width: 70%;
    text-align: center;
    padding: 10px;
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.sm};
`;

const ArrowContainer = styled.div`
    width: 34px;
    height: 34px;
    padding: 5px;
    border: 1px solid ${ThemeColor.border};
    border-radius: 10px;
    svg {
        fill: ${ThemeColor.subtitle};
    }
    &:hover {
        cursor: pointer;
    }
`;

const BookContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
`;

const BookDate = styled.div`
    color: ${ThemeColor.messages};
    font-size: ${FontSize.lg};
    text-align: start;
`;

const BookTime = styled.div`
    color: ${ThemeColor.messages};
    font-size: ${FontSize.lg};
    padding-left: 32px;
`;

const Course = styled.div`
    text-align: start;
    color: ${ThemeColor.title};
    font-size: ${FontSize.xl}px;
`;

const Detail = styled.div`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.sm};
    opacity: 0.5;
`;

const FeedbackContainer = styled.div``;

const SubLabel = styled.div`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.sm};
`;

const CardContainer = styled.div`
    width: 100%;
    text-align: center;
`;

const ButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    > div {
        width: 50%;
    }
`;

const CardNumber = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    align-items: center;
    > div:nth-child(1) {
        width: 70%;
    }
    > div:nth-child(2) {
        width: 30%;
    }
`;

const ExpireContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    align-items: center;
    >div: nth-child(1) {
        width: 50%;
    }
    >div: nth-child(2) {
        width: 50%;
    }
`;

const Warn = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
`;

const WarningText = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.sm};
    margin: 0;
`;

const ScheduleSelect = styled.div`
    width: 100%;
    height: 37px;
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.lg};
    &:hover {
        cursor: pointer;
    }
`;

const useStyles = makeStyles((theme) => ({
    profileContainer: {
        width: '100%',
        [theme.breakpoints.down(Device.tablet - 1)]: {
            flexWrap: 'wrap-reverse',
            justifyContent: 'center !important',
        },
    },
    cardContainer: {
        '&>div': {
            padding: '25px 20px',
        },
        '@media (max-width: 768px)': {
            flexDirection: 'column !important',
            '&> div': {
                width: '100%',
            },
        },
    },
    root: {
        '&>nav>ul:nth-child(1)': {
            justifyContent: 'center',
        },
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
    formContainer: {
        '&> svg': {
            width: 23,
            height: 23,
            marginBottom: 16,
        },
    },
    select: {
        '&:hover': {
            cursor: 'pointer',
        },
    },
}));

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
}

const FEEDBACK_DATA = [
    {
        student: 'Judith Rodriguez',
        avatar: 'https://i.pravatar.cc/200',
        rate: 4.5,
        totalHours: 24,
        sessionNumber: 30,
        feedback: [
            {
                date: 'Jan 11, 2021',
                header: 'Excellent training',
                content: 'Hello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessible.Hello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessible.Hello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessibleHello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessibleHello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessible',
            },
        ],
    },
    {
        student: 'Judith Rodriguez',
        avatar: 'https://i.pravatar.cc/200',
        rate: 4.5,
        totalHours: 24,
        sessionNumber: 30,
        feedback: [
            {
                date: 'Jan 11, 2021',
                header: 'Excellent training',
                content: 'Hello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessible.Hello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessible.Hello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessibleHello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessibleHello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessible',
            },
            {
                date: 'Jan 11, 2021',
                header: 'Excellent training',
                content: 'Hello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessible.Hello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessible.Hello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessibleHello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessibleHello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessible',
            },
            {
                date: 'Jan 11, 2021',
                header: 'Excellent training',
                content: 'Hello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessible.Hello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessible.Hello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessibleHello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessibleHello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessible',
            },
            {
                date: 'Jan 11, 2021',
                header: 'Excellent training',
                content: '',
            },
            {
                date: 'Jan 11, 2021',
                header: 'Excellent training',
                content: 'Hello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessible.Hello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessible.Hello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessibleHello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessibleHello! She was trained in Pedagogy and methods of teaching a foreign language. I got new knowledge, it was very interesting and accessible',
            },
        ],
    },
];

const TUTOR_DATA = {
    avatar: 'https://i.pravatar.cc/200',
    rate: 4.7,
    name: 'Rhonda Rhodes',
    profile: '',
    subject: 'Economics',
    hourlyRate: 20,
};

const REVIEWS = {
    convenience: 4.5,
    method: 2.3,
    clarity: 4.0,
    reviews: 5,
};

const PAYMENT_METHOD_LIST = [
    {
        icon: VisaIcon,
        type: 'card',
        name: 'Visa',
        digits: 2222,
        validity: '17.06.2024',
        flow: 'in',
    },
    {
        icon: MastercardIcon,
        type: 'card',
        name: 'Mastercard',
        digits: 4455,
        validity: '17.06.2024',
        flow: 'out',
    },
    {
        icon: PaypalIcon,
        type: 'paypal',
        name: 'PayPal',
        email: 'xyz@domain.com',
        flow: 'in',
    },
];

const NEW_PAYMENT_METHOD = [
    {
        icon: CreditCardIcon,
        type: 'card',
        name: 'Credit/Debit Card',
        digits: 2222,
        validity: '17.06.2024',
        flow: 'in',
    },
    {
        icon: AccountWalletIcon,
        type: 'card',
        name: 'Link Bank Account',
        digits: 4455,
        validity: '17.06.2024',
        flow: 'out',
    },
    {
        icon: BankIcon,
        type: 'paypal',
        name: 'Apple/Google Pay',
        email: 'xyz@domain.com',
        flow: 'in',
    },
];

const MySession: FC<IProps> = (props) => {
    const classes = useStyles();
    const { id } = props;
    const dispatch = useDispatch();
    const searchState = useSelector<RootState, SearchState>((state) => state.searchState);

    const [openFirst, setOpenFirst] = useState(false);
    const [openSecond, setOpenSecond] = useState(false);
    const [openSchedule, setOpenSchedule] = useState(false);
    const [openAddPaymentMethod, setOpenAddPaymentMethod] = useState(false);
    const [text, setText] = useState('');
    const [selectedMeetingList, setSelectedMeetingList] = useState('');
    const [list, setList] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [today, setToday] = useState(0);
    const [single, setSingle] = useState(true);
    const [selected, setSelected] = useState(false);
    const [tempDate, setTempDate] = useState('');
    const [tempSchedule, setTempSchedule] = useState([]);
    const [realDate, setRealDate] = useState('');
    const [realSchedule, setRealSchedule] = useState([]);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFailed, setOpenFailed] = useState(false);
    const [totalTime, setTotlaTime] = useState(null);
    const [success, setSuccess] = useState(true);
    const [Tschedule, setTSchedule] = React.useState([]);
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');
    const [item, setItem] = useState({ major: '', course: '', tags: [] });
    const [page, setPage] = useState(1);
    const [value, setValue] = useState('');
    const onChangeRadio = (e: any) => {
        setValue(e.target.value);
    };

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values: any) => {},
    });

    const onChange = (fi, v) => {
        if (fi === 0) setItem({ ...item, major: v });
        else if (fi === 1) setItem({ ...item, course: v });
        else if (fi === 2) setItem({ ...item, tags: v });
    };

    const PER_PAGE = 4;
    const count = Math.ceil(FEEDBACK_DATA.length / PER_PAGE);
    const DATA = usePagination(FEEDBACK_DATA, PER_PAGE);
    const myRef = useRef(null);
    const handleChange = (e: any, p: any) => {
        setPage(p);
        DATA.jump(p);
        myRef.current.scrollIntoView();
    };

    const onSelectMeeting = (e) => {
        setSelectedMeetingList(e.target.value);
        setList(MeetingList[e.target.value]);
    };

    const onOpen = () => {
        setOpenFirst(true);
    };

    const onCloseFirst = () => {
        setOpenFirst(false);
    };

    const onSaveFirst = () => {
        setOpenFirst(false);
    };

    const onFirstToSecond = () => {
        setOpenFirst(false);
        setOpenSecond(true);
    };

    const onFirstCancel = () => {
        setOpenFirst(false);
        setSelectedMeetingList(null);
        setList(null);
        setText(null);
    };

    const onCloseSecond = () => {
        setOpenSecond(false);
    };

    const onSecondToFirst = () => {
        setOpenSecond(false);
        setOpenFirst(true);
    };

    const onScheduleConfirm = () => {
        setRealSchedule([scheduleTime, totalTime]);
        setRealDate(scheduleDate);
        setTempSchedule([scheduleTime, totalTime]);
        setTempDate(scheduleDate);
        setOpenSchedule(false);
        setOpenFirst(true);
    };

    const onScheduleCancel = () => {
        setRealSchedule([tempSchedule]);
        setRealDate(tempDate);
        setOpenSchedule(false);
        setOpenFirst(true);
    };

    const onFirstToSchedule = () => {
        setOpenFirst(false);
        setOpenSchedule(true);
    };

    const onText = (e) => {
        setText(e.target.value);
    };

    const onShowDetail = () => {
        setOpenAddPaymentMethod(true);
        setOpenSecond(false);
    };

    const onHideDetail = () => {
        setOpenAddPaymentMethod(false);
        setOpenSecond(true);
    };

    const onSuccess = () => {
        setOpenSecond(false);
        setOpenSuccess(true);
    };

    const onFailed = () => {
        setOpenSecond(false);
        setOpenFailed(true);
    };

    const onCloseSuccess = () => {
        setOpenSuccess(false);
    };

    const onCloseFailed = () => {
        setOpenFailed(false);
    };

    const onAddPayment = () => {
        setOpenAddPaymentMethod(false);
        setOpenSecond(true);
    };

    const onCloseAddPaymentMethod = () => {
        setOpenAddPaymentMethod(false);
    };

    const onBackAddPaymentMethod = () => {
        setOpenAddPaymentMethod(false);
        setOpenSecond(true);
    };

    const onOpenAddPaymentMethod = () => {
        setOpenSecond(false);
        setOpenAddPaymentMethod(true);
    };

    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getWeekDays = (i: number) => {
        const days = [];
        days.push(`${MONTHS[moment().add(i, 'days').toDate().getMonth()]} ${moment().add(i, 'days').toDate().getDate()}`);
        days.push(
            `${
                MONTHS[
                    moment()
                        .add(i + 6, 'days')
                        .toDate()
                        .getMonth()
                ]
            } ${moment()
                .add(i + 6, 'days')
                .toDate()
                .getDate()}`,
        );
        setStartDate(days[0]);
        setEndDate(days[1]);
    };

    const onPrevWeek = () => {
        setToday(today - 7);
    };

    const onNextWeek = () => {
        setToday(today + 7);
    };

    const onSchedule = (e) => {
        setTSchedule(e);
        isSingle(e);
        getMinTime(e);
        calcTotalTime(e);
    };

    const isSingle = (range: Array<any>) => {
        if (range.length === 0) {
            setSingle(false);
        } else {
            range.sort((a, b) => a - b);
            for (let i = 0; i < range.length - 1; i++) {
                const d1 = new Date(range[i]);
                const d2 = new Date(range[i + 1]);
                const d1FullHours = d1.getHours() + d1.getMinutes() / 60;
                const d2FullHours = d2.getHours() + d2.getMinutes() / 60;
                const d1Day = d1.getDate();
                const d2Day = d2.getDate();
                if (d1Day !== d2Day) {
                    setSingle(false);
                    setSelected(false);
                    return;
                }
                if (d2FullHours - d1FullHours > 0.5) {
                    setSingle(false);
                    setSelected(false);
                    return;
                } else {
                    setSingle(true);
                    setSelected(true);
                }
            }
        }
    };

    const calcTotalTime = (range: Array<any>) => {
        setTotlaTime(30 * range.length);
    };

    const getMinTime = (range: Array<any>) => {
        if (range.length === 0) {
            setScheduleTime('');
            setScheduleDate('');
        } else {
            range.sort((a, b) => a - b);
            const dMin = new Date(range[0]);
            const dMax = new Date(range[range.length - 1]);
            setScheduleTime(`${dMin.getHours()}:${dMin.getMinutes()} - ${dMax.getHours()}:${dMax.getMinutes()}`);
            setScheduleDate(`${MONTHS[dMin.getMonth()]}${dMin.getDate()}, ${dMin.getFullYear()}`);
        }
    };

    useEffect(() => {
        getWeekDays(today);
    }, [getWeekDays, today]);

    return (
        <Container>
            <UIForm formik={formik}>
                <Header />
                <UINavigation />
                <Content style={{ maxWidth: '1440px' }}>
                    <PageContentWrapper id={id}>
                        <MainContentWrapper>
                            <UIBox justifyContent="space-between" alignItems="baseline" gap={40} className={classes.profileContainer}>
                                <Div>
                                    <UIHeading devider={false} header={`About ${TUTOR_DATA.name}`} />
                                    <UISpacer height={15}></UISpacer>
                                    <UICard flat border leftBordered style={{ padding: '10px 20px' }}>
                                        <ProfileContent>I am a Senior Product designer at a startup. I also freelance regularly and have worked in dozens of industries and across many products. I have over 7 years of professional experience. I also have a degree in advertising design. I've worked at agencies, consultancies, SaaS companies, startups, and enterprises. I credit having amazing mentors to my success as a designer today, and I'd love to be able to mentor others. I have experience mentoring several interns and junior team members that have worked with me as well. I can help with portfolio development, day to day career goals, reviewing design projects, freelance questions, startup questions, presentation advice, or just general conversation.</ProfileContent>
                                    </UICard>
                                </Div>
                                <UIBox direction="column" justifyContent="center" style={{ width: '310px' }}>
                                    <Avatar src={TUTOR_DATA.avatar} alt="avatar" />
                                    <UISpacer height={10}></UISpacer>

                                    <UIBox alignItems="center" justifyContent="center">
                                        <Name>Rhonda Rhodes</Name>
                                        <UISpacer width={5}></UISpacer>
                                        <Level>She/He/Hers</Level>
                                    </UIBox>
                                    <UISpacer height={10}></UISpacer>
                                    <NewUIRating value={TUTOR_DATA.rate} style={{ zoom: '1.2', width: '100%', justifyContent: 'center' }}></NewUIRating>
                                    <UISpacer height={20}></UISpacer>
                                    <UIButton color="second" style={{ width: '90%', margin: '0 auto' }}>
                                        <MessageIcon></MessageIcon>
                                        Send message
                                    </UIButton>
                                    <UISpacer height={10}></UISpacer>
                                    <UIButton color="second" style={{ width: '90%', margin: '0 auto' }} onClick={onOpen}>
                                        <CalendarIcon />
                                        Book session
                                    </UIButton>
                                </UIBox>
                            </UIBox>
                            <DivContainer>
                                <UIHeading header="Experience" subheader="Some fun facts about Rhonda's experience with Rhizo"></UIHeading>
                                <UISpacer height={20}></UISpacer>
                                <UIBox gap={20} justifyContent="space-between" className={classes.cardContainer}>
                                    <UICard flat border style={{ margin: 'auto', height: '120px', minWidth: '100px', flexGrow: 1 }}>
                                        <UIBox gap={20} alignItems="center">
                                            <ClockCircleIcon />
                                            <div>
                                                <Value>235</Value>
                                                <UISpacer height={7}></UISpacer>
                                                <Exp>Hours taught</Exp>
                                            </div>
                                        </UIBox>
                                    </UICard>
                                    <UICard flat border style={{ margin: 'auto', height: '120px', minWidth: '100px', flexGrow: 1 }}>
                                        <UIBox gap={20} alignItems="center">
                                            <InstiCircleIcon />
                                            <div>
                                                <Value>235</Value>
                                                <UISpacer height={7}></UISpacer>
                                                <Exp>Total Sessions</Exp>
                                            </div>
                                        </UIBox>
                                    </UICard>
                                    <UICard flat border style={{ margin: 'auto', height: '120px', minWidth: '100px', flexGrow: 1 }}>
                                        <UIBox gap={20} alignItems="center">
                                            <StarCircleIcon />
                                            <div>
                                                <Value>4.6</Value>
                                                <UISpacer height={7}></UISpacer>
                                                <Exp>Average Rating</Exp>
                                            </div>
                                        </UIBox>
                                    </UICard>
                                </UIBox>
                            </DivContainer>
                            <UISpacer height={40}></UISpacer>
                            <CourseContainer>
                                <UIHeading header="Courses"></UIHeading>
                                <HList list={courseList} bottomWrapper={false} detail={false} />
                            </CourseContainer>
                            <UIHeading header="Available locations" subheader="Mentor have difference preferences for teaching styles and location. Here are Rhonda's preferred locations"></UIHeading>
                            <UISpacer height={30}></UISpacer>
                            <LocationContainer>
                                <UIBox alignItems="center">
                                    <TickWithCircleIcon />
                                    <UISpacer width={15}></UISpacer>
                                    <p>Online</p>
                                </UIBox>
                                <UISpacer height={10}></UISpacer>
                                <UIBox alignItems="center">
                                    <TickWithCircleIcon />
                                    <UISpacer width={15}></UISpacer>
                                    <p>In-person</p>
                                </UIBox>
                            </LocationContainer>
                            <UISpacer height={50}></UISpacer>
                            <ReviewsContainer>
                                <UIHeading header="Reviews" subheader="Mentors have different preferences for teaching styles and location. Here are Rhonda's preferred locations">
                                    <UIButton color="basicline">
                                        <FilterListIcon />
                                    </UIButton>
                                </UIHeading>
                                <UISpacer height={25}></UISpacer>
                                <UIBox gap={20} style={{ flexWrap: 'wrap' }}>
                                    <Items>
                                        <p>Convenience</p>
                                        <NewUIRating value={REVIEWS.convenience}></NewUIRating>
                                    </Items>
                                    <Items>
                                        <p>Method</p>
                                        <NewUIRating value={REVIEWS.method}></NewUIRating>
                                    </Items>
                                    <Items>
                                        <p>Clarity</p>
                                        <NewUIRating value={REVIEWS.clarity}></NewUIRating>
                                    </Items>
                                    <Items>
                                        <p>Reviews</p>
                                        <NewUIRating value={REVIEWS.reviews}></NewUIRating>
                                    </Items>
                                </UIBox>
                                <UISpacer height={30}></UISpacer>
                                <UIDevider></UIDevider>
                                <UISpacer height={25}></UISpacer>
                                <FeedbackContainer ref={myRef}>
                                    {DATA.currentData().map((data: any, index: any) => (
                                        <UIFeedback name={data.student} avatar={data.avatar} sessionNumber={data.sessionNumber} rate={data.rate} totalHours={data.totalHours} feedback={data.feedback} key={index}></UIFeedback>
                                    ))}
                                </FeedbackContainer>
                                <PageContainer className={classes.root}>{count > 1 && <Pagination count={count} size="large" page={page} onChange={handleChange} />}</PageContainer>
                                <UISpacer height={100}></UISpacer>
                            </ReviewsContainer>
                        </MainContentWrapper>

                        <UICustomModal title="Schedule a session" subTitle="Add a new course to your profile." onClose={onCloseFirst} open={openFirst} onSave={onSaveFirst} hideBack>
                            <UISpacer height={20}></UISpacer>
                            <UIBox justifyContent="start" alignItems="center">
                                <UIBox gap={10} alignItems="flex-start">
                                    <ModalAvatar src={TUTOR_DATA.avatar} alt="avatar" />
                                    <div>
                                        <UIBox justifyContent="start">
                                            <UIBox alignItems="center" gap={10}>
                                                <Name>{TUTOR_DATA.name}</Name>
                                                <Subject>{TUTOR_DATA.subject}</Subject>
                                            </UIBox>
                                        </UIBox>
                                        <NewUIRating value={TUTOR_DATA.rate}></NewUIRating>
                                    </div>
                                </UIBox>
                                <UISpacer width={40}></UISpacer>
                                <HourlyRate>${TUTOR_DATA.hourlyRate}/hr</HourlyRate>
                            </UIBox>
                            <UISpacer height={50}></UISpacer>
                            <UIBox alignItems="center" className={classes.formContainer}>
                                <CalendarIcon />
                                <UISpacer width={25}></UISpacer>
                                {selected ? (
                                    <BookContainer onClick={onFirstToSchedule} className={classes.select}>
                                        <UIBox direction="column" style={{ width: '100%' }}>
                                            <BookDate>{realDate}</BookDate>
                                            <UISpacer height={10}></UISpacer>
                                            <BookTime style={{ paddingLeft: '0' }}>
                                                {realSchedule[0]}&nbsp;&nbsp;{realSchedule[1]}&nbsp;min
                                            </BookTime>
                                        </UIBox>
                                    </BookContainer>
                                ) : (
                                    <ScheduleSelect onClick={onFirstToSchedule}>Select a time</ScheduleSelect>
                                )}
                            </UIBox>
                            <UISpacer height={10}></UISpacer>
                            <UIBox alignItems="center" className={classes.formContainer}>
                                <MeetingTypeIcon />
                                <UISpacer width={25}></UISpacer>
                                <UISelectField id="meetin-type" name="meeting-type" options={MeetingOptions} onChange={onSelectMeeting}></UISelectField>
                            </UIBox>
                            <UIBox alignItems="center" className={classes.formContainer}>
                                <LocationPinIcon />
                                <UISpacer width={25}></UISpacer>
                                <UISelectField id="meetin-type" name="meeting-type" options={list}></UISelectField>
                            </UIBox>
                            <Label>Select or input course name</Label>
                            <UISpacer height={10}></UISpacer>
                            <UIAutoComplete creatable id={`major-tags`} name={`major-tags`} placeholder="Select major" multiple groupType="tag-inside" options={tagOptions} activity={searchState.tag.loading} onSearch={(x) => dispatch(requestTagQuery({ query: x }))} onChange={(x) => onChange(2, x)} selection={item.tags} defaultValue={[]} />
                            <UISpacer height={20}></UISpacer>
                            <Label>Additional session notes</Label>
                            <UISpacer height={10}></UISpacer>
                            <UITextAreaField name="notes" value={text} onChange={onText}></UITextAreaField>
                            <UISpacer height={40}></UISpacer>
                            <NewFileUpload />
                            <ButtonsContainer>
                                <UIButton color="basicline" onClick={onFirstCancel}>
                                    Cancel
                                </UIButton>
                                <UIButton color="second" onClick={onFirstToSecond}>
                                    Next
                                </UIButton>
                            </ButtonsContainer>
                        </UICustomModal>

                        <UICustomModal title="Select time" open={openSchedule} onBack={onScheduleCancel} onClose={() => setOpenSchedule(false)} hideBack={false} hideClose onSave={null}>
                            <AddText>Pick a timeslot to book your session</AddText>
                            <UISpacer height={10}></UISpacer>
                            <UIBox justifyContent="space-between">
                                <ArrowContainer onClick={onPrevWeek}>
                                    <ArrowLeftIcon />
                                </ArrowContainer>
                                <Week>
                                    {startDate} - {endDate}
                                </Week>
                                <ArrowContainer onClick={onNextWeek}>
                                    <ArrowRightIcon />
                                </ArrowContainer>
                            </UIBox>
                            <UISpacer height={10}></UISpacer>
                            <TutorScheduler onSchedule={(x) => onSchedule(x)} />
                            <UISpacer height={20}></UISpacer>
                            {single ? (
                                <BookContainer>
                                    <UIBox direction="column" style={{ width: '50%' }}>
                                        <UIBox alignItems="center">
                                            <CalendarIcon />
                                            <UISpacer width={20}></UISpacer>
                                            <BookDate>{scheduleDate}</BookDate>
                                        </UIBox>
                                        <UISpacer height={10}></UISpacer>
                                        <BookTime>
                                            {scheduleTime}&nbsp;{totalTime}&nbsp;min
                                        </BookTime>
                                    </UIBox>
                                </BookContainer>
                            ) : (
                                <Warn>
                                    <WarnIcon />
                                    <UISpacer width={8}></UISpacer>
                                    <WarningText>Please select a single time to book a session.</WarningText>
                                </Warn>
                            )}
                            <UISpacer height={50}></UISpacer>
                            <ButtonsContainer>
                                <UIButton color="basicline" onClick={onScheduleCancel}>
                                    Cancel
                                </UIButton>
                                <UIButton color="second" onClick={selected ? onScheduleConfirm : null}>
                                    Confirm
                                </UIButton>
                            </ButtonsContainer>
                        </UICustomModal>

                        <UICustomModal title="Select payment" open={openSecond} onBack={onSecondToFirst} onClose={() => setOpenSecond(false)} hideBack={false} hideClose onSave={null}>
                            <UISpacer height={20}></UISpacer>
                            <UIBox justifyContent="start" alignItems="center">
                                <UIBox gap={10} alignItems="flex-start">
                                    <ModalAvatar src={TUTOR_DATA.avatar} alt="avatar" />
                                    <div>
                                        <UIBox justifyContent="start">
                                            <UIBox alignItems="center" gap={10}>
                                                <Name>{TUTOR_DATA.name}</Name>
                                                <Subject>{TUTOR_DATA.subject}</Subject>
                                            </UIBox>
                                        </UIBox>
                                        <NewUIRating value={TUTOR_DATA.rate}></NewUIRating>
                                    </div>
                                </UIBox>
                                <UISpacer width={40}></UISpacer>
                                <HourlyRate>${TUTOR_DATA.hourlyRate}/hr</HourlyRate>
                            </UIBox>
                            <UISpacer height={25}></UISpacer>
                            <Course>ECON 101 Review</Course>
                            <UISpacer height={10}></UISpacer>
                            <Detail> | {totalTime}&nbsp;MIN | ONLINE</Detail>
                            <UISpacer height={40}></UISpacer>
                            <Label>Select a payment method</Label>
                            <UISpacer height={10}></UISpacer>
                            <SubLabel>Select from one of your saved payment methods or add a new payment method.</SubLabel>
                            <UISpacer height={15}></UISpacer>
                            {/* <PaymentMethodListing style={{ width: '100%' }} paymentList={PAYMENT_METHOD_LIST} selectable={true} buttonAction={false} /> */}
                            {PAYMENT_METHOD_LIST.map((x, i) => (
                                <UIBox style={{ borderBottom: `1px solid ${ThemeColor.border}` }}>
                                    <RadioGroup value={value} onChange={onChangeRadio}>
                                        <PaymentMethodItem type={x.type} name={x.name} icon={<x.icon />} digits={x.digits} validity={x.validity} email={x.email} selectable={true} buttonAction={false} style={{ height: '82px' }} />
                                    </RadioGroup>
                                </UIBox>
                            ))}
                            <UISpacer height={40}></UISpacer>
                            <Label>New Payment Method</Label>
                            <AddPaymentMethod style={{ width: '100%' }} paymentList={NEW_PAYMENT_METHOD} onClick={onShowDetail} buttonAction={false} />
                            <UISpacer height={10}></UISpacer>
                            <ButtonsContainer>
                                <UIButton color="second" onClick={onCloseSecond}>
                                    Cancel
                                </UIButton>
                                <UIButton color="second" onClick={success ? onSuccess : onFailed}>
                                    Confirm
                                </UIButton>
                            </ButtonsContainer>
                        </UICustomModal>

                        <UICustomModal open={openAddPaymentMethod} onClose={onCloseAddPaymentMethod} onBack={onBackAddPaymentMethod}>
                            <UISpacer height={20}></UISpacer>
                            <Label>Name on card</Label>
                            <UITextField id="cardName" name="cardName" style={{ width: '100%' }} placeholder="Name on card" />
                            <CardNumber>
                                <UIBox direction="column">
                                    <Label>Card number</Label>
                                    <UITextField id="cardNumber" name="cardNumber" icon={VisaIcon} />
                                </UIBox>
                                <UIBox direction="column">
                                    <UIBox alignItems="center">
                                        <Label>CVC</Label>
                                        <UISpacer width={10}></UISpacer>
                                        <QuestionIcon />
                                    </UIBox>
                                    <UITextField id="cvc" name="cvc" placeholder="CVC" />
                                </UIBox>
                            </CardNumber>
                            <ExpireContainer>
                                <div>
                                    <UIBox alignItems="center">
                                        <Label>Expiration</Label>
                                        <UISpacer width={10}></UISpacer>
                                        <QuestionIcon />
                                    </UIBox>
                                    <UIDatePicker id="expire" name="expire" />
                                </div>
                                <div>
                                    <Label>Zipcode</Label>
                                    <UITextField id="zipcode" name="zipcode" placeholder="zipcode" />
                                </div>
                            </ExpireContainer>
                            <UIBox justifyContent="end">
                                <UICheckBox id="default" name="default" label="Set as default?" checked />
                            </UIBox>

                            <UISpacer height={10}></UISpacer>
                            <ButtonsContainer>
                                <UIButton color="second" onClick={onHideDetail}>
                                    Cancel
                                </UIButton>
                                <UIButton color="second" onClick={onAddPayment}>
                                    Add
                                </UIButton>
                            </ButtonsContainer>
                        </UICustomModal>

                        <UICustomModal title="Success!" onClose={onCloseSuccess} open={openSuccess} hideBack>
                            <Label>Your session request has been successfully scheduled. It is now awaiting approval by mentor.</Label>
                            <UISpacer height={20}></UISpacer>
                            <CardContainer>
                                <SuccessImage />
                            </CardContainer>
                        </UICustomModal>
                        <UICustomModal title="Uh-oh!" onClose={onCloseFailed} open={openFailed} hideBack>
                            <Label>It appears that something had gone wrong. We couldn't schedule your session at the moment. Please try again later.</Label>
                            <UISpacer height={20}></UISpacer>
                            <CardContainer>
                                <FailedImage />
                            </CardContainer>
                        </UICustomModal>
                    </PageContentWrapper>
                </Content>
            </UIForm>
        </Container>
    );
};

MySession.defaultProps = {};

export default MySession;
