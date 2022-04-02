import React, { FC } from 'react';
import styled from 'styled-components';
import { ReactComponent as HintIcon } from '../../media/image/hint-icon.svg';
import { WarnIcon } from '../icon/UIIconAssets';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    box-sizing: border-box;
    min-width: 100px;
    min-height: 20px;
    padding: 4px;
    border-radius: 15px;
    height: fit-content;
`;

const IconWrapper = styled.div`
    display: flex;
    width: 16px;
    height: 16px;
    margin-top: 4px;
`;
const TextWarapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
    font-style: normal;
    font-weight: ${FontWeight.regular};
    font-size: ${FontSize.sm};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.subtitle};
    margin-left: 8px;
`;

interface IProps {
    className?: string;
    text: string;
}

const UIHint: FC<IProps> = ({ text }) => (
    <Wrapper>
        <IconWrapper>
            <WarnIcon />
        </IconWrapper>
        <TextWarapper>{text}</TextWarapper>
    </Wrapper>
);

export default UIHint;
