import { useFormik } from 'formik';
import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Device } from '../../settings/Device';
import { Padding } from '../../settings/Padding';
import UIButton from '../button/UIButton';
import UIDevider from '../core/UIDevider';
import UISpacer from '../core/UISpacer';
import UIForm from '../form/UIForm';
import UIBox from '../layout/UIBox';
import ProfileDetails from './ProfileDetails';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 25px;
    width: 340px;
    flex: none;
    background: ${ThemeColor.white};
    border-radius: 15px;

    overflow: auto;
    max-height: 100%;

    > h4 {
        font-style: normal;
        font-weight: ${FontWeight.bold};
        font-size: ${FontSize.xxl};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.grey45};
        margin-bottom: 15px;
        margin: 0px;
    }

    @media (max-width: ${Device.mobileMedium - 1}px) {
        display: none;
    }
    @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
        width: 220px;
        padding: ${Padding.sm}px;
        display: none;

        .tablet-hidden {
            display: none;
        }
    }
    @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
        width: 220px;
        padding: ${Padding.md}px;
        display: none;

        .tablet-hidden {
            display: none;
        }
    }

    @media (min-width: ${Device.laptop}px) and (max-width: ${Device.laptopLarge - 1}px) {
        padding: ${Padding.md}px;
    }
    @media (min-width: ${Device.laptopLarge}px) and (max-width: ${Device.desktop - 1}px) {
        padding: ${Padding.lg}px;
    }
    @media (min-width: ${Device.desktop}px) {
        padding: ${Padding.xl}px;
    }
`;

const ContentWrapper = styled.div<any>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 1;
    align-self: stretch;
`;

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    profileType: string;
    profilePic: string;
    profileName: string;
}

const ProfileBar: FC<IProps> = (props) => {
    const { id, children, profileType, profilePic, profileName } = props;

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values: any) => {},
    });

    return (
        <Wrapper id={id}>
            <UIForm formik={formik}>
                <ProfileDetails profileName={profileName} profileType={profileType} profilePic={profilePic} />
                <UIDevider className="tablet-hidden" margin={[15, 0, 15, 0]} />
                <UIBox className="tablet-hidden" flex>
                    <UIButton block>My Courses</UIButton>
                    <UISpacer width={10} />
                    <UIButton color="info" block>
                        Settings
                    </UIButton>
                </UIBox>
                <UISpacer className="tablet-hidden" height={20} />
                <ContentWrapper>{children}</ContentWrapper>
            </UIForm>
        </Wrapper>
    );
};

ProfileBar.defaultProps = {};

export default ProfileBar;
