/* eslint-disable no-unused-vars */
import { useField } from 'formik';
import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Paper, Grid } from '@material-ui/core';
import isWeekend from 'date-fns/isWeekend';
import DateFnsUtils from '@date-io/date-fns';

import { ReactComponent as CalendarIcon } from '../../media/image/calendar-icon.svg';
import UIFormControl from './UIFormControl';
import { UILabel } from './UILabel';
import { Tween } from '../../settings/Tween';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import UIError from './UIError';

const InputWrapper = styled.div`
    position: relative;
    border: none;
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin-right: 16px;
    /* margin-top: 16px; */
    margin-bottom: 0px;
    border-radius: 16px;

    background: ${ThemeColor.white};
    /* border: 1px solid ${ThemeColor.grey229}; */
    box-sizing: border-box;
    border-radius: 10px;

    > input {
        &:focus {
            border-color: ${ThemeColor.primary};
        }
    }
`;

const SInput = styled.input`
    flex: 1;
    height: 40px;
    border-radius: 10px;
    border: 1px solid ${ThemeColor.grey229};
    padding: 8px 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    transition: border-color ${Tween.duration}s ${Tween.ease}, box-shadow ${Tween.duration}s ${Tween.ease};
    font-family: Roboto;
    font-style: normal;
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.md};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.grey104};

    &::placeholder {
        font-style: normal;
        font-weight: normal;
        font-size: ${FontSize.lg};
        line-height: ${LineHeight.md};
        display: flex;
        align-items: center;
        color: ${ThemeColor.grey165};
        opacity: 1;
    }

    :focus {
        outline: none;
    }
`;

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
    border-radius: 16px;
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
        width: 24px;
        height: 24px;
        user-select: false;
        /* pointer-events: none; */
    }
`;

const Text = styled.span`
    font-style: normal;
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.md};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.content};
    user-select: none;
`;

interface IProps {
    className?: string;
    id: string;
    name: string;
    label?: string;
    style?: any;
    readOnly?: boolean;
    showIcon?: boolean;
}

const UIDatePicker: FC<IProps> = ({ id, name, label, style, showIcon, readOnly }) => {
    const [field, meta, helpers] = useField({ name });
    const { value } = meta;
    const { setValue } = helpers;

    const [selectedDate, handleDateChange] = useState(value || new Date());

    const renderInput = (props) => (
        <InputWrapper>
            <IconWrapper className="input-icon">{showIcon && <CalendarIcon />}</IconWrapper>
            <SInput placeholder={'MM/DD/YYYY'} type="text" id={`datePicker-${props.id}`} name={`datePicker-${props.name}`} onClick={props.onClick} value={props.value} onChange={(e) => props.onChange()} />
        </InputWrapper>
    );
    return (
        <UIFormControl style={style}>
            {label && <UILabel htmlFor={id}>{label}</UILabel>}
            {readOnly ? (
                <Text>
                    {selectedDate.getMonth()}/{selectedDate.getDate()}/{selectedDate.getFullYear()}
                </Text>
            ) : (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        label="Light blue picker"
                        value={selectedDate}
                        format="MM/dd/yyyy"
                        onChange={(date) => {
                            handleDateChange(date);
                            setValue(date);
                        }}
                        TextFieldComponent={renderInput}
                        // shouldDisableDate={isWeekend}
                    />
                </MuiPickersUtilsProvider>
            )}
            {meta.touched && meta.error ? <UIError>{meta.error}</UIError> : null}
        </UIFormControl>
    );
};

UIDatePicker.defaultProps = {
    showIcon: true,
};

export default UIDatePicker;
