import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { FontSize, FontWeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    font-size: ${FontSize.md};
    color: ${ThemeColor.content};
`;

interface IProps {
    className?: string;
    children?: ReactNode;
    content: string;
}

const UIModalContent: FC<IProps> = ({ content }) => <Wrapper>{content}</Wrapper>;

UIModalContent.defaultProps = {};
export default UIModalContent;
