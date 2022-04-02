import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { FontSize, FontWeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    font-size: ${FontSize.sm};
    color: ${ThemeColor.content};
`;

interface IProps {
    className?: string;
    content: string;
    style?: any;
}

const UIContent: FC<IProps> = ({ content, style }) => <Wrapper style={style}>{content}</Wrapper>;

UIContent.defaultProps = {};
export default UIContent;
