import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import { FormikHelpers, useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Page from '../common/Page';
import UICard from '../../ui-kit/core/UICard';
import { Device } from '../../settings/Device';
import UIForm from '../../ui-kit/form/UIForm';
import UICheckBox from '../../ui-kit/form/UICheckBox';
import UITextField from '../../ui-kit/form/UITextField';
import UIPasswordField from '../../ui-kit/form/UIPasswordField';
import UIBox from '../../ui-kit/layout/UIBox';
import UISpacer from '../../ui-kit/core/UISpacer';
import AuthContentWrapper from '../../widget/AuthContentWrapper';
import { AuthState, requestSignUp } from '../../store/state/AuthState';
import { RootState } from '../../store/state/RootReducer';
import UIButton from '../../ui-kit/button/UIButton';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Title = styled.h4`
    display: flex;
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
`;

const LinkWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    span {
        font-style: normal;
        font-weight: ${FontWeight.regular};
        font-size: ${FontSize.sm};
        line-height: ${LineHeight.md};
        text-align: center;
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.grey165};

        a {
            color: ${ThemeColor.primary};
            text-decoration: none;
        }
    }
`;

const TermsCheckboxWrapper = styled.div`
    margin-top: 2px;
`;
const TermsWrapper = styled.div`
    font-style: normal;
    font-weight: ${FontWeight.regular};
    font-size: ${FontSize.sm};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.grey165};
    span {
        color: ${ThemeColor.primary};
        cursor: pointer;
    }
`;
const NameGroupWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    @media (max-width: ${Device.mobileMedium - 1}px) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
`;
const useStyles = makeStyles((Theme) => ({
    card: {
        display: 'flex',
        flex: 1,
        maxWidth: 492,
        boxShadow: 'none !important',
        border: `1px solid ${ThemeColor.border}`,
    },
}));

interface IPayload {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    // profiles: Array<Profile>;
}

const FormSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    firstName: Yup.string().min(3, 'Too Short!').max(24, 'Too Long!').required('Required'),
    lastName: Yup.string().min(3, 'Too Short!').max(24, 'Too Long!').required('Required'),
    password: Yup.string().min(8, 'Password should be at least 8 characters').required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const SignUpPage = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const authState = useSelector<RootState, AuthState>((state) => state.authState);
    const history = useHistory();

    // useEffect(() => {
    //     if (authState && authState.data.authenticated) {
    //         history.push('/profile/user');
    //     }
    // }, [authState, history]);

    const formik = useFormik({
        initialValues: {
            // profiles: [Profile.STUDENT, Profile.TUTOR],
            email: 'i2@i.com',
            password: 'pass@1234',
            confirmPassword: 'pass@1234',
            firstName: 'User2',
            lastName: 'Test',
        },

        validationSchema: FormSchema,

        onSubmit: (values: IPayload, { setSubmitting }: FormikHelpers<IPayload>) => {
            console.log('>>>>>>');
            dispatch(requestSignUp(values));

            setTimeout(() => {
                setSubmitting(false);
            }, 500);
        },
    });
    return (
        <Page name="signup">
            <AuthContentWrapper>
                <UICard className={classes.card}>
                    <Title>Register with Rhizo</Title>
                    <UIForm formik={formik}>
                        <UIBox direction="column">
                            <NameGroupWrapper>
                                <UITextField id="firstName" name="firstName" onChange={formik.handleChange} value={formik.values.firstName} label="First Name" placeholder="Enter name" />
                                <UISpacer width={10} height={1} />
                                <UITextField id="lastName" name="lastName" onChange={formik.handleChange} value={formik.values.lastName} label="Last Name" placeholder="Enter surname" />
                            </NameGroupWrapper>
                            <UITextField id="email" name="email" onChange={formik.handleChange} value={formik.values.email} label="Email" placeholder="Enter email" email></UITextField>
                            <UIPasswordField id="password" name="password" onChange={formik.handleChange} value={formik.values.password} label="Password" placeholder="Input password"></UIPasswordField>
                            <UIPasswordField id="confirmPassword" name="confirmPassword" onChange={formik.handleChange} value={formik.values.confirmPassword} label="Re-enter password" placeholder="Input password"></UIPasswordField>
                            <UISpacer height={10}></UISpacer>
                            <UIBox alignItems="center">
                                <TermsCheckboxWrapper>
                                    <UICheckBox id="terms" name="terms" label="" checked />
                                </TermsCheckboxWrapper>
                                <TermsWrapper>
                                    Creating an account means you're okay with our <span>Terms of Service</span>, <span>Privacy Policy</span>
                                    <span></span>, and our default <span>Notification Settings</span>.
                                </TermsWrapper>
                            </UIBox>
                            <UISpacer height={20} />
                            <UIButton type="submit" disabled={authState.loading} activity={authState.loading} style={{ width: '100%' }} color="second">
                                {authState.loading ? 'Registering...' : 'Continue'}
                            </UIButton>
                            <LinkWrapper>
                                <span>
                                    Already have an account?{' '}
                                    <a
                                        href="./"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            history.push('/sign-in');
                                            window.scrollTo(0, 0);
                                        }}
                                        title="Register"
                                    >
                                        Sign in
                                    </a>
                                </span>
                            </LinkWrapper>
                        </UIBox>
                    </UIForm>
                </UICard>
            </AuthContentWrapper>
        </Page>
    );
};

export default SignUpPage;
