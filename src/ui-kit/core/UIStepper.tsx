import React, { FC, ReactNode, useContext } from 'react';
import styled, { css } from 'styled-components';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import UIButton from '../button/UIButton';
import { array } from 'yup/lib/locale';

const useStyles = makeStyles((theme) => ({
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

interface IProps {
    className?: string;
    children?: ReactNode;
    style?: any;
    stepLabel: Array<string>;
    stepNumber?: number;
    stepComponent?: Array<any>;
    disabled?: boolean;
}

function getStepContent(step: number, stepLabel: Array<string>, component: Array<string>) {
    let i: number;
    for (i = 0; i < stepLabel.length && step !== i; i++);
    if (i === stepLabel.length) return 'default';
    return component[i];
}

const UIStepper: FC<IProps> = ({ children, style, className, stepLabel, stepNumber, stepComponent, disabled }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root} style={style}>
            <Stepper alternativeLabel activeStep={activeStep}>
                {stepLabel.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === stepLabel.length ? (
                    <div>
                        <Typography className={classes.instructions}>{getStepContent(activeStep - 1, stepLabel, stepComponent)}</Typography>
                        <Button onClick={handleReset} className={classes.button}>
                            Reset
                        </Button>
                        <UIButton color="second">Submit</UIButton>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>{getStepContent(activeStep, stepLabel, stepComponent)}</Typography>
                        <div>
                            {stepLabel.length !== 1 && (
                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                    Back
                                </Button>
                            )}
                            <UIButton color="second" onClick={handleNext} className={classes.button} disabled={disabled}>
                                {activeStep === stepLabel.length - 1 ? 'Finish' : 'Next'}
                            </UIButton>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

UIStepper.defaultProps = {};
export default UIStepper;
