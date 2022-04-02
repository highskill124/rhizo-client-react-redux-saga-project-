import { useFormik } from 'formik';
import React, { FC, ReactNode, useState, useEffect } from 'react';
import styled from 'styled-components';
import UIButton from '../button/UIButton';
import UISpacer from '../core/UISpacer';
import UIForm from '../form/UIForm';
import UITextField from '../form/UITextField';
import UIBox from '../layout/UIBox';
import UIDatePicker from '../form/UIDatePicker';
import UIContent from '../core/UIContent';
import UISubtitle from '../core/UISubtitle';
import UIHeading from '../core/UIHeading';
import { PlusIcon, CameraIcon, BinIcon, TickIcon } from '../icon/UIIconAssets';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import { Device } from '../../settings/Device';
import Footer from '../../page/common/Footer';
import InviteCode from '../core/InviteCode';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    flex: 1;
    padding: 0px;

    & .name-container {
        flex-wrap: wrap;
    }

    @media (max-width: ${Device.laptop - 1}px) {
        & .info-content {
            flex-wrap: wrap-reverse;
        }
        padding: 0px 10px;
    }
`;

const Label = styled.h4<any>`
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.lg};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.grey45};
    margin: 15px 0px;
`;

const ProfilePicWrapper = styled.div<any>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    width: 200px;
    height: 200px;
    background: ${ThemeColor.white};
    border: 1px dashed ${ThemeColor.grey165};
    box-sizing: border-box;
    border-radius: 100%;

    svg {
        * {
            fill: ${ThemeColor.grey165};
        }
    }
`;

const UICard = styled.div`
    background-color: ${ThemeColor.cardBack};
    border: 1px solid ${ThemeColor.border};
    border-radius: 6px;
    padding: 20px;
    max-width: 390px;
`;

const ProfilePhoto = styled.div``;

const UIDiv = styled.div``;

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    footer?: boolean;
}

