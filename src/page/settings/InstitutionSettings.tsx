import { useFormik } from 'formik';
import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { institutionList } from '../../util/mock-api/data/institutionList';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import { QuestionIcon } from '../../ui-kit/icon/UIIconAssets';
import { Device } from '../../settings/Device';
import UIForm from '../../ui-kit/form/UIForm';
import UITitle from '../../ui-kit/core/UITitle';
import UIWarn from '../../ui-kit/core/UIWarn';
import UIButton from '../../ui-kit/button/UIButton';
import UISpacer from '../../ui-kit/core/UISpacer';
import UIBox from '../../ui-kit/layout/UIBox';
import UICustomModal from '../../ui-kit/core/UICustomModal';
import UITextField from '../../ui-kit/form/UITextField';
import UIHeading from '../../ui-kit/core/UIHeading';
import UICustomConfirmModal from '../../ui-kit/core/UICustomConfirmModal';
import UISelectField from '../../ui-kit/form/UISelectField';
import Footer from '../../page/common/Footer';
import WarnImage from '../../media/image/file/warn-image.png';

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

const ImageCotainer = styled.div`
    background-image: url(${WarnImage});
    width: 70px;
    height: 70px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    margin: 0 auto;
`;

const Label = styled.h4<any>`
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.label};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.basicBlack};
    margin: 15px 0px;
`;

const UISubtitle = styled.div`
    font-size: ${FontSize.sm};
    color: ${ThemeColor.subtitle};
    font-weight: ${FontWeight.regular};
    line-height: ${LineHeight.md};
`;

const WarnContainer = styled.div`
    width: 100%;
    text-align: center;
`;

const UIValue = styled.p`
    color: ${ThemeColor.value};
    font-size: ${FontSize.md};
    font-weight: ${FontWeight.medium};
`;

const Confirm = styled.p`
    color: ${ThemeColor.title};
    font-size: ${FontSize.md};
    margin: 0;
`;

const CustomLabel = styled.p`
    font-size: ${FontSize.md};
    color: ${ThemeColor.title};
    margin: 10px 0;
`;

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
}

