/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../common/Page';
import UICard from '../../ui-kit/core/UICard';
import AuthContentWrapper from '../../widget/AuthContentWrapper';
import { RootState } from '../../store/state/RootReducer';
import { ProfileState } from '../../store/state/ProfileState';
import { AuthState } from '../../store/state/AuthState';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import { Device } from '../../settings/Device';
import SelectUserTypeStep from './steps/SelectUserTypeStep';
import StudentProfile from './steps/StudentProfile';
import TutorProfilePage from './steps/TutorProfilePage';
import InstitutionVerification from './steps/InstitutionVerification';
import UIButton from '../../ui-kit/button/UIButton';

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

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: end;
    > div {
        display: flex;
        width: 50%;
        gap: 10px;
        justify-content: space-between;
        > div {
            flex-grow: 1;
        }
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
}));

const SelectUserType = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const authState = useSelector<RootState, AuthState>((state) => state.authState);
    const [userType, setUserType] = useState('student');
    const [selectedProfile, setSelectedProfile] = useState(null);
    const profile = useSelector<RootState, ProfileState>((state) => state.profileState);
    const [activeStep, setActiveStep] = React.useState(1);
    const [steps, setSteps] = useState([]); // TODO replace this part with useSelect later
    const [showNextButton, setShowNextButton] = useState(true);
    const [sentCode, setSentCode] = useState(false);

    useEffect(() => {
        if (userType === 'student') {
            setSteps(['User information', 'Student Profile']);
        } else if (userType === 'tutor') {
            setSteps(['User information', 'Mentor Profile', 'Institution Verification']);
        }
    }, [userType]);

    useEffect(() => {
        if (activeStep === 2 && sentCode) {
            setShowNextButton(true);
        } else if (activeStep === 2 && !sentCode) {
            setShowNextButton(false);
        } else {
            setShowNextButton(true);
            setSentCode(false);
        }
    }, [activeStep, sentCode]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(1);
    };

    const handleShowNextButton = () => {
        setSentCode(true);
    };

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <SelectUserTypeStep />;
            case 1:
                if (userType === 'student') {
                    return <StudentProfile />;
                } else if (userType === 'tutor') {
                    return <TutorProfilePage />;
                }
                break;
            case 2:
                if (userType === 'student') {
                    return '';
                } else if (userType === 'tutor') {
                    return <InstitutionVerification handleShowNextButton={handleShowNextButton} activeSteps={activeStep} />;
                }
                break;
            default:
                return '';
        }
    }

    return (
        <Page name="profile-user">
            <AuthContentWrapper style={{ display: 'block' }}>
                <Regis>Registration</Regis>
                <Title>Complete your profile</Title>
                <SubTitle>Before we kick things-off, let's get your profile set up. It will be quick.</SubTitle>
                <UICard className={classes.card} style={{ margin: '0 auto' }}>
                    <div className={classes.root}>
                        <Stepper alternativeLabel activeStep={activeStep}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <div>
                            {activeStep === steps.length ? (
                                <div></div>
                            ) : (
                                <div>
                                    <div className={classes.instructions}>{getStepContent(activeStep)}</div>
                                    <ButtonsContainer>
                                        <div>
                                            {steps.length !== 1 && (
                                                <UIButton disabled={activeStep === 0 || activeStep === 1} onClick={handleBack} className={classes.button} color="basic">
                                                    Back
                                                </UIButton>
                                            )}
                                            {showNextButton && (
                                                <UIButton color="second" onClick={handleNext} className={classes.button}>
                                                    Next
                                                </UIButton>
                                            )}
                                        </div>
                                    </ButtonsContainer>
                                </div>
                            )}
                        </div>
                    </div>
                </UICard>
            </AuthContentWrapper>
        </Page>
    );
};

export default SelectUserType;
