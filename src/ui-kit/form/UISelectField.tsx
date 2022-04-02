/* eslint-disable no-unused-vars */
import { useField } from 'formik';
import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import UIFormControl from './UIFormControl';
import { UILabel } from './UILabel';
import UIError from './UIError';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import { ReactComponent as ArrowIcon } from '../../media/image/select-arrow-icon.svg';

const IconWrapper = styled.div<any>`
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    top: 3px;
    right: 4px;
    width: 32px;
    height: 32px;
    padding: 0px;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    pointer-events: none;

    ${(props) => {
        return css`
            /* cursor: pointer; */

            :hover {
                background-color: rgba(94, 198, 157, 0.1);
                > svg {
                }
            }
        `;

        return null;
    }}

    & > svg {
    }
`;

export const SelectWrapper = styled.div`
    position: relative;
    /* flex: 1; */
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: 1px solid ${ThemeColor.grey229};
    /* padding: 1px 16px; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    /* line-height: ${LineHeight.md}; */
    overflow: hidden;

    &:hover {
        ${IconWrapper} {
            background-color: rgba(94, 198, 157, 0.1);
        }
    }
`;

export const Select = styled.select<any>`
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
    outline: 0;
    box-shadow: none;
    border: 0 !important;
    background: ${ThemeColor.white};
    background-image: none;
    flex: 1;
    padding: 0 15px;
    cursor: pointer;
    width: 100%;
    height: 40px;
    font-style: normal;
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.md};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${(props) => ThemeColor.subtitle};

    /* color: ${(props) => (props.touched ? ThemeColor.grey45 : ThemeColor.grey192)}; */

    /* Remove IE arrow */
    &::-ms-expand {
        display: none;
    }
`;

const Text = styled.div`
    font-size: ${FontSize.md};
    color: ${ThemeColor.subtitle};
`;

interface IProps {
    className?: string;
    id?: string;
    name: string;
    label?: string;
    placeholder?: string;
    options?: Array<any>;
    style?: any;
    readOnly?: boolean;
    defaultValue?: string;
    textClass?: string;
    onChange?: (x: any) => void;
}

const UISelectField: FC<IProps> = (props) => {
    const { id, name, label, placeholder, options, style, onChange, readOnly, defaultValue, className, textClass } = props;
    const [field, meta, helpers] = useField({ name });

    const { value } = meta;
    const { setValue } = helpers;

    const handleChange = (e, v) => {
        setValue(e.target.value);
        onChange(e.target.value);
    };

    return (
        <UIFormControl>
            {readOnly ? (
                <Text className={textClass}>{value}</Text>
            ) : (
                <>
                    {label && <UILabel htmlFor={id}>{label}</UILabel>}
                    <SelectWrapper style={style} className={className}>
                        <IconWrapper className="input-icon">
                            <ArrowIcon />
                        </IconWrapper>
                        <Select id={id} name={name} touched={meta.touched} defaultValue={defaultValue} placeholder={placeholder} onChange={handleChange}>
                            <option disabled value="default">
                                {placeholder}
                            </option>
                            {options &&
                                options.map((x, i) => (
                                    <option value={x.value} key={i}>
                                        {x.label}
                                    </option>
                                ))}
                        </Select>
                    </SelectWrapper>
                    {meta.touched && meta.error ? <UIError>{meta.error}</UIError> : null}
                </>
            )}
        </UIFormControl>
    );
};

UISelectField.defaultProps = {
    onChange: (x) => {},
};

export default UISelectField;
