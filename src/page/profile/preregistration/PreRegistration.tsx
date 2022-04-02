import React, { useEffect, useState, FC } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { AuthState } from '../../../store/state/AuthState';
import { RootState } from '../../../store/state/RootReducer';
import UIForm from '../../../ui-kit/form/UIForm';
import UISpacer from '../../../ui-kit/core/UISpacer';
import UIBox from '../../../ui-kit/layout/UIBox';
import UITabNav from '../../../ui-kit/navigation/tab/UITabNav';
import UITabPanel from '../../../ui-kit/navigation/tab/UITabPanel';
import UIButton from '../../../ui-kit/button/UIButton';
import ProfileSettings from '../../../ui-kit/widget/ProfileSettings';
import CourseList from '../../../ui-kit/core/CourseList';
import InviteCode from '../../../ui-kit/core/InviteCode';
import UIHeading from '../../../ui-kit/core/UIHeading';
import UITextAreaField from '../../../ui-kit/form/UITextAreaField';
import UITextFieldCustom from '../../../ui-kit/form/UITextFieldCustom';
import TutorSchedular from '../../../ui-kit/widget/TutorScheduler';
import { courseList } from '../../../util/mock-api/data/course-list';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';

const Container = styled.div`
    width: 90%;
    margin: 0 auto;
`;

const Title = styled.h4`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-family: Roboto;
    font-style: normal;
    font-weight: ${FontWeight.bold};
    font-size: 48px;
    text-align: center;
    line-height: ${LineHeight.md};
    display: flex;
    align-items: center;
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.grey45};
    margin: 0 auto;
    justify-content: center;
`;

const SubTitle = styled.p`
    color: ${ThemeColor.messages};
    font-size: ${FontSize.xxl};
    text-align: center;
    width: 70%;
    line-height: 30px;
    margin: 20px auto;
`;

const SmallHeader = styled.p`
    color: ${ThemeColor.secondDark};
    font-size: ${FontSize.label};
    font-weight: ${FontWeight.medium};
    text-align: center;
`;

const Currency = styled.div`
    height: 40px;
    width: 100px;
    border: 1px solid ${ThemeColor.border};
    border-radius: 10px 0 0 10px;
    color: ${ThemeColor.subtitle};
    padding: 12px;
    text-align: center;
    background-color: ${ThemeColor.basic};
`;

