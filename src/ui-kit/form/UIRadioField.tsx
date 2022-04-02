/* eslint-disable no-unused-vars */
import { useField } from 'formik';
import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import UIFormControl from './UIFormControl';
import { UILabel } from './UILabel';
import UIError from './UIError';

import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const RadioWrapper = styled.div`
    > div {
        label {
            font-size: ${FontSize.md};
            line-height: 1;
            span {
                margin: 0;
                font-size: ${FontSize.md};
            }
            > span:nth-child(2) {
                padding: 9px;
                color: ${ThemeColor.subtitle};
            }
        }
    }
`;

export const Label = styled.p`
    font-size: ${FontSize.md};
    color: ${ThemeColor.title};
    font-weight: ${FontWeight.regular};
    margin: 10px 0;
`;

const Text = styled.p`
    font-size: ${FontSize.md};
    color: ${ThemeColor.value};
`;

interface IProps {
    className?: string;
    id?: string;
    name: string;
    label?: string;
    options: Array<any>;
    style?: any;
    readOnly?: any;
    onChangeRadio?: (x) => void;
}

const UIRadioField: FC<IProps> = (props) => {
    const { id, name, label, options, style, readOnly, className, onChangeRadio } = props;
    const [field, meta, helpers] = useField({ name });
    const [value, setValue] = useState('');
    const onChange = (e) => {
        setValue(e.target.value);
        onChangeRadio(e.target.value);
    };
    return (
        <UIFormControl className={className}>
            {readOnly ? (
                <Text>{value}</Text>
            ) : (
                <>
                    {label && <Label>{label}</Label>}
                    <RadioWrapper style={style}>
                        <RadioGroup aria-label={label} name={name} value={value} onChange={onChange}>
                            {options && options.map((x, i) => <FormControlLabel value={x.value} control={<Radio />} label={x.label} />)}
                        </RadioGroup>
                    </RadioWrapper>
                    {meta.touched && meta.error ? <UIError>{meta.error}</UIError> : null}
                </>
            )}
        </UIFormControl>
    );
};

UIRadioField.defaultProps = {};

export default UIRadioField;
