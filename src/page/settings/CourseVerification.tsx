import { useFormik } from 'formik';
import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import { FontSize, FontWeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import { Device } from '../../settings/Device';
import UIForm from '../../ui-kit/form/UIForm';
import UIButton from '../../ui-kit/button/UIButton';
import UISpacer from '../../ui-kit/core/UISpacer';
import UIBox from '../../ui-kit/layout/UIBox';
import UITextField from '../../ui-kit/form/UITextField';
import UISimpleCheckBox from '../../ui-kit/form/UISimpleCheckBox';
import UIHeading from '../../ui-kit/core/UIHeading';
import FileUploader from '../../ui-kit/form/NewFileUpload';
import Footer from '../common/Footer';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    flex: 1;
    padding: 0px;
    @media (max-width: ${Device.laptop - 1}px) {
        padding: 0px 10px;
    }
`;

const Credits = styled.p`
    color: ${ThemeColor.title};
    font-size: ${FontSize.xxxxl};
    font-weight: 500;
`;

const Desc = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.md};
`;

const Course = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.lg};
    margin: 0;
    font-weight: ${FontWeight.medium};
`;

const Container = styled.div`
    width: 100%;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${ThemeColor.border};
`;

const EarnContainer = styled.div`
    width: 100%;
    padding: 15px 0;
    border-bottom: 1px solid ${ThemeColor.border};
`;

const Pool = styled.div`
    width: 70%;
    margin-left: 0;
`;

const Submit = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
`;

const useStyles = makeStyles((theme) => ({}));

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
}

const SUBJECTS = [
    { id: 1, item: 'ECON 101' },
    { id: 2, item: 'CS 10' },
    { id: 3, item: 'Biology 8' },
    { id: 4, item: 'CHEM 5' },
];

const CourseVerification: FC<IProps> = (props) => {
    const { id } = props;
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values: any) => {},
    });

    const [ids, setIds] = useState<Array<number>>([]);
    const [earned, setEarned] = useState<Array<string>>([]);

    const selectSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
        // eslint-disable-next-line radix
        const selectedId = parseInt(event.target.value);
        if (ids.includes(selectedId)) {
            const newIds = ids.filter((i) => i !== selectedId);
            setIds(newIds);
        } else {
            const newIds = [...ids];
            newIds.push(selectedId);
            setIds(newIds);
        }
    };

    const onEarned = (e, i) => {};

    return (
        <Wrapper id={id}>
            <UIForm formik={formik} style={{ width: '100%' }}>
                <Pool>
                    <UISpacer height={50} />
                    <UIHeading header="Verification credits" subheader="Edit or delete your current saved payment method."></UIHeading>
                    <UISpacer height={10}></UISpacer>
                    <Credits>1</Credits>
                    <Desc>Credits remaining</Desc>
                    <UISpacer height={30}></UISpacer>
                    <UIHeading header="Select Course to Verify" subheader="For each course you select, input the grade earned for the course exactly as displayed on your transcript. Any inconsistencies will result in your request being rejected."></UIHeading>
                    {SUBJECTS.length > 0 &&
                        SUBJECTS.map((subject) => (
                            <Container key={subject.id}>
                                <Course>{subject.item}</Course>
                                <UISimpleCheckBox value={subject.id} checked={!!ids.includes(subject.id)} onChange={selectSubject}></UISimpleCheckBox>
                            </Container>
                        ))}
                    <UISpacer height={50}></UISpacer>
                    <UIHeading header="Grade earned"></UIHeading>
                    {ids.map((i, index) => (
                        <EarnContainer>
                            <UIBox justifyContent="space-between" alignItems="center" key={index}>
                                <Course>{SUBJECTS[i - 1].item}</Course>
                                <UITextField name="earned" value={earned[i]} onChange={(e) => onEarned(e, i)} style={{ width: '80px', marginBottom: '0' }}></UITextField>
                            </UIBox>
                        </EarnContainer>
                    ))}
                    <UISpacer height={50}></UISpacer>
                    <UIHeading header="Upload Officiall Transcript" subheader="You must upload an official transcript received from your school. Misrepresenting your acedemic achievements are serious offence. Rhizo reserves the right to verify the transcript you submit with your university."></UIHeading>
                    <UISpacer height={20}></UISpacer>
                    <FileUploader />
                    <UISpacer height={40}></UISpacer>
                    <Submit>
                        <UIButton color="second">Submit Verification</UIButton>
                    </Submit>
                </Pool>
            </UIForm>
            <UISpacer height={80}></UISpacer>
            <Footer />
        </Wrapper>
    );
};

CourseVerification.defaultProps = {};

export default CourseVerification;
