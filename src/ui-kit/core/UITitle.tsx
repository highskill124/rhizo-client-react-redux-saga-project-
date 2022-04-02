import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { FontSize, FontWeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    font-size: ${FontSize.xl};
    color: ${ThemeColor.title};
`;

interface IProps {
    className?: string;
    content: string;
}

const UITitle: FC<IProps> = ({ content }) => <Wrapper>{content}</Wrapper>;

UITitle.defaultProps = {};
export default UITitle;
