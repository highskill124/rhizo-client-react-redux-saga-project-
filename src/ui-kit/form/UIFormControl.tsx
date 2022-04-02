/* eslint-disable no-unused-vars */
import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 16px;
`;

interface IProps {
    className?: string;
    children: ReactNode;
    autoComplete?: any;
    style?: any;
}

const UIFormControl: FC<IProps> = ({ children, autoComplete, style, className }) => {
    return (
        <Wrapper {...autoComplete} style={style} className={className}>
            {' '}
            {children}
        </Wrapper>
    );
};

UIFormControl.defaultProps = {
    autoComplete: {},
};

export default UIFormControl;
