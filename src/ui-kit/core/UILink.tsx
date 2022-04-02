import React, { FC } from 'react';
import styled from 'styled-components';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const SLink = styled.a`
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    box-sizing: border-box;
    min-width: 40px;
    min-height: 20px;
    padding: 4px;
    text-decoration: none;
    font-style: normal;
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.sm};
    line-height: ${LineHeight.md};
    text-align: right;
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.primary};
`;

interface IProps {
    className?: string;
    label?: string;
    onClick?: (e) => void;
}

const UILink: FC<IProps> = ({ label, onClick }) => (
    <SLink href="#" onClick={onClick}>
        {label}
    </SLink>
);

export default UILink;
