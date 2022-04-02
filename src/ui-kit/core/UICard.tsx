import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Device } from '../../settings/Device';
import { Margin } from '../../settings/Margin';
import { Padding } from '../../settings/Padding';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    box-sizing: border-box;
    min-width: 240px;
    min-height: 100px;
    padding: 35px 40px 40px;
    background: ${ThemeColor.white};
    box-shadow: 0px 21px 73px rgba(0, 0, 0, 0.16);
    border-radius: 10px;
    height: fit-content;
    position: relative;

    @media (max-width: ${Device.tablet}px) and (min-width: ${Device.mobileMedium + 1}px) {
        padding: ${Padding.xl}px;
        margin: ${Margin.md}px;
        max-width: 500px;
    }

    @media (max-width: ${Device.mobileMedium - 1}px) {
        padding: ${Padding.xl}px;
        margin: ${Margin.sm}px;
    }

    ${(props) => {
        return css`
            box-shadow: ${props.flat ? 'none' : '0px 21px 73px rgba(0, 0, 0, 0.16)'};
            @media (min-width: ${Device.tablet + 1}px) {
                box-shadow: ${props.flat ? 'none' : '0px 21px 73px rgba(0, 0, 0, 0.16)'};
            }
            border: ${props.border ? `1px solid ${ThemeColor.border}` : 'none'};
            &::before {
                content: '';
                position: absolute;
                width: 2px;
                background-color: ${props.leftBordered ? ThemeColor.secondDark : 'none'};
                left: 0;
                height: 70%;
                top: 0;
                bottom: 0;
                margin: auto auto;
            }
        `;
    }}
`;

interface IProps {
    className?: string;
    children?: ReactNode;
    flat?: boolean;
    style?: any;
    border?: boolean;
    leftBordered?: boolean;
}

const UICard: FC<IProps> = ({ children, flat, style, className, border, leftBordered }) => (
    <Wrapper flat={flat} style={style} className={className} border={border} leftBordered={leftBordered}>
        {children}
    </Wrapper>
);

UICard.defaultProps = {
    flat: false,
    border: false,
};
export default UICard;
