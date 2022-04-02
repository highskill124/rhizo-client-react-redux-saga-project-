/* eslint-disable no-unused-vars */
import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

export const SError = styled.div`
    font-style: normal;
    font-weight: ${FontWeight.regular};
    font-size: ${FontSize.sm};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.danger};
    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 4px 4px;
    user-select: none;
`;

interface IProps {
    className?: string;
    children?: ReactNode;
}
const UIError: FC<IProps> = ({ children }) => <SError>{children}</SError>;

export default UIError;
