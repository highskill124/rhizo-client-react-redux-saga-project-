import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { ThemeColor } from '../../settings/ThemeColor';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';

const STitle = styled.h4<Partial<IProps>>`
    display: inline-block;
    text-align: left;

    ${(props) => {
        if (props.variant === 'title2') {
            return css`
                font-style: normal;
                font-weight: ${FontWeight.medium};
                font-size: ${props.fontSize ? `${props.fontSize}${props.unit}` : `${FontSize.xxl}`};
                line-height: ${LineHeight.md};
                letter-spacing: ${LetterSpacing.md};
                color: ${props.color || ThemeColor.grey45};
                padding: ${props.padding ? props.padding.map((x) => `${x}px`).join(' ') : '0px'};
                margin: ${props.margin ? props.margin.map((x) => `${x}px`).join(' ') : '0px'};
            `;
        } else if (props.variant === 'title3') {
            return css`
                font-style: normal;
                font-weight: ${FontWeight.bold};
                font-size: ${props.fontSize ? `${props.fontSize}${props.unit}` : `${FontSize.md}`};
                line-height: ${LineHeight.md};
                letter-spacing: ${LetterSpacing.md};
                color: ${props.color || ThemeColor.grey45};
                padding: ${props.padding ? props.padding.map((x) => `${x}px`).join(' ') : '0px'};
                margin: ${props.margin ? props.margin.map((x) => `${x}px`).join(' ') : '0px'};
            `;
        } else if (props.variant === 'title4') {
            return css`
                font-style: normal;
                font-weight: ${FontWeight.medium};
                font-size: ${props.fontSize ? `${props.fontSize}${props.unit}` : `${FontSize.md}`};
                line-height: ${LineHeight.md};
                letter-spacing: ${LetterSpacing.md};
                color: ${props.color || ThemeColor.grey45};
                padding: ${props.padding ? props.padding.map((x) => `${x}px`).join(' ') : '0px'};
                margin: ${props.margin ? props.margin.map((x) => `${x}px`).join(' ') : '0px'};
            `;
        } else if (props.variant === 'title5') {
            return css`
                font-style: normal;
                font-weight: ${FontWeight.medium};
                font-size: ${props.fontSize ? `${props.fontSize}${props.unit}` : `${FontSize.sm}`};
                line-height: ${LineHeight.md};
                letter-spacing: ${LetterSpacing.md};
                color: ${props.color} || ${ThemeColor.grey104};
                padding: ${props.padding ? props.padding.map((x) => `${x}px`).join(' ') : '0px'};
                margin: ${props.margin ? props.margin.map((x) => `${x}px`).join(' ') : '0px'};
            `;
        }
    }};
`;

interface IProps {
    id?: string;
    children: ReactNode;
    variant?: 'title1' | 'title2' | 'title3' | 'title4' | 'title5' | 'title6';
    color?: string;
    fontSize?: number;
    unit?: 'rem' | 'px' | 'em';
    padding?: Array<number>;
    margin?: Array<number>;
}

const UITitle: FC<IProps> = (props) => {
    const { id, children, variant, color } = props;
    return (
        <STitle id={id} variant={variant} color={color}>
            {children}
        </STitle>
    );
};

UITitle.defaultProps = {
    unit: 'rem',
    variant: 'title4',
    margin: [0],
    padding: [0],
    color: ThemeColor.grey45,
};

export default UITitle;
