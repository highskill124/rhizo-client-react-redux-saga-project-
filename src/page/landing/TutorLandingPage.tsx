import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/state/RootReducer';
import SessionContainer from '../../ui-kit/core/UISessions';
import Content from '../common/Content';
import UIButton from '../../ui-kit/button/UIButton';
import Header from '../common/Header';
import UIForm from '../../ui-kit/form/UIForm';
import UIBox from '../../ui-kit/layout/UIBox';
import EarningChart from '../settings/earning/EarningChart';
import UINavigation from '../common/UINavigation';
import UISpacer from '../../ui-kit/core/UISpacer';
import UICustomModal from '../../ui-kit/core/UICustomModal';
import { HMorelIcon } from '../../ui-kit/icon/UIIconAssets';
import { Device } from '../../settings/Device';
import { Margin } from '../../settings/Margin';
import UIHeading from '../../ui-kit/core/UIHeading';
import { FontSize } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import { TodaySchedule } from './temp-data/data';
import UITextField from '../../ui-kit/form/UITextField';

export const PageContentWrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    flex: 1;
    margin: 0px !important;
    overflow: hidden;
    @media (max-width: 1289px) {
        flex-direction: column;
        overflow-y: auto;
    }
    @media (max-width: ${Device.mobileMedium - 1}px) {
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

export const MainContentWrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 1;
    align-self: stretch;
    padding: 20px;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
    }
    @media (max-width: 1289px) {
        overflow: unset;
    }
`;

export const RightContainer = styled.div`
    width: 340px;
    padding: 20px;
    background: ${ThemeColor.white};
    overflow: auto;
    max-height: 100%;
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
    }
    > div:nth-child(2) {
        > form {
            > div {
                display: flex;
            }
        }
    }
    @media (max-width: 1289px) {
        width: 100%;
        max-height: none;
        overflow: unset;
        .tablet-hidden {
            display: none;
        }
        > div:nth-child(2) {
            > form {
                > div {
                    display: grid;
                }
            }
        }
    }
`;

const Container = styled.div``;

const Course = styled.div`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.lg};
    margin: 0;
`;

const CourseContainer = styled.div`
    width: 100%;
    padding: 25px 0;
    border-bottom: 1px solid ${ThemeColor.border};
`;

const HMoreContainer = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: ${ThemeColor.secondLight};
    transform: rotate(90deg);
    padding: 4px 7px;
    > svg {
        * {
            fill: ${ThemeColor.secondDark};
        }
    }
    &:hover {
        cursor: pointer;
    }
`;

const ModalButtonsContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: end;
    align-items: center;
    gap: 20px;
`;

const DivContainer = styled.div`
    padding: 10px 10px;
