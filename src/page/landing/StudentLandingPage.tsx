import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/state/RootReducer';
import SessionContainer from '../../ui-kit/core/UISessions';
import MentorLookup from '../../ui-kit/widget/MentorLookup';
import Content from '../common/Content';
import UIButton from '../../ui-kit/button/UIButton';
import Header from '../common/Header';
import UIForm from '../../ui-kit/form/UIForm';
import UIBox from '../../ui-kit/layout/UIBox';
import UINavigation from '../common/UINavigation';
import UISpacer from '../../ui-kit/core/UISpacer';
import UICustomModal from '../../ui-kit/core/UICustomModal';
import UIButtonBase from '../../ui-kit/button/UIButtonBase';
import { StudentProfileBanner, ArrowRightWithTagIcon, HMorelIcon } from '../../ui-kit/icon/UIIconAssets';
import { Device } from '../../settings/Device';
import { Margin } from '../../settings/Margin';
import UIHeading from '../../ui-kit/core/UIHeading';
import { FontWeight, FontSize, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import { TodaySchedule } from './temp-data/data';
import UITextField from '../../ui-kit/form/UITextField';

const PageContentWrapper = styled.div<Partial<IProps>>`
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

const MainContentWrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 1;
    align-self: stretch;
    padding: 20px;
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
    @media (max-width: 1289px) {
        overflow: unset;
    }
`;

const RightContainer = styled.div`
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

const Banner = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    background: ${ThemeColor.primary};
    border-radius: 6px;
    @media (max-width: ${Device.mobileMedium - 1}px) {
        border-radius: 10px;
    }

    @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
        border-radius: 10px;
    }

    @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
        border-radius: 10px;
    }

    > div:nth-child(1) {
        width: 35%;
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        align-self: stretch;
        margin-left: 50px;

        @media (max-width: ${Device.mobileMedium - 1}px) {
            margin: 15px;
        }

        @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
            margin: 15px;
        }

        @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
            margin: 15px;
        }

        > h4 {
            font-style: normal;
            font-weight: ${FontWeight.bold};
            font-size: ${FontSize.xxxxl};
            line-height: ${LineHeight.md};
            letter-spacing: ${LetterSpacing.md};
            color: ${ThemeColor.white};
            margin: 0px;
            @media (max-width: ${Device.mobileMedium - 1}px) {
                font-size: ${FontSize.xxl};
                line-height: ${LineHeight.md};
            }

            @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
                font-size: ${FontSize.xxl};
                line-height: ${LineHeight.md};
            }
            @media (min-width: ${Device.tablet + 1}px) and (max-width: ${Device.laptop}px) {
                font-size: ${FontSize.xxxl};
                line-height: ${LineHeight.md};
            }
        }

        > button {
            position: relative;
            height: 40px;
            border-radius: 6px;
            background-color: ${ThemeColor.white};
            margin: 20px;
            padding: 0px 20px;
            font-style: normal;
            font-weight: ${FontWeight.bold};
            font-size: ${FontSize.md};
            line-height: ${LineHeight.md};
            letter-spacing: ${LetterSpacing.md};
            color: ${ThemeColor.primary};
            flex-shrink: 0;

            @media (max-width: ${Device.mobileMedium - 1}px) {
                align-self: stretch;
                margin: 15px 0px 0px 0px;
                height: 40px;
            }
            @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
                margin: 15px 0px 0px 0px;
                height: 40px;
            }
            @media (min-width: ${Device.tablet + 1}px) and (max-width: ${Device.laptop}px) {
                margin: 15px 0px 0px 0px;
                height: 40px;
            }

            &:hover {
                color: ${ThemeColor.primaryLight};
            }
        }
    }

    > div:nth-child(2) {
        width: 55%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-start;
        @media (max-width: ${Device.mobileMedium - 1}px) {
            display: none;
        }
        svg {
            width: 100%;
            height: auto;
        }
    }
`;

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

const StudentLandingPage: FC<IProps> = (props) => {
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
                        <UIHeading header="This week" subheader="Here are your upcoming sessions for this today.">
                            <UIButton color="basicline" size="small" onClick={onViewAll}>
                                {viewAll ? 'Show Less' : 'View All'}
                            </UIButton>
                        </UIHeading>
                        <SessionContainer data={TodaySchedule} sessionType="approved" initialNumber={2} header={false} viewAll={viewAll} showMoreButton={false} />
                        <UISpacer height={30}></UISpacer>
                        <Banner>
                            <div>
                                <h4>Berkeley mentors at your fingertips</h4>
                                <UIButtonBase>
                                    Explore now
                                    <UISpacer width={10}></UISpacer>
                                    <ArrowRightWithTagIcon />
                                </UIButtonBase>
                            </div>
                            <div>
                                <StudentProfileBanner />
                            </div>
                        </Banner>
                        <UISpacer height={50}></UISpacer>
                        <UIHeading devider={false} header="Mentor Search" subheader="Explore mentors teaching relevant courses, topics or majors"></UIHeading>
                        <MentorLookup />
                        <UISpacer height={50}></UISpacer>
                    </MainContentWrapper>
                    <RightContainer>
                        <UIHeading header="Today's Schedule" subheader="Here are your upcoming sessions for today.">
                            <UIButton color="basicline" size="small" onClick={onViewScheduleAll}>
                                {viewScheduleAll ? 'Show Less' : 'View All'}
                            </UIButton>
                        </UIHeading>
                        <SessionContainer data={TodaySchedule} sessionType="approved" header={false} initialNumber={2} viewAll={viewScheduleAll} showMoreButton={false} />
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

StudentLandingPage.defaultProps = {};

export default StudentLandingPage;
