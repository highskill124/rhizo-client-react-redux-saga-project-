/* eslint-disable no-unused-vars */
import React, { useEffect, useState, FC } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../common/Page';
import UICard from '../../../ui-kit/core/UICard';
import UIForm from '../../../ui-kit/form/UIForm';
import UIBox from '../../../ui-kit/layout/UIBox';
import AuthContentWrapper from '../../../widget/AuthContentWrapper';
import { RootState } from '../../../store/state/RootReducer';
import { ProfileState, requestUpdateStudentProfile, requestUpdateUserProfile, requestGetUserProfile, requestGetProfile } from '../../../store/state/ProfileState';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';
import { Device } from '../../../settings/Device';
import { Profile } from '../../../settings';
import StudentProfileForm from './StudentProfileForm';

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

interface IProps {
    id?: string;
}

const StudentProfilePage: FC<IProps> = (props) => {
    const { id } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    // const history = useHistory();
    const [intialValues, setIntialValues] = useState(null);

    const profile = useSelector<RootState, ProfileState>((state) => state.profileState);

    useEffect(() => {
        dispatch(requestGetProfile());
    }, [dispatch]);

    useEffect(() => {
        if (profile.user.data && profile.user.data.onboardingStage && profile.user.data.onboardingStage.onboardStudent) {
            setIntialValues({
                profileType: profile.user.data.basicProfile.profileType,
            });
        }
    }, [profile]);

    const handleSubmit = (values) => {
        dispatch(requestUpdateStudentProfile(values));
    };

    return (
        <Page name="profile-student">
            <AuthContentWrapper style={{ display: 'block' }}>
                <>
                    <Regis>Registration</Regis>
                    <Title>Complete your profile</Title>
                    <SubTitle>Before we kick things-off, let's get your profile set up. It will be quick.</SubTitle>
                </>
                <UICard className={classes.card} style={{ margin: '0 auto' }}>
                    {intialValues && <StudentProfileForm onSubmit={handleSubmit} initialValues={intialValues} />}
                </UICard>
            </AuthContentWrapper>
        </Page>
    );
};

StudentProfilePage.defaultProps = {};

export default StudentProfilePage;
