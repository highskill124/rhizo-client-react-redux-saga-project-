import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { ThemeColor } from '../../settings/ThemeColor';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';

const SText = styled.div<Partial<IProps>>`
    display: inline-block;
    text-align: left;

    ${(props) => {
        if (props.variant === 'body1') {
            return css`
                font-style: normal;
                font-weight: ${FontWeight.medium};
                font-size: ${props.fontSize ? `${props.fontSize}${props.unit}` : `${FontSize.md}`};
                line-height: ${LineHeight.md};
                letter-spacing: ${LetterSpacing.md};
                color: ${props.color} || ${ThemeColor.grey104};
                padding: ${props.padding ? props.padding.map((x) => `${x}px`).join(' ') : '0px'};
                margin: ${props.margin ? props.margin.map((x) => `${x}px`).join(' ') : '0px'};
            `;
        } else if (props.variant === 'text1') {
            return css`
                font-style: normal;
                font-weight: ${FontWeight.medium};
                font-size: ${props.fontSize ? `${props.fontSize}${props.unit}` : `${FontSize.md}`};
                line-height: ${LineHeight.md};
                letter-spacing: ${LetterSpacing.md};
                color: ${props.color} || ${ThemeColor.grey104};
                padding: ${props.padding ? props.padding.map((x) => `${x}px`).join(' ') : '0px'};
                margin: ${props.margin ? props.margin.map((x) => `${x}px`).join(' ') : '0px'};
            `;
        } else if (props.variant === 'text2') {
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
        } else if (props.variant === 'text3') {
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
        } else if (props.variant === 'text4') {
            return css`
                font-style: normal;
                font-weight: ${FontWeight.medium};
                font-size: ${props.fontSize ? `${props.fontSize}${props.unit}` : `${FontSize.xs}`};
                line-height: ${LineHeight.md};
                letter-spacing: ${LetterSpacing.md};
                color: ${props.color} || ${ThemeColor.grey104};
                padding: ${props.padding ? props.padding.map((x) => `${x}px`).join(' ') : '0px'};
                margin: ${props.margin ? props.margin.map((x) => `${x}px`).join(' ') : '0px'};
            `;
        }
        return null;
    }}
`;

interface IProps {
    id?: string;
    children: ReactNode;
    variant?: 'text1' | 'text2' | 'text3' | 'text4' | 'text5' | 'text6' | 'body1';
    color?: string;
    fontSize?: number;
    unit?: 'rem' | 'px' | 'em';
    padding?: Array<number>;
    margin?: Array<number>;
}

const UIText: FC<IProps> = (props) => {
    const { id, children, variant, color } = props;
    return (
        <SText id={id} variant={variant} color={color}>
            {children}
        </SText>
    );
};

UIText.defaultProps = {
    unit: 'rem',
    variant: 'text1',
    margin: [0],
    padding: [0],
    color: ThemeColor.grey45,
};

export default UIText;
