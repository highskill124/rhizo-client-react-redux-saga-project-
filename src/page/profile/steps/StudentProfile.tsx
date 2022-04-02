/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import UIForm from '../../../ui-kit/form/UIForm';
import UIBox from '../../../ui-kit/layout/UIBox';
import UISelectField from '../../../ui-kit/form/UISelectField';
import UICourseGroup from '../../../ui-kit/form/UICourseGroup';
import UIAutoComplete from '../../../ui-kit/form/UIAutoComplete';
import UIDevider from '../../../ui-kit/core/UIDevider';
import UISpacer from '../../../ui-kit/core/UISpacer';
import CourseList from '../../../ui-kit/core/CourseList';
import { UILabel } from '../../../ui-kit/form/UILabel';
import { RootState } from '../../../store/state/RootReducer';
import { ProfileState } from '../../../store/state/ProfileState';
import { requestMajorQuery, requestTagQuery, SearchState } from '../../../store/state/SearchState';
import { AuthState } from '../../../store/state/AuthState';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';
import { InstitutionList } from '../../../settings';
import { courseList } from '../../../util/mock-api/data/course-list';

const Title = styled.p`
    color: ${ThemeColor.title};
    font-size: ${FontSize.modalTitle};
    font-weight: ${FontWeight.medium};
`;

const profileList = {
    student: ['Student'],
    tutor: ['Tutor'],
    both: ['Student', 'Tutor'],
};

export const Desc = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.sm};
    margin-top: 0;
`;

const UserProfilePage = (props) => {
    const dispatch = useDispatch();
    const authState = useSelector<RootState, AuthState>((state) => state.authState);
    const [user, setUser] = useState(null);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const profile = useSelector<RootState, ProfileState>((state) => state.profileState);
    const [tagOptions, setTagOptions] = useState([]);
    const searchState = useSelector<RootState, SearchState>((state) => state.searchState);
    const [majorOptions, setMajorOptions] = useState([]);
    const [item, setItem] = useState({ major: '', course: '', tags: [] });

    const onChange = (fi, v) => {
        if (fi === 0) setItem({ ...item, major: v });
        else if (fi === 1) setItem({ ...item, course: v });
        else if (fi === 2) setItem({ ...item, tags: v });
    };

    useEffect(() => {
        if (profile && profile.user && profile.user.data) {
            setUser(profile.user.data);
        }
    }, [profile]);

    useEffect(() => {
        if (user) {
            if (user.isTutor && user.isStudent) {
                setSelectedProfile(profileList.both);
            } else if (user.isTutor) {
                setSelectedProfile(profileList.tutor);
            } else if (user.isStudent) {
                setSelectedProfile(profileList.student);
            }
        }
    }, [user]);

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values: any) => {},
    });

    return (
        <UIForm formik={formik} style={{ width: '100%' }}>
            <UIBox direction="column">
                <Title>Now, let's setup your student profile</Title>
                <UISelectField id="institution" name="institution" label="Current Institution(Optional)" options={InstitutionList}></UISelectField>
                <UIAutoComplete creatable id={`major-tags`} name={`major-tags`} label="Select your majors(Optional)" placeholder="Select major" multiple groupType="tag-inside" options={tagOptions} activity={searchState.tag.loading} onSearch={(x) => dispatch(requestTagQuery({ query: x }))} onChange={(x) => onChange(2, x)} selection={item.tags} defaultValue={[]} />
                <UILabel>Your current courses(Optional)</UILabel>
                <Desc>Thsessse should be courses that you are familiar enough to teach. You will be able to modify these later.</Desc>
                <UIDevider></UIDevider>
                <CourseList list={courseList} detailShow={false} />
                <UISpacer height={20}></UISpacer>
                <UICourseGroup showTag={false} id="courseList" name="courseList" tagList={tagOptions} tagLoading={searchState.tag.loading} onTagSearch={(x) => dispatch(requestTagQuery({ query: x }))} majorList={majorOptions} majorLoading={searchState.major.loading} onMajorSearch={(x) => dispatch(requestMajorQuery({ query: x }))} />
            </UIBox>
        </UIForm>
    );
};

export default UserProfilePage;
