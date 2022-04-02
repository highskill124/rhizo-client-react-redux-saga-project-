/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../common/Page';
import UICard from '../../ui-kit/core/UICard';
import UIForm from '../../ui-kit/form/UIForm';
import UIBox from '../../ui-kit/layout/UIBox';
import UIAutocomplete from '../../ui-kit/form/UIAutoComplete';
import UICourseGroup from '../../ui-kit/form/UICourseGroup';
import AuthContentWrapper from '../../widget/AuthContentWrapper';
import UIButton from '../../ui-kit/button/UIButton';
import { requestMajorQuery, requestInstitutionQuery, SearchState } from '../../store/state/SearchState';
import { RootState } from '../../store/state/RootReducer';
import { ProfileState } from '../../store/state/ProfileState';
import { AuthState } from '../../store/state/AuthState';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

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

interface IPayload {
    institution: any;
    majorList: Array<any>;
    courseList: Array<any>;
}

const FormSchema = Yup.object().shape({
    institution: Yup.object().required('Required'),
});

const StudentProfilePage = (props) => {
    const dispatch = useDispatch();
    const authState = useSelector<RootState, AuthState>((state) => state.authState);

    const searchState = useSelector<RootState, SearchState>((state) => state.searchState);
    const [majorOptions, setMajorOpetions] = useState([]);
    const [institutionOptions, setInstitutionOptions] = useState([]);

    const [user, setUser] = useState(null);
    const profile = useSelector<RootState, ProfileState>((state) => state.profileState);

    useEffect(() => {
        if (profile && profile.user && profile.user.data) {
            setUser(profile.user.data);
        }
    }, [profile]);

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
            setTimeout(() => {
                setSubmitting(false);
            }, 500);
        },
    });

    return (
        <Page name="profile-student">
            <AuthContentWrapper>
                <UICard flat={true}>
                    <Title>Student information</Title>
                    <UIForm formik={formik}>
                        <UIAutocomplete id="institution" name="institution" label="Institution" placeholder="Enter name institution" labelField="label" options={institutionOptions} activity={searchState.institution.loading} onSearch={(x) => dispatch(requestInstitutionQuery({ query: x }))} />
                        <UIAutocomplete id="majorList" name="majorList" label="Select your major(s)" placeholder="Select major" labelField="label" multiple groupType="tag-box" options={majorOptions} activity={searchState.major.loading} onSearch={(x) => dispatch(requestMajorQuery({ query: x }))} />
                        <UICourseGroup id="courseList" name="courseList" label="Input courses you are currently taking" majorList={majorOptions} majorLoading={searchState.major.loading} onMajorSearch={(x) => dispatch(requestMajorQuery({ query: x }))} />
                        <UIBox direction="column">
                            <UIButton disabled={authState.loading} activity={authState.loading}>
                                {authState.loading ? 'Updating...' : 'Continue'}
                            </UIButton>
                        </UIBox>
                    </UIForm>
                </UICard>
            </AuthContentWrapper>
        </Page>
    );
};

export default StudentProfilePage;
