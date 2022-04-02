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
}

const TutorExploreItem: FC<IProps> = (props) => {
    const { id } = props;
    return <Wrapper id={id}></Wrapper>;
};

TutorExploreItem.defaultProps = {};

export default TutorExploreItem;
