import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
`;

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    dir?: string;
    index: number;
    hidden: boolean;
}

const UITabPanel: FC<IProps> = (props) => {
    const { id, children, hidden, index } = props;
    return (
        <Wrapper role="tabpanel" hidden={hidden} id={`${id}-tabpanel-${index}`} aria-labelledby={`${id}-tab-${index}`}>
            {!hidden && children}
        </Wrapper>
    );
};

UITabPanel.defaultProps = {};

export default UITabPanel;
