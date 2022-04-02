import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Device } from '../../settings/Device';
import { Layout } from '../../settings/Layout';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100vw;
    @media (max-width: ${Device.tablet}px) and (min-width: ${Device.mobileMedium + 1}px) {
        margin-top: ${Layout.header.height.mobile}px;
    }

    @media (max-width: ${Device.mobileMedium - 1}px) {
        margin-top: ${Layout.header.height.mobile}px;
    }
`;
type Props = {
    id?: string;
    children: ReactNode;
};

const AuthContent: FC<Props> = (props) => {
    const { children } = props;

    return <Wrapper id="content">{children}</Wrapper>;
};

export default AuthContent;