const InstitutionSettings: FC<IProps> = (props) => {
    const { id } = props;

    const mentor = {
        institution: 'Stanford University',
        email: 'Test@test.com',
    };

    const student = {
        institution: 'Stanford University',
    };
    const [openStudent, setOpenStudent] = React.useState(false);
    const [openMentor, setOpenMentor] = React.useState(false);
    const [openMentorNextModal, setOpenMentorNextModal] = React.useState(false);
    const [insertValue, setInsertValue] = React.useState('');
    const [confirmText, setConfirmText] = React.useState('');
    const [handleConfirm, setHandleConfirm] = React.useState(true);

    const handleInstiEmail = (e) => {};

    // handle student
    const handleStudent = () => {
        setOpenStudent(true);
    };

    const handleStudentClose = () => {
        setOpenStudent(false);
    };

    // handle mentor
    const handleMentor = () => {
        setOpenMentor(true);
    };

    const handleMentorNextModal = () => {
        setOpenMentorNextModal(false);
        setConfirmText('');
        setHandleConfirm(true);
    };

    const handleMentorClose = () => {
        setOpenMentor(false);
    };

    const handleMentorSave = () => {
        setOpenMentor(false);
        setOpenMentorNextModal(true);
    };

    // handle confirm input form

    const handleInsertValue = (e) => {
        setConfirmText(e.target.value);
        if (e.target.value === 'I understand the consequences') {
            setHandleConfirm(false);
        } else {
            setHandleConfirm(true);
        }
    };

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values: any) => {},
    });
    return (
        <Wrapper id={id}>
            <UIForm formik={formik} style={{ width: '100%' }}>
                <UISpacer height={50} />
                <UIHeading header="Your Student Institution" subheader="This will be the default institution you will be logged into as a student.">
                    <UIButton color="basicline" size="small" onClick={handleStudent}>
                        Edit
                    </UIButton>
                </UIHeading>

                {/* STUDENT INSTITUTION MODAL */}
                <UICustomModal id="deleteConfirm" onClose={handleStudentClose} onSave={handleStudentClose} onBack={handleStudentClose} open={openStudent} title="Change Student Institution" subButtonLabel="Cancel" mainButtonLabel="Submit">
                    <UISubtitle style={{ width: '80%' }}>Configure the default institution that you log in to as a student. You can change institutions manually, too.</UISubtitle>
                    <UISpacer height={30}></UISpacer>
                    <UIBox alignItems="center">
                        <UITitle content="Your new institution" />
                        <UISpacer width={5}></UISpacer>
                        <QuestionIcon />
                    </UIBox>
                    <UISpacer height={10}></UISpacer>
                    <UISelectField id="institution" name="institution" placeholder="Select institution" options={institutionList} style={{ width: '100%' }} />
                </UICustomModal>
                <UISpacer height={25}></UISpacer>
                <Label>Institution Name</Label>
                <UIValue>{student.institution}</UIValue>

                <UISpacer height={40}></UISpacer>
                <UIHeading header="Your Mentor Institution" subheader="This is the institution in which your Mentor profile belong to. Any changes to this etting will erase all mentor settings stored on your account.">
                    <UIButton color="basicline" size="small" onClick={handleMentor}>
                        Edit
                    </UIButton>
                </UIHeading>
                <UISpacer height={25}></UISpacer>
                <Label>Institution Name</Label>
                <UIValue>{mentor.institution}</UIValue>
                <Label>Institution Verification Email</Label>
                <UIValue>{mentor.email}</UIValue>

                {/* MENTOR FIRST MODAL */}
                <UICustomModal id="deleteConfirm" onClose={handleMentorClose} onBack={handleMentorClose} onSave={handleMentorSave} open={openMentor} title="Change Mentor Institution" subButtonLabel="Cancel" mainButtonLabel="Next">
                    <UISubtitle style={{ width: '80%' }}>Configure the default institution that you log in to as a Mentor. You can change institution manually, too.</UISubtitle>
                    <UISpacer height={15}></UISpacer>
                    <UIBox alignItems="center">
                        <CustomLabel>Your new institution</CustomLabel>
                        <UISpacer width={5}></UISpacer>
                        <QuestionIcon />
                    </UIBox>
                    <UISpacer height={10}></UISpacer>
                    <UISelectField id="institution" name="institution" placeholder="Select institution" options={institutionList} style={{ width: '100%' }} />
                    <UISpacer height={30}></UISpacer>
                    <CustomLabel>Your institution email address</CustomLabel>
                    <UISpacer height={10}></UISpacer>
                    <UISubtitle>This email is to verify that you attend your selected institution. We will send you a verification link.</UISubtitle>
                    <UISpacer height={10}></UISpacer>
                    <UITextField id="instiEmail" name="instiEmail" style={{ width: '100%' }} onChange={handleInstiEmail} />
                    <UIWarn text="The new email that you provided does not match the institution domain of the university you have selected" />
                </UICustomModal>

                {/* MENTOR SECOND MODAL */}
                <UICustomConfirmModal id="deleteConfirm" onClose={handleMentorNextModal} open={openMentorNextModal} title="Are you Sure?" subButtonLabel="Cancel" mainButtonLabel="Change Institution" confirm={handleConfirm}>
                    <UISubtitle style={{ width: '80%' }}>You will lost all setting and data associated with your current mentor profile if you change institutions. This is not an action that can be reversed.</UISubtitle>
                    <UISpacer height={20}></UISpacer>
                    <WarnContainer>
                        <ImageCotainer></ImageCotainer>
                    </WarnContainer>
                    <UISpacer height={20}></UISpacer>
                    <Confirm>Type "I understand the consequences" to proceed.</Confirm>
                    <UISpacer height={10}></UISpacer>
                    <UITextField id="instiEmail" name="instiEmail" style={{ width: '100%' }} value={confirmText} onChange={handleInsertValue} />
                </UICustomConfirmModal>
            </UIForm>
            <UISpacer height={80}></UISpacer>
            <Footer />
        </Wrapper>
    );
};

InstitutionSettings.defaultProps = {};

export default InstitutionSettings;
