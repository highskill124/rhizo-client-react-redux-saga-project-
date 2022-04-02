import React, { FC, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@mui/material';
import { useFormik } from 'formik';
import SessionCard from './UISessionCards';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import NewUITitle from '../../ui-kit/core/NewUITitle';
import UISpacer from './UISpacer';
import UIButton from '../button/UIButton';
import UIEmptyPage from '../pages/UIEmptyPage';
import usePagination from './UIPagination';
import UIForm from '../form/UIForm';
import UISelectField from '../form/UISelectField';
import { Device } from '../../settings/Device';
import UIPaginations from './UIPaginations';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    padding: 20px 0px 20px 0px;
    background-color: ${ThemeColor.white};
    > h4 {
        font-style: normal;
        font-weight: ${FontWeight.medium};
        font-size: ${FontSize.xxl};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.grey45};
        padding: 0px;
        margin: 0px 8px 8px 0px;
    }
`;

const ContentWrapper = styled.div<any>`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0px 0px 0px 0px;
    // padding-right: 20%;
    grid-gap: 15px;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    margin: 0px 0px 0px 0px;
    @media (max-width: ${Device.laptopLarge - 1}px) {
        padding: 0;
        grid-gap: 0;
    }
    @media (min-width: ${Device.tablet}px) and (max-width: 860px) {
        grid: none;
    }
    @media (max-width: 729px) {
        grid: none;
    }
`;

const Div = styled.div`
    margin: 20px auto;
`;

const useStyles = makeStyles((theme) => ({
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

const typeToTitle = {
    approved: 'Upcoming',
    all: 'All Sessions',
    schedule: "Today's Schedule",
    completed: 'Completed',
    dispute: 'Disputes',
    pending: 'Session awaiting approval',
};
interface IProps {
    className?: string;
    id?: string;
    style?: any;
    data: any;
    sessionType: string;
    userType?: boolean;
    initialNumber?: number;
    scheduleInitial?: number;
    header?: boolean;
    viewAll?: boolean;
    showMoreButton?: boolean;
}

const SessionContainer: FC<IProps> = (props) => {
    const { id, data, sessionType, userType, showMoreButton, style, viewAll, header, className, initialNumber, scheduleInitial } = props;
    const classes = useStyles();

    // SHOW MORE AND SHOW LESS BUTTON FUNCTIONS
    const initialLimit = initialNumber || 4;
    const scheduleInitialLimit = scheduleInitial || 4;

    const [limit, setLimit] = useState<number>(initialLimit);
    const [scheduleLimit, setScheduleLimit] = useState<number>(scheduleInitialLimit);

    const showMore = () => {
        setLimit(limit + initialLimit);
        setScheduleLimit(scheduleLimit + scheduleInitialLimit);
    };

    const viewAllFunction = () => {
        setLimit(data.length);
    };

    const showLess = () => {
        setLimit(initialLimit);
        setScheduleLimit(scheduleInitialLimit);
    };

    useEffect(() => {
        if (viewAll) {
            viewAllFunction();
        } else {
            showLess();
        }
    }, [viewAll]);

    // PAGINATION FOR ALL AND SHEDULE PART FUNCTIONS
    const [page, setPage] = useState(1);
    const PER_PAGE = 12;

    const count = Math.ceil(data.length / PER_PAGE);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const _DATA = usePagination(data, PER_PAGE);

    const myRef = useRef(null);
    const handleChange = (e: any, p: any) => {
        setPage(p);
        _DATA.jump(p);
        myRef.current.scrollIntoView();
    };

    const list = [
        { value: 'all', label: 'All' },
        { value: '3', label: '3' },
    ];

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values: any) => {},
    });

    return (
        <Wrapper id={id} style={style} className={className}>
            <UIForm formik={formik} style={{ width: '100%' }}>
                {header && (
                    <NewUITitle header={typeToTitle[sessionType]} subheader={sessionType === 'pending' ? 'Here are your upcoming sessions for today' : null}>
                        {(sessionType === 'all' || sessionType === 'pending' || sessionType === 'dispute') && <UISelectField name="all" options={list} />}
                    </NewUITitle>
                )}
                <UISpacer height={20}></UISpacer>
                <ContentWrapper ref={myRef}>
                    {data.length === 0 && <UIEmptyPage type={sessionType} />}
                    {data.length &&
                        (sessionType === 'pending' || sessionType === 'approved') &&
                        data.slice(0, limit).map((item: any, i: any) => {
                            return <SessionCard status={item.status} session={item.session} profileName={item.profileName} message={item.message} course={item.course} avatar={item.avatar} date={item.meetingDate} time={item.meetingTime} duration={item.meetingDuration} isOnline={item.isOnline} ratings={item.ratings} meetingLocation={item.meetingLocation} subject={item.subject} payment={item.payment} gender={item.gender} type={userType ? 'tutor' : 'student'} />;
                        })}
                    {data.length &&
                        sessionType === 'schedule' &&
                        data.slice(0, scheduleLimit).map((item: any, i: any) => {
                            return <SessionCard status={item.status} session={item.session} profileName={item.profileName} message={item.message} course={item.course} avatar={item.avatar} date={item.meetingDate} time={item.meetingTime} duration={item.meetingDuration} isOnline={item.isOnline} ratings={item.ratings} meetingLocation={item.meetingLocation} subject={item.subject} payment={item.payment} gender={item.gender} type={userType ? 'tutor' : 'student'} />;
                        })}
                    {data.length && (sessionType === 'all' || sessionType === 'dispute') && (
                        <>
                            {_DATA.currentData().map((item: any, i: any) => {
                                return <SessionCard status={item.status} session={item.session} profileName={item.profileName} message={item.message} course={item.course} avatar={item.avatar} date={item.meetingDate} time={item.meetingTime} duration={item.meetingDuration} isOnline={item.isOnline} ratings={item.ratings} meetingLocation={item.meetingLocation} subject={item.subject} payment={item.payment} gender={item.gender} type={userType ? 'tutor' : 'student'} disputeReason={item.disputeReason} disputeMessage={item.disputeMessage} />;
                            })}
                        </>
                    )}
                </ContentWrapper>
                {showMoreButton && (
                    <Div className={classes.root}>
                        {(sessionType === 'pending' || sessionType === 'approved' || sessionType === 'schedule') &&
                            (data.length > limit ? (
                                <UIButton color="basicline" onClick={showMore}>
                                    Show more
                                </UIButton>
                            ) : (
                                data.length !== 0 &&
                                data.length < limit && (
                                    <UIButton color="basicline" onClick={showLess}>
                                        Show less
                                    </UIButton>
                                )
                            ))}
                        {count > 1 && (sessionType === 'all' || sessionType === 'dispute') && <UIPaginations count={count} size="large" page={page} onChange={handleChange} />}
                    </Div>
                )}
            </UIForm>
        </Wrapper>
    );
};

SessionContainer.defaultProps = {
    header: true,
    showMoreButton: true,
};

export default SessionContainer;