const ProfileSettings: FC<IProps> = (props) => {
    const { id, footer } = props;

    // some dummy data (replace data from api in here)
    const initialData = {
        firstName: 'aaa',
        lastName: 'aaa',
        phone: '123',
        address: 'aaa',
        birthday: '11/11/2021',
    };

    const [studentData, setStudentData] = useState<any>(initialData);

    const [editState, setEditState] = useState(true);
    const [studentFirstName, setStudentFirstName] = useState<any>(studentData.firstName);
    const [studentLastName, setStudentLastName] = useState<any>(studentData.lastName);
    const [studentPhone, setStudentPhone] = useState<any>(studentData.phone);
    const [studentAddress, setStudentAddress] = useState<any>(studentData.address);

    const handleEdit = () => {
        setEditState(false);
    };

    const handleSave = () => {
        setStudentData({
            firstName: studentFirstName,
            lastName: studentLastName,
            phone: studentPhone,
            address: studentAddress,
        });
        setEditState(true);
    };

    const handleCancel = () => {
        setStudentFirstName(studentData.firstName);
        setStudentLastName(studentData.lastName);
        setStudentAddress(studentData.address);
        setStudentPhone(studentData.phone);
        setEditState(true);
    };

    // HANDLE USER INFORMATION FORM
    const handleStudentFirstName = (event: any) => {
        setStudentFirstName(event.target.value);
    };

    const handleStudentLastName = (event: any) => {
        setStudentLastName(event.target.value);
    };

    const handleStudentPhone = (event: any) => {
        setStudentPhone(event.target.value);
    };

    const handleStudentAddress = (event: any) => {
        setStudentAddress(event.target.value);
    };

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values: any) => {},
    });
    return (
        <Wrapper id={id}>
            <UISpacer height={50}></UISpacer>
            <UIBox alignItems="center" justifyContent="space-between" style={{ maxWidth: '800px' }}>
                <UIHeading header="Personal Information" subheader="Update your personal information">
                    <UIButton color="basicline" size="small" onClick={handleEdit}>
                        Edit
                    </UIButton>
                </UIHeading>
            </UIBox>

            <UIBox className="info-content">
                <UIDiv>
                    <UIForm formik={formik} style={{ width: '100%' }}>
                        <UISpacer height={15} />
                        <UIBox className="name-container">
                            <UITextField id="firstName" name="firstName" label="First Name" style={{ maxWidth: '390px' }} value={studentFirstName} onChange={handleStudentFirstName} readOnly={editState} />)
                            <UISpacer width={20} />
                            <UITextField id="lastName" name="lastName" label="Last Name" style={{ maxWidth: '390px' }} value={studentLastName} onChange={handleStudentLastName} readOnly={editState} />
                        </UIBox>
                        <UITextField id="phone" name="phone" label="phone" style={{ maxWidth: '216px' }} value={studentPhone} onChange={handleStudentPhone} readOnly={editState} />
                        <UITextField id="address" name="address" label="Address" style={{ maxWidth: '442px' }} value={studentAddress} onChange={handleStudentAddress} readOnly={editState} />
                        <UIDatePicker id="birthday" name="birthday" label="birthday" style={{ maxWidth: '216px' }} readOnly={editState} />
                        <UISpacer height={10}></UISpacer>
                        {!editState && (
                            <UIBox justifyContent="end">
                                <UIButton color="basicline" onClick={handleCancel}>
                                    Cancel
                                </UIButton>
                                <UISpacer width={5}></UISpacer>
                                <UIButton color="second" onClick={handleSave}>
                                    Save
                                </UIButton>
                            </UIBox>
                        )}
                        <UISpacer height={40}></UISpacer>

                        <UIHeading header="Your profile type" subheader="Update your personal information"></UIHeading>
                        <UISpacer height={25}></UISpacer>
                        <UIBox style={{ flexWrap: 'wrap', gap: '15px' }}>
                            <UIButton color="second">
                                <TickIcon />
                                <UISpacer width={10} />
                                Student
                            </UIButton>
                            {/* <UIButton color="basic"><TickIcon /><UISpacer width={10} />Become a mentor and earn money</UIButton> */}
                            <UIButton color="second">
                                <TickIcon />
                                <UISpacer width={10} />
                                Mentor
                            </UIButton>
                        </UIBox>
                        <UISpacer height={40} />

                        <UIHeading header="Account Security" subheader="Change your password or delete your account"></UIHeading>
                        <UISpacer height={25}></UISpacer>
                        <UIBox style={{ flexWrap: 'wrap', gap: '20px' }}>
                            <UICard>
                                <UIBox>
                                    <UIDiv>
                                        <UISubtitle content="Password" />
                                        <UISpacer height={5}></UISpacer>
                                        <UIContent content="You can reset or change your password by clicking here" />
                                    </UIDiv>
                                    <UISpacer width={15}></UISpacer>
                                    <UIButton color="basic">Change</UIButton>
                                </UIBox>
                            </UICard>
                            <UICard>
                                <UIBox>
                                    <UIDiv>
                                        <UISubtitle content="Remove account" />
                                        <UISpacer height={5}></UISpacer>
                                        <UIContent content="Once you delete your account, there is no going back." />
                                    </UIDiv>
                                    <UISpacer width={15}></UISpacer>
                                    <UIButton color="dangerline">Deactivate</UIButton>
                                </UIBox>
                            </UICard>
                        </UIBox>
                    </UIForm>
                </UIDiv>

                <UIBox justifyContent="center" style={{ flexGrow: 1 }}>
                    <ProfilePhoto>
                        <UISpacer height={50}></UISpacer>
                        <ProfilePicWrapper>
                            <PlusIcon />
                        </ProfilePicWrapper>
                        <UISpacer height={20} />
                        <UIBox justifyContent="center">
                            <UIButton size="medium" color="basicline">
                                Upload
                                <UISpacer width={25} />
                                <span>
                                    <CameraIcon />
                                </span>
                            </UIButton>
                            <UISpacer width={5} />
                            <UIButton size="medium" color="basicline">
                                <BinIcon />
                            </UIButton>
                        </UIBox>
                        <UISpacer height={5}></UISpacer>
                        <UIContent style={{ textAlign: 'center' }} content="Up to 1 MB (300x300 px)" />
                    </ProfilePhoto>
                </UIBox>
            </UIBox>
            <UISpacer height={80}></UISpacer>
            {footer && <Footer />}
        </Wrapper>
    );
};

ProfileSettings.defaultProps = {
    footer: true,
};

export default ProfileSettings;
