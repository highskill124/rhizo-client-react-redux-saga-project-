import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    padding: 24px;
    box-sizing: border-box;
    overflow: auto;

    ${(props) => {
        return css`
            position: ${props.position};
            left: ${props.left === 'auto' ? props.left : `${props.left}px`};
            top: ${props.top === 'auto' ? props.top : `${props.top}px`};
            right: ${props.right === 'auto' ? props.right : `${props.right}px`};
            bottom: ${props.bottom === 'auto' ? props.bottom : `${props.bottom}px`};

            justify-content: ${props.justifyContent};
            align-items: ${props.alignItems};
            background-color: ${props.fill};
            border: ${props.stroke ? `${props.thickness}px solid ${props.stroke}` : 'none'};
            padding: ${props.padding}px;
        `;
    }}
`;

interface IProps {
    className?: string;
    children?: ReactNode;
    position: 'absolute' | 'fixed';
    depth: number | string;
    left?: number | string;
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    direction?: 'row' | 'column';
    justifyContent?: string;
    alignItems?: string;
    fill?: string;
    stroke?: string | boolean;
    thickness?: number;
    padding?: string | number;
}

const UIStack: FC<IProps> = ({ children }) => <Wrapper>{children}</Wrapper>;

UIStack.defaultProps = {
    position: 'absolute',
    depth: 'auto',
    left: 'auto',
    right: 'auto',
    top: 'auto',
    bottom: 'auto',
    direction: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fill: ThemeColor.white,
    stroke: false,
    thickness: 1,
    padding: 0,
};

export default UIStack;
