import React from 'react';
import styled from 'styled-components';
import { FontSize, FontWeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const Title = styled.div`
    display: flex;
    font-size: ${FontSize.xxxl};
    font-weight: ${FontWeight.regular};
    color: ${ThemeColor.grey104};
    text-transform: none;
    margin-bottom: 4px;
    height: auto;
    min-height: 4px;
    max-height: 26px;
    overflow: hidden;
    justify-content: center;
`;

const FourNotFourPage = (props) => {
    return (
        <Wrapper>
            <Title>404</Title>
        </Wrapper>
    );
};

export default FourNotFourPage;
