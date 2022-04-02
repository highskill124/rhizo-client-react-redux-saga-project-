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
    >div:nth-child(1){
        >div:nth-child(2){
            width: 140px;
            padding-right: 30px;
            margin-bottom: 0;
            @media (max-width: 430px){
                padding-right: 0;
            }
        }
    }
`;

const Header = styled.p`
    font-size: ${FontSize.xxl};
    font-weight: ${FontWeight.medium};
    color: ${ThemeColor.title};
    margin: 0;
`;
const SubHeader = styled.p`
    font-size: ${FontSize.md};
    color: ${ThemeColor.subtitle};
    margin: 10px 0;
    width: 80%;
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
    header: string;
    subheader?: string;
    children?: ReactNode;
    style?: any;
    download?: boolean;
    devideNone?: boolean;
}

const UITitle: FC<IProps> = ({ header, subheader, children, style, download, devideNone }) => (
    <Wrapper style={style}>
        <UIBox justifyContent="space-between" style={{ alignItems: 'center' }}>
            {download ? (
                <HeaderContainer>
                    <Header>{header}</Header>
                    {subheader && <SubHeader>{subheader}</SubHeader>}
                </HeaderContainer>
            ) : (
                <UIBox direction="column" style={{ width: '70%' }}>
                    <Header>{header}</Header>
                    {subheader && <SubHeader>{subheader}</SubHeader>}
                </UIBox>
            )}
            {children}
        </UIBox>
        <UISpacer height={5}></UISpacer>
        {devideNone ? null : (<UIDevider style={{borderTop: "1px solid #E2EEF8"}} />)}
    </Wrapper>
);

UITitle.defaultProps = {};
export default UITitle;
