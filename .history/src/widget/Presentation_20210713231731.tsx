import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Depth } from '../settings/Depth';
import { Device } from '../settings/Device';

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 40%;
    /* max-width: 565px; */
    background: #5ec69d;
    padding-top: 192px;
    position: fixed;
    left: 0px;
    top: 0px;
    height: 100vh;
    overflow: hidden;
    z-index: ${Depth.appBar - 1};

    @media (max-width: ${Device.tablet}px) {
        display: none;
    }
`;

const Title = styled.h2`
    font-style: normal;
    font-weight: bold;
    font-size: 35px;
    line-height: 50px;
    letter-spacing: 0.01em;
    color: #ffffff;
    margin: 0px 0px 34px 0px;
    width: 80%;
`;

const ImageWrapper = styled.div`
    display: flex;
    width: 100%;
    max-width: 420px;

    padding: 0px 5% 0px 5%;
    margin-top: 0px;
    margin-bottom: 24px;
`;

interface IProps {
    title: string;
    image: ReactNode;
}

const Presentation: FC<IProps> = (props) => {
    const { title, image } = props;
    return (
        <InfoWrapper>
            <Title>{title}</Title>
            <ImageWrapper>{image}</ImageWrapper>
        </InfoWrapper>
    );
};

export default Presentation;
