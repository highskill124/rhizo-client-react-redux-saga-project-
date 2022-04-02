import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import ShowMoreText from 'react-show-more-text';

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
    onClick?: (e) => void;
    children?: ReactNode;
    max?: number;
}

const UITruncateText: FC<IProps> = (props) => {
    const { id, children, onClick, max } = props;
    return (
        <Wrapper id={id}>
            <ShowMoreText
                // ---
                lines={max}
                more="More"
                less="Less"
                className="content"
                anchorClass="anchor"
                onClick={onClick}
                expanded={false}
                // width={'60%'}
                truncatedEndingComponent={'... '}
            >
                {children}
            </ShowMoreText>
        </Wrapper>
    );
};

UITruncateText.defaultProps = {
    onClick: (e) => {},
    max: 1,
};

export default UITruncateText;
