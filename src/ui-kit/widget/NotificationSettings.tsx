import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import UIButton from '../button/UIButton';
import UIDevider from '../core/UIDevider';
import UISpacer from '../core/UISpacer';
import UISwitch from '../core/UISwitch';
import UIBox from '../layout/UIBox';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    flex: 1;
    /* padding: 0px 25px 0px 25px; */
    padding: 0px;
`;

const Label = styled.h4<any>`
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.lg};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.grey45};
    margin: 10px 0px;
`;

const SubText = styled.h4<any>`
    font-style: normal;
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.md};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.grey165};
    margin: 0px 0px 8px 0px;
`;

const SettingsWrapper = styled.div<any>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    align-self: stretch;
    background: ${ThemeColor.white};
    border: 1px solid ${ThemeColor.grey229};
    box-sizing: border-box;
    border-radius: 13px;
    padding: 12px 15px;
    margin: 5px 0px;

    > h4 {
        font-style: normal;
        font-weight: ${FontWeight.bold};
        font-size: ${FontSize.md};
        line-height: ${LineHeight.md};
        display: flex;
        align-items: center;
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.grey104};
        margin: 0px;
        user-select: none;
    }
`;

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
}

const NotificationSettings: FC<IProps> = (props) => {
    const { id } = props;
    return (
        <Wrapper id={id}>
            <UIBox direction="column" padding={[0, 25, 0, 25]}>
                <Label>Messages</Label>
                <SubText>The hourly rate that students will be paying you on Rhizo.</SubText>
                <SettingsWrapper>
                    <h4>Email</h4>
                    <UISwitch />
                </SettingsWrapper>
                <SettingsWrapper>
                    <h4>Text messages</h4>
                    <UISwitch />
                </SettingsWrapper>
                <SettingsWrapper>
                    <h4>Browser notifications</h4>
                    <UISwitch />
                </SettingsWrapper>
                <UISpacer height={25} />
                <Label>Reinders</Label>
                <SubText>The hourly rate that students will be paying you on Rhizo.</SubText>
                <SettingsWrapper>
                    <h4>Email</h4>
                    <UISwitch />
                </SettingsWrapper>
                <SettingsWrapper>
                    <h4>Text messages</h4>
                    <UISwitch />
                </SettingsWrapper>
                <SettingsWrapper>
                    <h4>Browser notifications</h4>
                    <UISwitch />
                </SettingsWrapper>
            </UIBox>

            <UIDevider />
            <UISpacer height={10} />

            <UIBox padding={[0, 25, 0, 25]}>
                <UIButton color="basic">Cancel</UIButton>
                <UISpacer width={10} />
                <UIButton>Save settings</UIButton>
            </UIBox>
            <UISpacer height={5} />
        </Wrapper>
    );
};

NotificationSettings.defaultProps = {};

export default NotificationSettings;
