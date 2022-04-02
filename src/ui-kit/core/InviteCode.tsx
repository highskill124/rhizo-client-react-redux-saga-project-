import React, { FC, ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';
import { FontSize, FontWeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import UITextField from '../form/UITextField';
import UIButton from '../button/UIButton';
import UIBox from '../layout/UIBox';
import UISpacer from './UISpacer';
import UICard from './UICard';
import { Device } from '../../settings/Device';

const Wrapper = styled.div<Partial<IProps>>`
    font-size: ${FontSize.sm};
    color: ${ThemeColor.content};
    width: 100%;
    text-align: center;
    div {
        background: none;
    }
`;

const Header = styled.p`
    color: ${ThemeColor.title};
    font-size: ${FontSize.xxxl};
`;

const LeftContainer = styled.div`
    max-width: 650px;
`;

const Content = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.sm};
    line-height: 135%;
`;

const LeftHeader = styled.p`
    color: ${ThemeColor.secondDark};
    font-size: ${FontSize.xxxxl};
    text-align: left;
`;

const LeftContent = styled.p`
    color: ${ThemeColor.secondDark};
    font-size: ${FontSize.xxl};
    opacity: 0.75;
    text-align: left;
`;

const Div = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 50px auto;
    @media (max-width: ${Device.tablet - 1}px) {
        width: 100%;
    }
`;

interface IProps {
    className?: string;
    style?: any;
}

const UIContent: FC<IProps> = ({ style }) => {
    const [inviteCode, setInviteCode] = useState('');
    const handleInvite = (e) => {
        setInviteCode(e.target.value);
    };

    return (
        <Wrapper style={style}>
            <Header>Your friend's invite code</Header>
            <Content>If you were invited by a friend, paste their invite code below to help them win an iPad.</Content>
            <Div>
                <UITextField name="invitecode" onChange={handleInvite} value={inviteCode} placeholder="Paste invite code here"></UITextField>
                <UISpacer width={10}></UISpacer>
                <UIButton color="second">Confirm</UIButton>
            </Div>
            <UISpacer height={50}></UISpacer>
            <UICard flat style={{ backgroundColor: `${ThemeColor.second}` }}>
                <UIBox justifyContent="space-between" alignItems="baseline" style={{ gap: '50px', flexWrap: 'wrap' }}>
                    <LeftContainer>
                        <LeftHeader>You've been added to the iPad draw!</LeftHeader>
                        <LeftContent>Invite a friend to increase your chances of winning! Simply send them an invite code and tell them to paste it above.</LeftContent>
                    </LeftContainer>
                    <div style={{ flexShrink: 0 }}>
                        <UIButton color="secondDark">Copy Invite Code</UIButton>
                    </div>
                </UIBox>
            </UICard>
        </Wrapper>
    );
};

UIContent.defaultProps = {};
export default UIContent;
