import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import UIForm from '../../../ui-kit/form/UIForm';
import UIBox from '../../../ui-kit/layout/UIBox';
import UIAutoComplete from '../../../ui-kit/form/UIAutoComplete';
import { RootState } from '../../../store/state/RootReducer';
import { requestTagQuery, SearchState } from '../../../store/state/SearchState';
import { ProfileState, requestUpdateTutorProfile } from '../../../store/state/ProfileState';
import { AuthState } from '../../../store/state/AuthState';
import animationData from '../../../media/lottie/tutor-register.json';
import UIButton from '../../../ui-kit/button/UIButton';
import CourseList from '../../../ui-kit/core/CourseList';
import UITextField from '../../../ui-kit/form/UITextField';
import UISpacer from '../../../ui-kit/core/UISpacer';
import UIDevider from '../../../ui-kit/core/UIDevider';
import TutorSchedular from '../../../ui-kit/widget/TutorScheduler';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';
import { Desc } from './StudentProfile';
import { UILabel } from '../../../ui-kit/form/UILabel';
import { courseList } from '../../../util/mock-api/data/course-list';

const Title = styled.h4`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-family: Roboto;
    font-style: normal;
    font-weight: ${FontWeight.bold};
    font-size: ${FontSize.xxl};
    line-height: ${LineHeight.md};
    display: flex;
    align-items: flex-end;
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.grey45};
    margin: 0 0 20px 0px;
    max-width: 420px;
`;

const ConfirmWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 15px;

    h4 {
        font-style: normal;
        font-weight: ${FontWeight.medium};
        font-size: ${FontSize.md};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.grey45};
        margin: 0px 0px 4px 0px;
        padding: 0px;
    }

    span {
        font-style: normal;
        font-weight: ${FontWeight.medium};
        font-size: ${FontSize.sm};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.grey104};
    }
`;

const Unit = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.md};
`;

const useStyles = makeStyles((theme) => ({
    container: {
        '&>div': {
            width: 100,
        },
    },
}));

interface IPayload {
    institution: any;
    majorList: Array<any>;
    courseList: Array<any>;
}

const FormSchema = Yup.object().shape({
    institution: Yup.object().required('Required'),
    majorList: Yup.array().required('Required'),
    courseList: Yup.array().required('Required'),
});

const TutorProfilePage = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const authState = useSelector<RootState, AuthState>((state) => state.authState);
    const searchState = useSelector<RootState, SearchState>((state) => state.searchState);
    const [majorOptions, setMajorOptions] = useState([]);
    const [institutionOptions, setInstitutionOptions] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [item, setItem] = useState({ major: '', course: '', tags: [] });

    const [user, setUser] = useState(null);
    const profile = useSelector<RootState, ProfileState>((state) => state.profileState);

    useEffect(() => {
        if (searchState.major.data && searchState.major.data.results) {
            const list = searchState.major.data.results.map((x) => ({ label: x.name, value: x.alias }));
            setMajorOptions(list);
        }
        if (searchState.institution.data && searchState.institution.data.results) {
            const list = searchState.institution.data.results.map((x) => ({ label: x.name, value: x.alias }));
            setInstitutionOptions(list);
        }
        if (searchState.tag.data && searchState.tag.data.results) {
            const list = searchState.tag.data.results.map((x) => ({ label: x.name, value: x.alias }));
            setTagOptions(list);
        }
    }, [searchState]);

    useEffect(() => {
        if (profile && profile.user && profile.user.data) {
            setUser(profile.user.data);
        }
    }, [profile]);

    const onChange = (fi, v) => {
        if (fi === 0) setItem({ ...item, major: v });
        else if (fi === 1) setItem({ ...item, course: v });
        else if (fi === 2) setItem({ ...item, tags: v });
    };

    const formik = useFormik({
        initialValues: {
            institution: '',
            majorList: [],
            courseList: [],
        },
        validationSchema: FormSchema,
        onSubmit: (values: IPayload, { setSubmitting }: FormikHelpers<IPayload>) => {
            const payload = {
                institute: values.institution.value,
                major: values.majorList.map((x) => x.value),
            };

            dispatch(requestUpdateTutorProfile(payload));

            setTimeout(() => {
                setSubmitting(false);
            }, 500);
        },
    });

    const onSchedule = (e) => {
        setSchedule(e);
    };

    return (
        <UIForm formik={formik} style={{ width: '100%' }}>
            <Title>Now, let's setup your mentor profile</Title>
            {console.log(tagOptions, 'tag options |||||||||')}
            <UIAutoComplete creatable id={`major-tags`} name={`major-tags`} label="Select your majors(Optional)" placeholder="Select major" multiple groupType="tag-inside" options={tagOptions} activity={searchState.tag.loading} onSearch={(x) => dispatch(requestTagQuery({ query: x }))} onChange={(x) => onChange(2, x)} selection={item.tags} defaultValue={[]} />
            <UILabel>Input your courses</UILabel>
            <UIBox justifyContent="space-between">
                <Desc style={{ width: '80%' }}>Theese should be courses that you are familiar enough to teach. You will be able to modify these later.</Desc>
                <UIButton color="basicline" size="small">
                    Add
                </UIButton>
            </UIBox>
            <UIDevider></UIDevider>
            <CourseList list={courseList} detailShow={false} />
            <UISpacer height={20}></UISpacer>
            <UILabel>Set your ability</UILabel>
            <Desc>Students will only be able to schedule sessions with you during these times. You can modify these settings later.</Desc>
            <UISpacer height={20}></UISpacer>
            <TutorSchedular onSchedule={onSchedule} />
            <UISpacer height={10}></UISpacer>
            <UILabel>Set hourly rate</UILabel>
            <Desc>Set you rhourly rate now. You will be able to change these settings later.</Desc>
            <UIBox className={classes.container}>
                <UITextField placeholder="e.g. &nbsp; 25" name="hourlyRate"></UITextField>
                <UISpacer width={10}></UISpacer>
                <Unit>$/hr</Unit>
            </UIBox>
        </UIForm>
    );
};

export default TutorProfilePage;
