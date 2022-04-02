/* eslint-disable no-unused-vars */
import { useField } from 'formik';
import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import UIFormControl from './UIFormControl';
import { UILabel } from './UILabel';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

export const FieldWrapper = styled.div<any>`
    position: relative;
    border: none;
    display: flex;
    width: 100%;
    min-height: 40px;
    flex-direction: row;
    justify-content: ${(props) => (props.hasIcon ? 'space-between' : 'flex-start')};
    align-items: center;
    margin-right: 16px;
    background: ${ThemeColor.basic};
    box-sizing: border-box;
    border-radius: 10px;
    padding: 8px 15px;
    margin-bottom: ${(props) => (props.count > 1 ? 10 : 0)}px;

    svg {
        flex-shrink: 0;
    }
`;

export const Text = styled.span`
    font-style: normal;
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.md};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.grey104};
    user-select: none;
`;

interface IProps {
    className?: string;
    id?: string;
    name: string;
    label?: string;
    value: Array<string>;
    icon?: ReactNode;
    variant?: number;
    style?: any;
}

const UIStaticField: FC<IProps> = (props) => {
    const { id, name, label, value, icon, style } = props;
    // const [field, meta, helpers] = useField(name);
    // const [field, meta, helpers] = useField({ name });
    return (
        <UIFormControl style={style}>
            {label && <UILabel htmlFor={id}>{label}</UILabel>}
            {value &&
                value.map((x, i) => (
                    <FieldWrapper key={`ui-static-fw-${i}`} count={value.length} hasIcon={icon}>
                        <Text>{x}</Text>
                        {icon && icon}
                    </FieldWrapper>
                ))}
        </UIFormControl>
    );
};

UIStaticField.defaultProps = {
    variant: 1,
};

export default UIStaticField;
