import styled from 'styled-components';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

export const UILabel = styled.label`
    font-style: normal;
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.md};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.title};
    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 10px 0px;
    user-select: none;
`;
