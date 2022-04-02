/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/state/RootReducer';
import UIForm from '../../../ui-kit/form/UIForm';
import UIBox from '../../../ui-kit/layout/UIBox';
import UIHint from '../../../ui-kit/core/UIHint';
import UILink from '../../../ui-kit/core/UILink';
import UIStaticField from '../../../ui-kit/form/UIStaticField';
import UISelectField from '../../../ui-kit/form/UISelectField';
import UIProfileSelect from '../../../ui-kit/form/UIProfileSelect';
import UIDatePicker from '../../../ui-kit/form/UIDatePicker';
import UISpacer from '../../../ui-kit/core/UISpacer';
import { ProfileState, requestUpdateStudentProfile, setUserType } from '../../../store/state/ProfileState';
import { AuthState } from '../../../store/state/AuthState';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';
import { educationLevelList, GenderPronounsList } from '../../../settings';

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

interface IPayload {
    dob: string;
    educationLevel: string;
    genderPronouns: string;
}

const FormSchema = Yup.object().shape({
    dob: Yup.string().required('Required'),
    educationLevel: Yup.string().required('Required'),
    genderPronouns: Yup.string().required('Required'),
});

const UserProfilePage = (props) => {
    const dispatch = useDispatch();
    const authState = useSelector<RootState, AuthState>((state) => state.authState);
    const [user, setUser] = useState(null);
    const [userPropfileType, setUserProfileType] = useState(null);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const profile = useSelector<RootState, ProfileState>((state) => state.profileState);

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
        initialValues: {
            dob: '',
            educationLevel: '',
            genderPronouns: '',
        },
        validationSchema: FormSchema,
        onSubmit: (values: IPayload, { setSubmitting }: FormikHelpers<IPayload>) => {
            const payload = {
                dob: new Date(values.dob).toUTCString(),
                educationLevel: values.educationLevel,
            };
            dispatch(requestUpdateStudentProfile(payload));
            setTimeout(() => {
                setSubmitting(false);
            }, 500);
        },
    });

    const onUserTypeSelect = (type: any) => {
        setUserProfileType(type);
    };

    return (
        <UIForm formik={formik}>
            <UIBox direction="column">
                <Title>First Things First</Title>
                <UIProfileSelect label="Select user type" name="profiles" onChange={(e) => onUserTypeSelect(e)}></UIProfileSelect>
                {selectedProfile && <UIStaticField id="profile" name="profile" value={selectedProfile} label="Selected profile" />}
                {user && <UIStaticField id="email" name="email" value={[user.email]} label="Email" />}
                {user && user.isTutor && (
                    <>
                        <UIBox justifyContent="flex-end">
                            <UILink label="Register as a student only" />
                        </UIBox>
                        <ConfirmWrapper>
                            <h4>Confirmation educational institution</h4>
                            <span>This email is to verify that you attend your selected institution. We will send you a verification link</span>
                        </ConfirmWrapper>
                        <UIStaticField id="emailConf" name="emailConf" value={[user.email]} label="" />
                        <UIHint text="You must belong to an institution currently supported at Rhizo." />
                    </>
                )}
                <UISelectField id="gender" name="gender" label="Gender Pronouns" placeholder="" options={GenderPronounsList}></UISelectField>
                <UISelectField id="education_level" name="education_level" label="Education Level" placeholder="Education Level" options={educationLevelList}></UISelectField>
                <UIDatePicker id="dob" name="dob" label="Date of birth" />
                <UISpacer height={20}></UISpacer>
            </UIBox>
        </UIForm>
    );
};

export default UserProfilePage;
