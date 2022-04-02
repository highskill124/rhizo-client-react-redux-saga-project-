import React, { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { IFlashMessageContext } from '../../store/dto/IFlashMessageContext';
import { RootState } from '../../store/state/RootReducer';
import AuthContent from './AuthContent';
import FlashMessage from './UIFlashMessage';
import AuthHeader from './AuthHeader';
import AuthFooter from './AuthFooter';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: ${ThemeColor.white};
    height: 100vh;
`;

interface IProps {
    className?: string;
    layout?: any;
    name?: string;
    children: ReactNode;
}

const Page: FC<IProps> = (props) => {
    const { children, name, className } = props;
    return (
        <Wrapper className={className}>
            <AuthHeader page={name} />
            <AuthContent>{children}</AuthContent>
            <AuthFooter />
        </Wrapper>
    );
};

export default React.memo(Page);