`;

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        maxWidth: '1440px',
    },
    tabnav: {},
}));
interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
}

const SUBJECTS = [
    { subject: 'CS 10', courseNumber: '10' },
    { subject: 'ECON 105', courseNumber: '10' },
    { subject: 'CS 61A', courseNumber: '10' },
];

const TutorLandingPage: FC<IProps> = (props) => {
    const classes = useStyles();
    const { id } = props;
    const [viewAll, setViewAll] = useState(false);
    const isTutor = useSelector<RootState, boolean>((s) => s.profileState.user.isTutor);
    const [viewScheduleAll, setViewScheduleAll] = useState(false);
    const [openAddCourseModal, setOpenAddCourseModal] = useState(false);
    const [major, setMajor] = useState('');
    const [courseNumber, setCourseNumber] = useState('');
    const formik = useFormik({
        initialValues: {},
        onSubmit: (values: any) => {},
    });

    const EARNING = [10, 20, 40, 15, 5, 53, 12, 38];

    const DATE = ['text', 'text', 'text', 'text', 'text', 'text', 'text', 'text'];

    const state = {
        series: [
            {
                name: 'earning',
                data: EARNING,
            },
        ],
        options: {
            colors: [`${ThemeColor.primary}`],
            chart: {
                height: 350,
                type: 'line',
                toolbar: {
                    show: false,
                },
            },
            tooltip: {
                shared: false,
                intersect: true,
            },
            grid: {
                show: false,
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'straight',
            },
            xaxis: {
                categories: DATE,
            },
        },
    };

    const onViewAll = () => {
        setViewAll(!viewAll);
    };

    const onViewScheduleAll = () => {
        setViewScheduleAll(!viewScheduleAll);
    };

    const onOpenAddCourseModal = () => {
        setOpenAddCourseModal(true);
    };

    const handleMajor = (e) => {
        setMajor(e.target.value);
    };

    const handleCourseNumber = (e) => {
        setCourseNumber(e.target.value);
    };

    const handleCancel = () => {
        setCourseNumber(null);
        setMajor(null);
        setOpenAddCourseModal(false);
    };

    const handleConfirm = () => {
        setCourseNumber(null);
        setMajor(null);
        setOpenAddCourseModal(false);
    };

    const onCloseModal = () => {
        setOpenAddCourseModal(false);
    };

    return (
        <Container>
            <Header />
            <UINavigation />
            <Content style={{ maxWidth: '1440px' }}>
                <PageContentWrapper id={id}>
                    <MainContentWrapper>
                        <UIHeading header="Sessions awaiting approval" subheader="Here are your upcoming sessions for this today.">
                            <UIButton color="basicline" size="small" onClick={onViewAll}>
                                {viewAll ? 'Show Less' : 'View All'}
                            </UIButton>
                        </UIHeading>
                        <SessionContainer data={TodaySchedule} sessionType="pending" initialNumber={2} header={false} viewAll={viewAll} showMoreButton={false} />
                        <UISpacer height={30}></UISpacer>
                        <UIHeading header="This week's earnings" subheader="Add, edit or delete your saved payment."></UIHeading>
                        <EarningChart options={state.options} series={state.series} earning={EARNING} date={DATE} style={{ width: '100%' }} />
                        <UISpacer height={30}></UISpacer>
                        <UIHeading header="This week" subheader="Here are your upcoming sessions for this today.">
                            <UIButton color="basicline" size="small" onClick={onViewAll}>
                                {viewAll ? 'Show Less' : 'View All'}
                            </UIButton>
                        </UIHeading>
                        <SessionContainer data={TodaySchedule} sessionType="pending" initialNumber={2} header={false} viewAll={viewAll} showMoreButton={false} />
                    </MainContentWrapper>
                    <RightContainer>
                        <UIHeading header="Today's Schedule" subheader="Here are your upcoming sessions for today.">
                            <UIButton color="basicline" size="small" onClick={onViewScheduleAll}>
                                {viewScheduleAll ? 'Show Less' : 'View All'}
                            </UIButton>
                        </UIHeading>
                        <SessionContainer data={TodaySchedule} sessionType="approved" header={false} initialNumber={2} viewAll={viewScheduleAll} showMoreButton={false} />
                        <DivContainer>
                            <UIHeading header="Current Classes" fullWidthSubheader="Help up customize your Rhizo experience"></UIHeading>
                            {SUBJECTS.map((item, index) => (
                                <CourseContainer>
                                    <UIBox justifyContent="space-between" alignItems="center" key={index}>
                                        <Course>{item.subject}</Course>
                                        <HMoreContainer>
                                            <HMorelIcon />
                                        </HMoreContainer>
                                    </UIBox>
                                </CourseContainer>
                            ))}
                            <UISpacer height={20}></UISpacer>
                            <UIButton color="second" style={{ width: '100%' }} onClick={onOpenAddCourseModal}>
                                Add new Course
                            </UIButton>
                        </DivContainer>
                        <UISpacer height={50}></UISpacer>
                    </RightContainer>
                    <UICustomModal open={openAddCourseModal} onClose={onCloseModal} title="Add new course" hideBack>
                        <UIForm formik={formik} style={{ width: '100%' }}>
                            <UIBox gap={20}>
                                <UITextField name="major" label="Major" value={major} onChange={handleMajor}></UITextField>
                                <UITextField name="major" label="Course Number" value={courseNumber} onChange={handleCourseNumber}></UITextField>
                            </UIBox>
                            <UISpacer height={40}></UISpacer>
                            <ModalButtonsContainer>
                                <UIButton color="second" onClick={handleConfirm}>
                                    Confirm
                                </UIButton>
                                <UIButton color="basicline" onClick={handleCancel}>
                                    Cancel
                                </UIButton>
                            </ModalButtonsContainer>
                        </UIForm>
                    </UICustomModal>
                </PageContentWrapper>
            </Content>
        </Container>
    );
};

TutorLandingPage.defaultProps = {};

export default TutorLandingPage;
