import React from 'react';
import styled from 'styled-components';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Page from '../common/Page';
import UICard from '../../ui-kit/core/UICard';
import UIForm from '../../ui-kit/form/UIForm';
import UITextField from '../../ui-kit/form/UITextField';
import UIBox from '../../ui-kit/layout/UIBox';
import AuthContentWrapper from '../../widget/AuthContentWrapper';
import animationData from '../../media/lottie/student-signin-forget.json';
import UIButton from '../../ui-kit/button/UIButton';
import UISpacer from '../../ui-kit/core/UISpacer';
import { AuthState, requestForgotPassword } from '../../store/state/AuthState';
import { RootState } from '../../store/state/RootReducer';
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

const Desc = styled.div`
    color: ${ThemeColor.messages};
    font-size: 12px;
    line-height: 140%;
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
        font-weight: ${FontWeight.medium};
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

const useStyles = makeStyles((Theme) => ({
    card: {
        boxShadow: 'none !important',
        border: `1px solid ${ThemeColor.border}`,
        maxWidth: '900px',
    },
}));

interface IPayload {
    email: string;
}

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
});

const ForgotPasswordPage = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const authState = useSelector<RootState, AuthState>((state) => state.authState);
    // const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
    // const { state } = useLocation<any>();
    // const history = useHistory();

    // useEffect(() => {
    //     setRedirectToReferrer(authState.data.authenticated);
    // }, [authState]);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: LoginSchema,
        onSubmit: (values: IPayload, { setSubmitting }: FormikHelpers<IPayload>) => {
            dispatch(requestForgotPassword(values));
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
                    <Title>Forget password?</Title>
                    <Desc>Please specify your email address to receive instructions for resetting it. If an account exists by that email, we will send a pssword reset.</Desc>
                    <UISpacer height={10} />
                    <UIForm formik={formik}>
                        <UIBox direction="column">
                            <UITextField id="email" name="email" onChange={formik.handleChange} value={formik.values.email} label="Email" placeholder="E-mail" email></UITextField>
                            <UIButton type="submit" disabled={authState.loading} activity={authState.loading} style={{ width: '100%' }} color="second">
                                {authState.loading ? 'Sending... ' : 'Continue'}
                            </UIButton>
                            <LinkWrapper>
                                <span>
                                    Already have an account?{' '}
                                    <a
                                        href="./"
                                        title="Login"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            history.push('/auth/login');
                                        }}
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

export default ForgotPasswordPage;
