import React, { useEffect } from 'react';
import styled from 'styled-components';

import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles, responsiveFontSizes } from '@material-ui/core';
import Page from '../common/Page';
import UICard from '../../ui-kit/core/UICard';
import UIForm from '../../ui-kit/form/UIForm';
import UICheckBox from '../../ui-kit/form/UICheckBox';
import UISpacer from '../../ui-kit/core/UISpacer';
import UITextField from '../../ui-kit/form/UITextField';
import UIPasswordField from '../../ui-kit/form/UIPasswordField';
import AuthContentWrapper from '../../widget/AuthContentWrapper';
import { AuthState, requestLogin } from '../../store/state/AuthState';
import { RootState } from '../../store/state/RootReducer';
import UIButton from '../../ui-kit/button/UIButton';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import UIBox from '../../ui-kit/core/UIBox';

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

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        flex: 1,
        maxWidth: 492,
        boxShadow: 'none !important',
        borderRadius: '15px !important',
        border: `1px solid ${ThemeColor.border}`,
    },
}));

interface IPayload {
    email: string;
    password: string;
}

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

const SignIn = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const authState = useSelector<RootState, AuthState>((state) => state.authState);
    const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
    const { state } = useLocation<any>();
    const history = useHistory();

    useEffect(() => {
        setRedirectToReferrer(authState.data.authenticated);
    }, [authState]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: (values: IPayload, { setSubmitting }: FormikHelpers<IPayload>) => {
            dispatch(requestLogin(values));

            setTimeout(() => {
                setSubmitting(false);
            }, 5000);
        },
    });

    // if (redirectToReferrer === true) {
    //     return <Redirect to={state?.from || '/profile/user'} />;
    // }

    return (
        <Page name="login">
            <AuthContentWrapper>
                <UICard className={classes.card}>
                    <Title>Sign in to Rhizo</Title>
                    <UIForm formik={formik}>
                        <UIBox flex={1} flexDirection="column">
                            <UITextField id="email" name="email" onChange={formik.handleChange} value={formik.values.email} label="Email" placeholder="Enter email" email></UITextField>
                            <UIPasswordField id="password" name="password" onChange={formik.handleChange} value={formik.values.password} label="Password" placeholder="Input password" forgot={true}></UIPasswordField>
                            <UISpacer height={4}></UISpacer>
                            <UICheckBox id="keepLoggedIn" name="keepLoggedIn" label="Keep me logged in" checked></UICheckBox>
                            <UISpacer height={20}></UISpacer>
                            <UIButton type="submit" disabled={authState.loading} activity={authState.loading} color="second" style={{ width: '100%' }}>
                                {authState.loading ? 'Signing in to Rhizo' : 'Sign In'}
                            </UIButton>
                            <LinkWrapper>
                                <span>
                                    Don't have an account yet?{' '}
                                    <a
                                        href="./"
                                        title="Login"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            history.push('/registration');
                                            window.scrollTo(0, 0);
                                        }}
                                    >
                                        Register
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

export default SignIn;
