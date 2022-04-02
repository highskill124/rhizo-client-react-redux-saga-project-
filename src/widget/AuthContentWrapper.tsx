import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Device } from '../settings/Device';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 0px;
    justify-content: center;
    width: 70%;
    // margin-left: 30%;

    @media (max-width: ${Device.tablet}px) and (min-width: ${Device.mobileMedium + 1}px) {
        padding-top: 42px;
        padding-bottom: 64px;
        justify-content: center;
        width: 100%;
        margin-left: 0px;
        margin-top: 0px;
    }

    @media (max-width: ${Device.mobileMedium - 1}px) {
        padding-top: 42px;
        padding-bottom: 64px;
        padding-left: 10px;
        padding-right: 10px;
        justify-content: center;
        width: 100%;
        margin-left: 0px;
        margin-top: 0px;
    }
`;

interface IProps {
    className?: string;
    children: ReactNode;
    style?: any;
}

const AuthContentWrapper: FC<IProps> = ({ children, style }) => <Wrapper style={style}>{children}</Wrapper>;

export default AuthContentWrapper;
