import { useField } from 'formik';
import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import Color from 'color';
import UIFormControl from './UIFormControl';
import { UILabel } from './UILabel';
import { Device } from '../../settings/Device';
import { Tween } from '../../settings/Tween';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import { Profile } from '../../settings';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
    width: 100%;

    @media (max-width: ${Device.mobileMedium - 1}px) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    @media (max-width: 470px) {
        flex-wrap: wrap;
    }
`;

const CircleWrapper = styled.span`
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    top: 12px;
    right: 12px;
`;
const InnerCircle = styled.div<any>`
    position: relative;

    display: flex;
    width: 16px;
    height: 16px;
    border: 1px solid ${ThemeColor.border};
    background-color: ${ThemeColor.white};
    border-radius: 50%;
    transition: background-color ${Tween.duration}s ${Tween.ease};
`;

const SButton = styled.button<any>`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background: ${(props) => props.fill};
    border: none;
    border-radius: 10px;
    min-width: 130px;
    height: 40px;
    border: 1px solid ${ThemeColor.border};
    transition: background-color ${Tween.duration}s ${Tween.ease};
    padding: 4px 15px;
    overflow: hidden;
    width: 100%;

    @media (max-width: ${Device.mobileMedium - 1}px) {
        width: 100%;
    }

    &.selected {
        & ${InnerCircle} {
            background-color: ${ThemeColor.secondDark};
        }
    }

    :hover {
        cursor: pointer;
        border: 1px solid ${ThemeColor.secondDark};
        transition: ${Tween.duration}s ${Tween.ease};
    }
`;

const Label = styled.span`
    font-style: normal;
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.md};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.subtitle};
    margin: 0px 0px;
`;

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    const na = [...a].sort();
    const nb = [...b].sort();
    for (let i = 0; i < na.length; ++i) {
        if (na[i] !== nb[i]) return false;
    }
    return true;
}

interface IProps {
    className?: string;
    name: string;
    label: string;
    onChange?: (x: any) => void;
}

const UIProfileSelect: FC<IProps> = ({ name, label, onChange }) => {
    // const [field, meta, helpers] = useField({ name });
    const [, meta, helpers] = useField({ name });

    const { value } = meta;
    const { setValue } = helpers;

    const isSelected = (v) => {
        if (value === v) {
            return 'selected';
        }
    };

    return (
        <UIFormControl>
            {label && <UILabel>{label}</UILabel>}
            <Wrapper>
                <SButton type="button" fill={ThemeColor.white} onClick={() => setValue(Profile.STUDENT)} className={isSelected(Profile.STUDENT)}>
                    <Label>Student</Label>
                    <CircleWrapper>
                        <InnerCircle />
                    </CircleWrapper>
                </SButton>
                <SButton type="button" fill={ThemeColor.white} onClick={() => setValue(Profile.MENTOR)} className={isSelected(Profile.MENTOR)}>
                    <Label>Mentor</Label>
                    <CircleWrapper>
                        <InnerCircle />
                    </CircleWrapper>
                </SButton>
                <SButton type="button" fill={ThemeColor.white} onClick={() => setValue(Profile.BOTH)} className={isSelected(Profile.BOTH)}>
                    <Label>Both</Label>
                    <CircleWrapper>
                        <InnerCircle />
                    </CircleWrapper>
                </SButton>
            </Wrapper>
        </UIFormControl>
    );
};

export default React.memo(UIProfileSelect);
