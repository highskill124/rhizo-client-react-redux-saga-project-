/* eslint-disable no-unused-vars */
import React, { useEffect, useState, FC } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../common/Page';
import UICard from '../../ui-kit/core/UICard';
import UIForm from '../../ui-kit/form/UIForm';
import UIBox from '../../ui-kit/layout/UIBox';
import AuthContentWrapper from '../../widget/AuthContentWrapper';
import { RootState } from '../../store/state/RootReducer';
import { ProfileState, requestUpdateStudentProfile } from '../../store/state/ProfileState';
import { requestMajorQuery, requestInstitutionQuery, SearchState, requestTagQuery } from '../../store/state/SearchState';
import { AuthState } from '../../store/state/AuthState';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import UIButton from '../../ui-kit/button/UIButton';
import UIProfileSelect from '../../ui-kit/form/UIProfileSelect';
import UISelectField from '../../ui-kit/form/UISelectField';
import UISpacer from '../../ui-kit/core/UISpacer';
import UIHint from '../../ui-kit/core/UIWarn';
import UIDatePicker from '../../ui-kit/form/UIDatePicker';
import UICourseGroup from '../../ui-kit/form/UICourseGroup';
import UIAutoComplete from '../../ui-kit/form/UIAutoComplete';
import UIDevider from '../../ui-kit/core/UIDevider';
import CourseList from '../../ui-kit/core/CourseList';
import TutorScheduler from '../../ui-kit/widget/TutorScheduler';
import UIAutoComplete2 from '../../ui-kit/form/UIAutoComplete2';
import UITextField from '../../ui-kit/form/UITextField';
import PreRegistration from './preregistration/PreRegistration';
import { UILabel } from '../../ui-kit/form/UILabel';
import { courseList } from '../../util/mock-api/data/course-list';
import { Device } from '../../settings/Device';
import { InstitutionList, GenderPronounsList } from '../../settings';
import { educationLevelList } from '../../util/mock-api/data/education-level-list';
import UIAutoManualInput from '../../ui-kit/form/UIAutoManualInput';
import { CloseIcon } from '../../ui-kit/icon/UIIconAssets';

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
    @media (max-width: ${Device.tablet - 1}px) {
        padding-left: 10px;
        padding-right: 10px;
    }
`;

const SubTitle = styled.p`
    color: ${ThemeColor.messages};
    font-size: ${FontSize.xxl};
    text-align: center;
    @media (max-width: ${Device.tablet - 1}px) {
        padding-left: 10px;
        padding-right: 10px;
    }
`;

const Regis = styled.p`
    color: ${ThemeColor.secondDark};
    font-size: ${FontSize.label};
    text-align: center;
    margin-bottom: 0;
    margin-top: 0;
`;

const Unit = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.md};
`;

const NextBack = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 15px;
    > div:nth-child(1) {
        width: 50%;
        flex-shrink: 1;
    }
    > div:nth-child(2) {
        width: 50%;
        flex-shrink: 1;
    }
`;

const Head = styled.p`
    color: ${ThemeColor.title};
    font-size: 22px;
`;

const Desc = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.sm};
    margin-top: 0;
`;

const Or = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.md};
    padding: 10px;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto auto;
    background-color: ${ThemeColor.white};
    width: 30px;
`;

const CourseContainer = styled.div`
    width: 100%;
    height: 60px;
    border-bottom: 1px solid ${ThemeColor.border};
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
        color: ${ThemeColor.messages};
        font-size: ${FontSize.xl};
        margin-bottom: 0;
    }
    svg {
        background-color: ${ThemeColor.second};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        padding: 5px;
        cursor: pointer;
    }
