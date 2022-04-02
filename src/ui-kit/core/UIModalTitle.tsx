import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { FontSize, FontWeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    font-size: ${FontSize.modalTitle};
    font-weight: ${FontWeight.medium};
    color: ${ThemeColor.title};
`;

interface IProps {
    className?: string;
    children?: ReactNode;
    content: string;
}

const UIModalTitle: FC<IProps> = ({ content }) => <Wrapper>{content}</Wrapper>;

UIModalTitle.defaultProps = {};
export default UIModalTitle;
