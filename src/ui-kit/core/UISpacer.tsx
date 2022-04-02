import React, { FC } from 'react';
import styled from 'styled-components';

const Spacer = styled.span<Partial<IProps>>`
    display: flex;
    flex-grow: ${(props) => (props.expand ? 1 : 0)};
    flex-shrink: 0;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
`;

interface IProps {
    className?: string;
    width?: number;
    height?: number;
    expand?: boolean;
}

const UISpacer: FC<IProps> = (props) => {
    return <Spacer {...props} />;
};

UISpacer.defaultProps = {
    width: 0,
    height: 0,
    expand: false,
};
export default UISpacer;
