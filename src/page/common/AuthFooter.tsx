import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Device } from '../../settings/Device';
import { Layout } from '../../settings/Layout';
import { ThemeColor } from '../../settings/ThemeColor';
import { LogoIcon, TwitterIconAuth, LinkedinIconAuth, FacebookIconAuth } from '../../ui-kit/icon/UIIconAssets';
import UISpacer from '../../ui-kit/core/UISpacer';
import UIDevider from '../../ui-kit/core/UIDevider';

import { FontWeight } from '../../settings/Font';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
    background-color: ${ThemeColor.footer};
    width: 100vw;
    margin-top: 300px;
    height: calc(100vh - ${Layout.header.height.laptop}px);
    padding: 70px 110px;

    @media (max-width: ${Device.tablet}px) and (min-width: ${Device.mobileMedium + 1}px) {
        padding: 50px;
    }

    @media (max-width: ${Device.mobileMedium - 1}px) {
        padding: 50px;
    }
`;

const Div = styled.div`
    width: 320px;
    color: ${ThemeColor.messages};
    font-size: 16px;
    @media (max-width: ${Device.tablet - 1}px) {
        display: none;
    }
`;

const Links = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: ${Device.tablet - 1}px) {
        flex-direction: column;
        gap: 20px;
    }
`;

const Socials = styled.div`
    display: flex;
    width: 130px;
    justify-content: space-between;
    align-items: center;
`;

const ContactContainer = styled.div`
    width: 500px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > a {
        color: ${ThemeColor.messages};
        font-weight: ${FontWeight.medium};
    }
    @media (max-width: ${Device.tablet - 1}px) {
        display: flex;
        text-align: center;
        flex-direction: column;
        gap: 20px;
        width: 100%;
    }
`;

const P = styled.p`
    color: #98a2b3;
    font-size: 16px;
`;

const LogoContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    @media (max-width: ${Device.tablet - 1}px) {
        justify-content: center;
    }
`;

type Props = {
    id?: string;
};

const AuthFooter: FC<Props> = (props) => {
    return (
        <Wrapper id="content">
            <LogoContainer>
                <LogoIcon />
            </LogoContainer>
            <UISpacer height={32} />
            <Div>Best online platform for students with skilled mentors.</Div>
            <UISpacer height={32} />
            <ContactContainer>
                <a>About us</a>
                <a>Feature</a>
                <a>Pricing</a>
                <a>Careers</a>
                <a>Help</a>
                <a>Privacy</a>
            </ContactContainer>
            <UISpacer height={50} />
            <UIDevider />
            <UISpacer height={30} />
            <Links>
                <P>© 2021 Rhizo Inc. All rights reserved.</P>
                <Socials>
                    <TwitterIconAuth />
                    <LinkedinIconAuth />
                    <FacebookIconAuth />
                </Socials>
            </Links>
        </Wrapper>
    );
};

export default AuthFooter;