`;

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 492,
        boxShadow: 'none !important',
        borderRadius: '15px !important',
        border: `none`,
    },
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        color: 'black',
    },
    container: {
        '&>div': {
            width: 100,
        },
    },
    autoComplete: {
        '&>div:nth-child(1)': {
            '&>div:nth-child(1)': {
                height: 40,
                padding: '0 !important',
                borderRadius: '10px',
                '&>input': {
                    color: ThemeColor.subtitle,
                    paddingLeft: 15,
                },
                '&>fieldset': {
                    border: `1px solid ${ThemeColor.border}`,

                    '&:focus': {
                        border: `1px solid ${ThemeColor.secondDark}`,
                    },
                },
            },
        },
    },
}));

interface IPayload {
    dateOfBirth: string;
    educationLevel: string;
    genderPronoun: string;
    profileType: string;
}

const FormSchema = Yup.object().shape({
    dateOfBirth: Yup.string().required('Required'),
    educationLevel: Yup.string().required('Required'),
    genderPronoun: Yup.string().required('Required'),
    profileType: Yup.string().required('Required'),
});

const defaultTagOptions = [
    { label: 'some', value: 'subject1' },
    { label: 'some', value: 'subject2' },
    { label: 'some', value: 'subject3' },
    { label: 'some', value: 'subject4' },
    { label: 'some', value: 'subject5' },
    { label: 'some', value: 'subject6' },
    { label: 'some', value: 'subject7' },
    { label: 'some', value: 'subject8' },
];

const courses = [
    { course: 'ECON', number: 101 },
    { course: 'Math', number: 30 },
    { course: 'Bio', number: 10 },
    { course: 'computer', number: 53 },
];

const SelectUserType = (props) => {
    const authState = useSelector<RootState, AuthState>((state) => state.authState);
    const profile = useSelector<RootState, ProfileState>((state) => state.profileState);
    const searchState = useSelector<RootState, SearchState>((state) => state.searchState);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [userProfileType, setUserProfileType] = useState(null);
    const [realUserProfile, setRealUserProfile] = useState('');
    const [openUserTypePage, setOpenUserTypePage] = useState(false);
    const [openStudentProfilePage, setOpenStudentProfilePage] = useState(true);
    const [openTutorProfilePage, setOpenTutorProfilePage] = useState(false);
    const [openProfileCompletion, setOpenProfileCompletion] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const [tagOptions, setTagOptions] = useState(defaultTagOptions);
    const [majorOptions, setMajorOpetions] = useState([]);
    const [institutionOptions, setInstitutionOptions] = useState([]);
    const [item, setItem] = useState({ major: '', course: '', tags: [] });
    const [institution, setInstitution] = useState();

    useEffect(() => {
        if (searchState.major.data && searchState.major.data.results) {
            const list = searchState.major.data.results.map((x) => ({ label: x.name, value: x.alias }));
            setMajorOpetions(list);
        }
        if (searchState.institution.data && searchState.institution.data.results) {
            const list = searchState.institution.data.results.map((x) => ({ label: x.name, value: x.alias }));
            setInstitutionOptions(list);
        }
    }, [searchState]);

    const formik = useFormik({
        initialValues: {
            dateOfBirth: '',
            educationLevel: '',
            genderPronoun: '',
            profileType: 'STUDENT',
        },
        validationSchema: FormSchema,
        onSubmit: (values: IPayload, { setSubmitting }: FormikHelpers<IPayload>) => {
            const payload = {
                dateOfBirth: new Date(values.dateOfBirth).toUTCString(),
                educationLevel: values.educationLevel,
            };
            // dispatch(requestUpdateStudentProfile(payload));

            console.log(values);
            setTimeout(() => {
                setSubmitting(false);
            }, 500);
        },
    });

    const onChange = (fi: number, v: any) => {
        if (fi === 0) setItem({ ...item, major: v });
        else if (fi === 1) setItem({ ...item, course: v });
        else if (fi === 2) setItem({ ...item, tags: v });
    };

    const onUserTypeSelect = (type: any) => {
        setUserProfileType(type);
    };

    useEffect(() => {
        if (profile && profile.user && profile.user.data) {
            setUser(profile.user.data);
        }
    }, [profile]);

    const onContinue = () => {
        if (userProfileType === 'tutor') {
            setOpenTutorProfilePage(true);
            setOpenUserTypePage(false);
            setErrorMessage(false);
        } else if (userProfileType === 'student') {
            setOpenStudentProfilePage(true);
            setOpenUserTypePage(false);
            setErrorMessage(false);
        } else if (userProfileType === 'both') {
            return;
        } else {
            setErrorMessage(true);
        }
        setRealUserProfile(userProfileType);
    };

    const studentProfileToUserType = () => {
        setOpenStudentProfilePage(false);
        setOpenUserTypePage(true);
    };

    const onSchedule = (e: any) => {
        setSchedule(e);
    };

    const onOpenProfileCompletion = () => {
        setOpenTutorProfilePage(false);
        setOpenStudentProfilePage(false);
        setOpenProfileCompletion(true);
    };

    const onTutorProfileToUserType = () => {
        setOpenTutorProfilePage(false);
        setOpenUserTypePage(true);
    };

    const selectInstitution = (x) => {
        setInstitution(x);
    };

    const [courseLists, setCourseLists] = useState([]);
    // const [updatedList, setUpdatedList] = useState([]);

    const onConfirm = (x) => {
        if (!x) return;
        console.log(x, 'parent x');
        const addedCourse = `${x.course} ${x.number.toString()}`;
        setCourseLists((originArray) => [...originArray, addedCourse]);
    };

    const removeCourse = (x) => {
        console.log(courseLists, x, 'coursliet and x');
        setCourseLists(courseLists.slice(0, x).concat(courseLists.slice(x + 1, courseLists.length)));
    };

    return (
        <Page name="profile-user">
            <AuthContentWrapper style={{ display: 'block' }}>
                {(openUserTypePage || openStudentProfilePage) && (
                    <>
                        <Regis>Registration</Regis>
                        <Title>Complete your profile</Title>
                        <SubTitle>Before we kick things-off, let's get your profile set up. It will be quick.</SubTitle>
                    </>
                )}
                {openTutorProfilePage && (
                    <>
                        <Regis>Registration</Regis>
                        <Title>Now, let's setup your mentor profile</Title>
                    </>
                )}
                {openUserTypePage && (
                    <UICard className={classes.card} style={{ margin: '0 auto' }}>
                        <UIForm formik={formik}>
                            <UIBox direction="column">
                                <Head>First Things First</Head>
                                <UIProfileSelect label="Select user type" name="profileType" onChange={(e) => onUserTypeSelect(e)}></UIProfileSelect>
                                <UISelectField id="gender" name="gender" label="Gender Pronouns" placeholder="" options={GenderPronounsList}></UISelectField>
                                <UISelectField id="education_level" name="education_level" label="Education Level" placeholder="Education Level" options={educationLevelList}></UISelectField>
                                <UIDatePicker id="dateOfBirth" name="dateOfBirth" label="Date of birth" />
                            </UIBox>
                            {errorMessage && <UIHint text="Please select user type."></UIHint>}
                            <UISpacer height={20}></UISpacer>
                            <div style={{ width: '100%' }}>
                                <UIButton color="second" onClick={onContinue}>
                                    Continue
                                </UIButton>
                            </div>
                        </UIForm>
                    </UICard>
                )}
                {openStudentProfilePage && (
                    <UICard className={classes.card} style={{ margin: '0 auto' }}>
                        <Head>Student information</Head>
                        <UIForm formik={formik}>
                            <UISelectField id="institution" name="institution" defaultValue={institution} options={InstitutionList} onChange={selectInstitution} placeholder="Select Institution"></UISelectField>
                            {institution && (
                                <>
                                    <UIAutoComplete creatable id={`major-tags`} name={`major-tags`} label="Select your majors(Optional)" placeholder="Select major" multiple groupType="tag-inside" options={tagOptions} activity={searchState.tag.loading} onSearch={(x) => dispatch(requestTagQuery({ query: x }))} onChange={(x) => onChange(2, x)} selection={item.tags} defaultValue={[]} />
                                    <UILabel>Your currrent courses</UILabel>
                                    <Desc>Search for courses to add to your profile</Desc>
                                    <UIAutoManualInput onConfirm={onConfirm} options={courses} className={classes.autoComplete} style={{ width: '100%' }}></UIAutoManualInput>
                                    <UISpacer height={20}></UISpacer>
                                    <UIDevider></UIDevider>
                                    {courseLists &&
                                        courseLists.map((x, i) => (
                                            <CourseContainer key={i}>
                                                <Desc>{x}</Desc>
                                                <CloseIcon onClick={() => removeCourse(i)}></CloseIcon>
                                            </CourseContainer>
                                        ))}
                                </>
                            )}
                            <UISpacer height={20}></UISpacer>
                            <NextBack>
                                <UIButton color="basicline" onClick={studentProfileToUserType}>
                                    Back
                                </UIButton>
                                <UIButton color="second" disabled={authState.loading} activity={authState.loading} onClick={onOpenProfileCompletion}>
                                    {authState.loading ? 'Updating...' : 'Continue'}
                                </UIButton>
                            </NextBack>
                        </UIForm>
                    </UICard>
                )}
                {openTutorProfilePage && (
                    <UICard className={classes.card} style={{ margin: '0 auto' }}>
                        <UIForm formik={formik} style={{ width: '100%' }}>
                            <UIAutoComplete creatable id={`major-tags`} name={`major-tags`} label="Select your majors(Optional)" placeholder="Select major" multiple groupType="tag-inside" options={tagOptions} activity={searchState.tag.loading} onSearch={(x) => dispatch(requestTagQuery({ query: x }))} onChange={(x) => onChange(2, x)} selection={item.tags} defaultValue={[]} />
                            <UILabel>Your currrent courses</UILabel>
                            <Desc>Search for course</Desc>
                            <UIBox gap={10}>
                                <UITextField name="course"></UITextField>
                                <UIButton color="second">Add</UIButton>
                            </UIBox>
                            <UIDevider style={{ position: 'relative' }}>
                                <Or>Or</Or>
                            </UIDevider>
                            <UISpacer height={30}></UISpacer>
                            <UIButton color="second" style={{ width: '100%' }}>
                                Add a new course
                            </UIButton>
                            <UISpacer height={20}></UISpacer>
                            <UIDevider></UIDevider>
                            <CourseList list={courseList} detailShow={false} />
                            <UISpacer height={20}></UISpacer>
                            <UILabel>Set your ability</UILabel>
                            <Desc>Students will only be able to schedule sessions with you during these times. You can modify these settings later.</Desc>
                            <UISpacer height={20}></UISpacer>
                            <TutorScheduler onSchedule={onSchedule} />
                            <UISpacer height={10}></UISpacer>
                            <UILabel>Set hourly rate</UILabel>
                            <Desc>Set you rhourly rate now. You will be able to change these settings later.</Desc>
                            <UIBox className={classes.container}>
                                <UITextField placeholder="e.g. &nbsp; 25" name="hourlyRate"></UITextField>
                                <UISpacer width={10}></UISpacer>
                                <Unit>$/hr</Unit>
                            </UIBox>
                            <NextBack>
                                <UIButton color="basicline" onClick={onTutorProfileToUserType}>
                                    Back
                                </UIButton>
                                <UIButton color="second" onClick={onOpenProfileCompletion}>
                                    Next
                                </UIButton>
                            </NextBack>
                        </UIForm>
                    </UICard>
                )}
                {openProfileCompletion && <PreRegistration userType={realUserProfile} />}
            </AuthContentWrapper>
        </Page>
    );
};

export default SelectUserType;
