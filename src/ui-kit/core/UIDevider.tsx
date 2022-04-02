import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    height: 1px;
    align-self: stretch;
    border-top: 1px solid ${ThemeColor.grey229};

    ${(props) => {
        return css`
            margin: ${props.margin ? props.margin.map((x) => `${x}px`).join(' ') : '0px'};
        `;
    }}
`;

interface IProps {
    className?: string;
    margin?: Array<number>;
    style?: any;
}

const UIDevider: FC<IProps> = (props) => {
    return <Wrapper {...props} />;
};

UIDevider.defaultProps = {
    margin: [15, 0, 0],
};

export default UIDevider;
