import React, { FC, ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/state/RootReducer';
import { LockIcon } from '../../ui-kit/icon/UIIconAssets';
import UIBox from '../../ui-kit/layout/UIBox';
import Content from '../common/Content';
import Header from '../common/Header';
import UINavigation from '../common/UINavigation';
import UITabNav from '../../ui-kit/navigation/tab/UITabNav';
import UITabPanel from '../../ui-kit/navigation/tab/UITabPanel';
import UISpacer from '../../ui-kit/core/UISpacer';
import UIDevider from '../../ui-kit/core/UIDevider';
import ProfileSettings from '../../ui-kit/widget/ProfileSettings';
import InstitutionSettings from './InstitutionSettings';
import PersonalInformation from './PersonalInformation';
import CourseVerification from './CourseVerification';
import Billing from './Billing';
import Payout from './payout/Payout';
import { FontSize, FontWeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const PageContentWrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    width: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 0px !important;
        background: transparent; /* make scrollbar transparent */
    }
`;

const MainContentWrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background: ${ThemeColor.white};
    border-radius: 15px;
    margin: 20px;
    margin-right: 20px;
    flex: 1;
    overflow: hidden;
`;

const buttonList = [
    { label: 'Tutor', value: 'tutor', icon: LockIcon },
    { label: 'Student', value: 'student' },
];

const UITitle = styled.p`
    font-size: ${FontSize.xl};
    font-weight: ${FontWeight.medium};
    color: ${ThemeColor.title};
    margin: 0;
`;

const UIBigTitle = styled.p`
    font-size: ${FontSize.modalTitle};
    font-weight: ${FontWeight.medium};
    color: ${ThemeColor.title};
    margin: 0;
`;

const UISubtitle = styled.div`
    font-size: 14px;
    color: ${ThemeColor.subtitle};
`;

const UIDiv = styled.div`
    // padding: 20px;
`;

const bankData = {
    bankAccount: 'X031',
    balance: 451,
};
interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
}

const SettingsPage: FC<IProps> = (props) => {
    const { id } = props;
    const [index, setIndex] = useState(0);
    const [profileType, setProfiletype] = useState(buttonList[0]);
    const isTutor = useSelector<RootState, boolean>((s) => s.profileState.user.isTutor);

    useEffect(() => {}, []);

    const [tabLabelsTutor] = useState([
        { id: 'Profile Settings', label: 'Profile Settings' },
        { id: 'Mentor Information', label: 'Mentor Information' },
        { id: 'Billing', label: 'Billing' },
        { id: 'Payout', label: 'Payout' },
        { id: 'Institution Settings', label: 'Institution Settings' },
        { id: 'Course Verification', label: 'Course Verification' },
    ]);

    const [tabLabelsNotTutor] = useState([
        { id: 'Profile Settings', label: 'Profile Settings' },
        { id: 'Billing', label: 'Billing' },
        { id: 'Institution Settings', label: 'Institution Settings' },
    ]);

    const handleChangeIndex = (x) => {
        setIndex(x);
    };

    const onProfileChange = (x) => {
        setProfiletype(x);
    };

    return (
        <>
            <Header />
            <UINavigation />
            <Content style={{ maxWidth: '1440px' }}>
                <PageContentWrapper id={id}>
                    <MainContentWrapper>
                        <UIDiv>
                            <UISpacer height={20} />
                            <UIBigTitle>Settings</UIBigTitle>
                            <UISpacer height={10} />
                            <UISubtitle>Update your personal information, payment methods, user settings and more.</UISubtitle>
                        </UIDiv>
                        <UIDevider />
                        <UISpacer height={35}></UISpacer>
                        <UISpacer height={40}></UISpacer>
                        <UITitle>Account Settings</UITitle>
                        {isTutor ? (
                            <UITabNav id="settingsTab" labels={tabLabelsTutor} onChange={handleChangeIndex}>
                                <UITabPanel id={id} hidden={index !== 0} index={index}>
                                    <UIBox padding={[16, 0, 0, 0]}>
                                        <ProfileSettings />
                                    </UIBox>
                                </UITabPanel>
                                <UITabPanel id={id} hidden={index !== 1} index={index}>
                                    <UIBox padding={[16, 0, 0, 0]}>
                                        <PersonalInformation />
                                    </UIBox>
                                </UITabPanel>
                                <UITabPanel id={id} hidden={index !== 2} index={index}>
                                    <UIBox padding={[16, 0, 0, 0]}>
                                        <Billing />
                                    </UIBox>
                                </UITabPanel>
                                <UITabPanel id={id} hidden={index !== 3} index={index}>
                                    <UIBox padding={[16, 0, 0, 0]}>
                                        <Payout bankData={bankData} />
                                    </UIBox>
                                </UITabPanel>
                                <UITabPanel id={id} hidden={index !== 4} index={index}>
                                    <UIBox padding={[16, 0, 0, 0]}>
                                        <InstitutionSettings />
                                    </UIBox>
                                </UITabPanel>
                                <UITabPanel id={id} hidden={index !== 5} index={index}>
                                    <UIBox padding={[16, 0, 0, 0]}>
                                        <CourseVerification />
                                    </UIBox>
                                </UITabPanel>
                            </UITabNav>
                        ) : (
                            <UITabNav id="settingsTab" labels={tabLabelsNotTutor} onChange={handleChangeIndex}>
                                <UITabPanel id={id} hidden={index !== 0} index={index}>
                                    <UIBox padding={[16, 0, 0, 0]}>
                                        <ProfileSettings />
                                    </UIBox>
                                </UITabPanel>
                                <UITabPanel id={id} hidden={index !== 1} index={index}>
                                    <UIBox padding={[16, 0, 0, 0]}>
                                        <Billing />
                                    </UIBox>
                                </UITabPanel>
                                <UITabPanel id={id} hidden={index !== 2} index={index}>
                                    <UIBox padding={[16, 0, 0, 0]}>
                                        <InstitutionSettings />
                                    </UIBox>
                                </UITabPanel>
                            </UITabNav>
                        )}
                    </MainContentWrapper>
                </PageContentWrapper>
            </Content>
        </>
    );
};

SettingsPage.defaultProps = {};

export default SettingsPage;
