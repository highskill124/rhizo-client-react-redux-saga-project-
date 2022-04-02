import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Device } from '../settings/Device';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 124px;
    justify-content: center;
    width: 70%;
    margin-left: 30%;

    @media (max-width: ${Device.tablet}px) and (min-width: ${Device.mobile + 1}px) {
        padding-top: 43px;
        padding-bottom: 64px;
        justify-content: center;
        width: 100%;
        margin-left: 0px;
        margin-top: 0px;
    }

    @media (max-width: ${Device.mobile}px) {
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
    children: ReactNode;
}

const AuthContentWrapper: FC<IProps> = ({ children }) => <Wrapper>{children}</Wrapper>;

export default AuthContentWrapper;
