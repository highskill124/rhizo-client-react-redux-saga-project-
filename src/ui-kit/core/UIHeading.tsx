import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { FontSize, FontWeight } from '../../settings/Font';
import UIBox from '../layout/UIBox';
import UISpacer from './UISpacer';
import UIDevider from './UIDevider';
import { ThemeColor } from '../../settings/ThemeColor';
import { Device } from '../../settings/Device';

const Wrapper = styled.div<Partial<IProps>>`
    width: 100%;
`;

const Header = styled.p`
    font-size: ${FontSize.xl};
    font-weight: ${FontWeight.medium};
    color: ${ThemeColor.title};
    margin: 0;
`;
const SubHeader = styled.p`
    font-size: ${FontSize.md};
    color: ${ThemeColor.subtitle};
    margin: 10px 0;
    width: 80%;
    @media (max-width: ${Device.tablet - 1}px) {
        width: 100%;
    }
`;

const FullSubHeader = styled.p`
    font-size: ${FontSize.md};
    color: ${ThemeColor.subtitle};
    margin: 10px 0;
    width: 100%;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    flex-direction: column;
    width: 80%;
    @media (max-width: ${Device.mobileMedium - 1}px) {
        width: 50%;
    }
`;

interface IProps {
    className?: string;
    header: any;
    subheader?: string;
    children?: ReactNode;
    style?: any;
    download?: boolean;
    devider?: boolean;
    fullWidthSubheader?: string;
}

const UIHeading: FC<IProps> = ({ header, subheader, children, style, download, devider, fullWidthSubheader }) => (
    <Wrapper style={style}>
        <UIBox justifyContent="space-between" style={{ alignItems: 'center' }}>
            {download ? (
                <HeaderContainer>
                    <Header>{header}</Header>
                    {subheader && <SubHeader>{subheader}</SubHeader>}
                </HeaderContainer>
            ) : (
                <UIBox direction="column" style={{ width: fullWidthSubheader ? '100%' : '72%' }}>
                    <Header>{header}</Header>
                    {(subheader || fullWidthSubheader) && <SubHeader style={{ width: fullWidthSubheader ? '100%' : '80%' }}>{fullWidthSubheader || subheader}</SubHeader>}
                </UIBox>
            )}
            {children}
        </UIBox>
        {devider && <UIDevider />}
    </Wrapper>
);

UIHeading.defaultProps = {
    devider: true,
};
export default UIHeading;
