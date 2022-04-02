import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { FontSize, FontWeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    font-size: ${FontSize.md};
    font-weight: ${FontWeight.medium};
    color: ${ThemeColor.subtitle};
`;

interface IProps {
    className?: string;
    content: string;
}

const UISubtitle: FC<IProps> = ({ content }) => <Wrapper>{content}</Wrapper>;

UISubtitle.defaultProps = {};
export default UISubtitle;
