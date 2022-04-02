import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-shrink: 0;
    box-sizing: border-box;
    overflow: hidden;

    ${(props) => {
        return css`
            flex-direction: ${props.direction};
            justify-content: ${props.justifyContent};
            align-items: ${props.alignItems};
            align-self: ${props.alignSelf};
            background-color: ${props.fill};
            border: ${props.stroke !== 'none' ? `${props.thickness}px solid ${props.stroke}` : 'none'};
            padding: ${props.padding ? props.padding.map((x) => `${x}px`).join(' ') : '0px'};
            margin: ${props.margin ? props.margin.map((x) => `${x}px`).join(' ') : '0px'};
            flex-wrap: ${props.block ? 1 : 0};
            flex: ${props.flex ? 1 : 'none'};
            gap: ${props.gap}px;
        `;
    }}
`;

interface IProps {
    className?: string;
    children?: ReactNode;
    direction?: 'row' | 'column';
    justifyContent?: string;
    alignItems?: string;
    alignSelf?: string;
    fill?: string;
    stroke?: string;
    thickness?: number;
    padding?: Array<number>;
    margin?: Array<number>;
    block?: boolean;
    flex?: boolean;
    style?: any;
    gap?: number;
}

const UIBox: FC<IProps> = (props) => (
    <Wrapper {...props} className={props.className}>
        {props.children}
    </Wrapper>
);

UIBox.defaultProps = {
    direction: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    fill: ThemeColor.white,
    stroke: 'none',
    thickness: 1,
    padding: [0],
    margin: [0],
    block: false,
    flex: false,
    gap: 0,
};

export default UIBox;
