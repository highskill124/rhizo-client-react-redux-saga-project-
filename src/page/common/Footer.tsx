import React from 'react';
import styled from 'styled-components';
import { FontSize } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import UIBox from '../../ui-kit/layout/UIBox';
import UISpacer from '../../ui-kit/core/UISpacer';
import { Device } from '../../settings/Device';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: 50px;
    padding: 17px 20px;
    flex-wrap: wrap-reverse;
    row-gap: 20px;
    @media (max-width: ${Device.tablet - 1}px) {
        justify-content: center;
    }
`;

const Contact = styled.div`
    font-size: ${FontSize.md};
    color: ${ThemeColor.subtitle};
`;

const Copyright = styled.div`
    font-size: ${FontSize.md};
    color: ${ThemeColor.subtitle};
    width: 200px;
`;

const Footer = () => {
    return (
        <Wrapper>
            <Copyright>© Copright 2017 - 2021 Rhizo</Copyright>
            <UIBox style={{ flexWrap: 'wrap' }}>
                <Contact>About us</Contact>
                <UISpacer width={40}></UISpacer>
                <Contact>Privacy and Policy</Contact>
                <UISpacer width={40}></UISpacer>
                <Contact>Help</Contact>
            </UIBox>
        </Wrapper>
    );
};

export default Footer;