const Div = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
`;

const useStyles = makeStyles((theme) => ({
    courseContainer: {
        width: '100%',
    },
    tabs: {
        '& >div:nth-child(1)': {
            borderBottom: 'none',
            '& > div': {
                '&>div:nth-child(1)': {
                    display: 'block',
                    textAlign: 'center',
                    width: 'fit-content',
                    margin: '0 auto',
                    padding: 10,
                    border: `1px solid ${ThemeColor.border}`,
                    borderRadius: 10,
                },
                '&> .MuiTabs-indicator': {
                    marginBottom: 14,
                },
            },
        },
    },
}));

interface IPayload {
    email: string;
    password: string;
}

interface IProps {
    userType: string;
}

const PreRegistration: FC<IProps> = (props) => {
    const { userType } = props;
    // eslint-disable-next-line no-multi-str
    const initialProfile = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
    const initialRate = '200';
    const classes = useStyles();
    const dispatch = useDispatch();
    const authState = useSelector<RootState, AuthState>((state) => state.authState);
    const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
    const [value, setValue] = useState(initialProfile);
    const [editState, setEditState] = useState(true);
    const [rateEditState, setRateEditState] = useState(true);
    const [rate, setRate] = useState(initialRate);
    const [index, setIndex] = useState(0);
    const { state } = useLocation<any>();
    const history = useHistory();
    const [schedule, setSchedule] = useState([]);

    const user = userType;

    const tabLabels = [{ id: 'Profile', label: 'Profile' }, user === 'tutor' ? { id: 'Student Settings', label: 'Student Settings' } : { id: 'Mentor Settings', label: 'Mentor Settings' }];

    const handleChangeIndex = (x) => {
        setIndex(x);
    };

    const handleProfile = () => {
        setEditState(false);
    };

    const handleValue = (e) => {
        setValue(e.target.value);
    };

    const cancelEdit = () => {
        setRate(initialRate);
        setRateEditState(true);
    };

    const editRate = () => {
        setRateEditState(false);
    };

    const handleRate = (e) => {
        setRate(e.target.value);
    };

    const saveEdit = () => {
        setRateEditState(true);
        setRate(rate);
    };

    const handleSave = () => {
        setEditState(true);
    };

    const handleCancel = () => {
        setValue(initialProfile);
        setEditState(true);
    };

    const onSchedule = (e) => {
        setSchedule(e);
    };

    useEffect(() => {
        setRedirectToReferrer(authState.data.authenticated);
    }, [authState]);

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values: any) => {},
    });

    return (
        <Container>
            <SmallHeader>Pre-Registration</SmallHeader>
            <Title>Welcome to Rhizo, Andrew</Title>
            <SubTitle>While we await the official launch at Harvard, you can edit your public profile and mentor settings so that students can more easily identify you.</SubTitle>
            <UISpacer height={50}></UISpacer>
            <UIForm formik={formik} style={{ width: '100%' }}>
                <UIBox direction="column">
                    <UITabNav id="settingsTab" labels={tabLabels} onChange={handleChangeIndex} className={classes.tabs}>
                        <UITabPanel hidden={index !== 0} index={index}>
                            <UIBox padding={[16, 0, 0, 0]} direction="column">
                                <ProfileSettings footer={false} />
                                <InviteCode />
                            </UIBox>
                        </UITabPanel>
                        {user === 'tutor' ? (
                            <UITabPanel hidden={index !== 1} index={index}>
                                <UIBox padding={[16, 0, 0, 0]} direction="column">
                                    <UIBox direction="column" className={classes.courseContainer}>
                                        <UISpacer height={50}></UISpacer>
                                        <UIHeading header="Your courses" subheader="Add, edit or delete your saved payment.">
                                            <UIButton color="basicline" size="small">
                                                Edit
                                            </UIButton>
                                        </UIHeading>
                                        <CourseList list={courseList} detailShow={false} />
                                    </UIBox>
                                </UIBox>
                                <InviteCode />
                            </UITabPanel>
                        ) : (
                            <UITabPanel hidden={index !== 1} index={index}>
                                <UIBox padding={[16, 0, 0, 0]} direction="column">
                                    <UISpacer height={50}></UISpacer>
                                    <CourseList list={courseList} />
                                    <UISpacer height={50}></UISpacer>
                                    <UIHeading header="About you" subheader="This information will be displayed on your public profile.">
                                        <UIButton color="basicline" size="small" onClick={handleProfile}>
                                            Edit
                                        </UIButton>
                                    </UIHeading>
                                    <UISpacer height={30}></UISpacer>
                                    <UITextAreaField id="profile" name="profile" value={value} readOnly={editState} onChange={handleValue} style={{ width: '70%' }}></UITextAreaField>
                                    {!editState && (
                                        <>
                                            <UIBox alignItems="center">
                                                <UIButton color="basic" onClick={handleCancel}>
                                                    Cancel
                                                </UIButton>
                                                <UISpacer width={10}></UISpacer>
                                                <UIButton color="second" onClick={handleSave}>
                                                    Save
                                                </UIButton>
                                            </UIBox>
                                        </>
                                    )}
                                    <UISpacer height={50}></UISpacer>
                                    <UIHeading header="Hourly Rate" subheader="UPdate your personal information">
                                        <UIButton color="basicline" size="small" onClick={editRate}>
                                            Edit
                                        </UIButton>
                                    </UIHeading>
                                    <UISpacer height={30}></UISpacer>
                                    <UIBox>
                                        <UIBox direction="row" style={{ width: '200px' }}>
                                            <Currency>USD</Currency>
                                            <UITextFieldCustom id="price" name="price" value={rate} readOnly={rateEditState} onChange={handleRate} style={{ width: '100px', backgroundColor: `${ThemeColor.basic}`, borderRadius: '10px', borderBottomLeftRadius: '0', borderTopLeftRadius: '0' }} />
                                        </UIBox>
                                    </UIBox>
                                    <UISpacer height={50}></UISpacer>
                                    <UIHeading header="Hourly Rate" subheader="UPdate your personal information">
                                        <UIButton color="basicline" size="small">
                                            Settings
                                        </UIButton>
                                    </UIHeading>
                                    <UISpacer height={30}></UISpacer>
                                    <TutorSchedular onSchedule={onSchedule}/>
                                    <UISpacer height={20}></UISpacer>
                                    <Div>
                                        <UIButton color="second">Update</UIButton>
                                    </Div>
                                    <UISpacer height={100}></UISpacer>
                                    <InviteCode />
                                </UIBox>
                            </UITabPanel>
                        )}
                    </UITabNav>
                </UIBox>
            </UIForm>
        </Container>
    );
};

export default PreRegistration;
