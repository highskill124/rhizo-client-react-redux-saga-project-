/* eslint-disable no-unused-vars */
import { useField } from 'formik';
import React, { useState, FC, forwardRef, useImperativeHandle } from 'react';
import styled, { css } from 'styled-components';
import { UILabel } from './UILabel';
import UIError from './UIError';
import { ReactComponent as ArrowIcon } from '../../media/image/select-arrow-icon.svg';
import UIFormControl from './UIFormControl';
import UIRadioField from '../../ui-kit/form/UIRadioField';
import { makeStyles } from '@material-ui/core';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import UIButton from '../button/UIButton';

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
    border-radius: 6px;
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
    border-radius: 6px;
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
    color: ${(props) => ThemeColor.grey45};

    /* color: ${(props) => (props.touched ? ThemeColor.grey45 : ThemeColor.grey192)}; */

    /* Remove IE arrow */
    &::-ms-expand {
        display: none;
    }
`;

const Text = styled.div`
    font-size: ${FontSize.lg};
    color: ${ThemeColor.subtitle};
    padding-left: 40px;
    padding-top: 10px;
`;

const useStyles = makeStyles((theme) => ({
    radioContainer: {
        marginBottom: 0,
        paddingLeft: 40,
        '&>div': {
            '&>div:nth-child(1)': {
                flexDirection: 'row',
                display: 'flex',
            },
        },
    },
}));
interface IProps {
    className?: string;
    id?: string;
    name: string;
    label?: string;
    placeholder?: string;
    options?: Array<any>;
    style?: any;
    defaultValue?: string;
    readOnly?: boolean;
    radioOptions?: Array<any>;
    wholeOptions: Array<any>;
    copy?: boolean;
}

const UIRadioSelectField: FC<IProps> = (props, ref) => {
    const { id, name, label, placeholder, options, radioOptions, wholeOptions, style, readOnly, className, copy } = props;
    const classes = useStyles();
    const [field, meta, helpers] = useField({ name });
    const [value, setValue] = useState(
        wholeOptions.filter((x) => {
            return x['selected'] === true;
        })[0]['value'],
    );
    const [valueName, setValueName] = useState(wholeOptions.map((x, i) => (x['selected'] ? x['label'] : null)));
    const [selectedOptions, setSelectedOptions] = useState([]);

    const onChangeRadio = (e) => {
        let temp = [];
        options.map((item, index) => {
            if (item.name === e) {
                temp = item.value;
            }
        });
        setSelectedOptions(temp);
    };

    const onChange = (e) => {
        setValue(e.target.value);
        selectedOptions.map((x, i) => {
            if (x['value'] === e.target.value) {
                setValueName(x['label']);
            }
        });
    };

    if (copy) {
        navigator.clipboard.writeText(value.toString());
    }

    return (
        <UIFormControl>
            {readOnly ? (
                <Text>{valueName}</Text>
            ) : (
                <>
                    <UIRadioField name="type" options={radioOptions} className={classes.radioContainer} onChangeRadio={onChangeRadio} />
                    {label && <UILabel htmlFor={id}>{label}</UILabel>}
                    <SelectWrapper style={style} className={className}>
                        <IconWrapper className="input-icon">
                            <ArrowIcon />
                        </IconWrapper>
                        <Select id={id} name={name} touched={meta.touched} value={value} onChange={onChange}>
                            <option disabled>{placeholder}</option>
                            {selectedOptions && selectedOptions.map((x, i) => <option value={x.value}>{x.label}</option>)}
                        </Select>
                    </SelectWrapper>
                    {meta.touched && meta.error ? <UIError>{meta.error}</UIError> : null}
                </>
            )}
        </UIFormControl>
    );
};

UIRadioSelectField.defaultProps = {};

export default UIRadioSelectField;
