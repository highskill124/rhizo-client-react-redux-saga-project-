/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/state/RootReducer';
import UIForm from '../../../ui-kit/form/UIForm';
import UIBox from '../../../ui-kit/layout/UIBox';
import UITextField from '../../../ui-kit/form/UITextField';
import UIButton from '../../../ui-kit/button/UIButton';
import UIHint from '../../../ui-kit/core/UIHint';
import { ProfileState, requestUpdateStudentProfile } from '../../../store/state/ProfileState';
import { SearchState } from '../../../store/state/SearchState';
import { AuthState } from '../../../store/state/AuthState';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';

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

const Desc = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.sm};
    margin-top: 0;
`;

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    > div {
        width: 50%;
    }
`;

const Sent = styled.p`
    color: ${ThemeColor.title};
    font-size: ${FontSize.md};
`;

const Resend = styled.p`
    color: ${ThemeColor.title};
    font-size: ${FontSize.sm};
    > span {
        color: ${ThemeColor.secondDark};
        &: hover {
            cursor: pointer;
        }
    }
`;

const ResendContainer = styled.div`
    text-align: end;
    width: 100%;
`;

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

const InstitutionVerification = (props) => {
    const dispatch = useDispatch();
    const authState = useSelector<RootState, AuthState>((state) => state.authState);
    const [user, setUser] = useState(null);
    const [institutionName, setInstitutionName] = useState('');
    const [institutionEmail, setInstitutionEmail] = useState('');
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [confirmCode, setConfirmCode] = useState<boolean>(false);
    const [verificationCode, setVerificationCode] = useState('');
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

    const handleIName = (e) => {
        setInstitutionName(e.target.value);
    };

    const handleIEmail = (e) => {
        setInstitutionEmail(e.target.value);
    };

    const sendCode = () => {
        props.handleShowNextButton();
        setConfirmCode(true);
    };

    const handleVerifyCode = (e) => {
        setVerificationCode(e.target.value);
        props.handleShowNextButton();
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

    return (
        <UIForm formik={formik} style={{ width: '100%' }}>
            <UIBox direction="column">
                <Title>Next, let's verify your insitution</Title>
                <UITextField tag="Register as student only" required id="institutionName" name="institutionName" onChange={handleIName} value={institutionName} label="Institution" placeholder="Institution Name"></UITextField>
                <UITextField required id="institutionEmail" subLable="This email is to verify that you attend your selected institution. We will send you a verification link" name="institutionEmail" onChange={handleIEmail} value={institutionEmail} label="institution Verification" placeholder="Institution Email"></UITextField>
                {!confirmCode ? (
                    <ButtonContainer>
                        <UIButton color="second" onClick={sendCode}>
                            Send verification code
                        </UIButton>
                    </ButtonContainer>
                ) : (
                    <ResendContainer>
                        <Sent>Code sent! Check your .edu inbox for the verification code.</Sent>
                        <Resend>
                            Didn't get the email? <span>Resend code</span>
                        </Resend>
                    </ResendContainer>
                )}
                {confirmCode && (
                    <>
                        <UITextField id="confirmCode" name="confirmCode" onChange={handleVerifyCode} value={verificationCode} label="Confirmation Code" placeholder="Confirm Code"></UITextField>
                        <UIHint text="The code you have entered is incorrect. Resent the code and try again."></UIHint>
                    </>
                )}

                {/* {selectedProfile && <UIStaticField id="profile" name="profile" value={selectedProfile} label="Selected profile" />}
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

                <UISelectField id="gender" name="gender" label="Gender Pronouns" placeholder="" options={GenderPronouns}></UISelectField>
                <UISelectField id="education_level" name="education_level" label="Education Level" placeholder="Education Level" options={educationLevelList}></UISelectField>
                <UIDatePicker id="dob" name="dob" label="Date of birth" /> */}
            </UIBox>
        </UIForm>
    );
};

export default InstitutionVerification;
