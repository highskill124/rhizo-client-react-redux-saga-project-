/* eslint-disable no-unused-vars */
import { useField } from 'formik';
import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { Redirect, useHistory, useLocation } from 'react-router-dom';

import { ReactComponent as InputPasswordHideIcon } from '../../media/image/input-password-hide-icon.svg';
import UIFormControl from './UIFormControl';
import { UILabel } from './UILabel';
import UIError from './UIError';
import { Tween } from '../../settings/Tween';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

export const InputWrapper = styled.div`
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
            /* box-shadow: rgba(94, 198, 157, 0.25) 0 0 0 2px;
            border-color: rgba(94, 198, 157, 1); */
            border-color: ${ThemeColor.primary};
        }
    }
`;

const IconWrapper = styled.div<any>`
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    top: 4px;
    right: 4px;
    width: 32px;
    height: 32px;
    padding: 0px;
    border-radius: 16px;
    overflow: hidden;

    ${(props) => {
        if (props.onClick) {
            return css`
                cursor: pointer;

                :hover {
                    background-color: rgba(94, 198, 157, 0.1);

                    > svg {
                        fill: rgba(94, 198, 157, 1);
                        /* stroke: rgba(94, 198, 157, 1); */
                    }
                }
            `;
        }

        return null;
    }}

    & > svg {
        display: flex;
        /* width: 24px; */
        /* height: 24px; */
        fill: ${ThemeColor.grey165};
        /* stroke: ${ThemeColor.grey165}; */
        user-select: false;
        pointer-events: none;
    }
`;

export const SInput = styled.input`
    border: none;
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

    ${(props) => {
        if (props.type === 'password') {
            return css`
                color: ${ThemeColor.grey45};
            `;
        }

        return null;
    }}

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

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    a{
        color: ${ThemeColor.secondDark};
        text-decoration: none;
    }
`;

interface IProps {
    className?: string;
    id?: string;
    name: string;
    placeholder?: string;
    label?: string;
    onChange?: (e) => void;
    value?: string;
    forgot?: boolean;
}

const UIPasswordField: FC<IProps> = ({ id, label, placeholder, name, value, onChange, forgot }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [field, meta, helpers] = useField({ name });
    const history = useHistory();
    return (
        <UIFormControl>
            <Div>
                {label && <UILabel htmlFor={id}>{label}</UILabel>}
                {forgot && (
                    <a
                        href="./"
                        title="password"
                        onClick={(e) => {
                            e.preventDefault();
                            history.push('/auth/forgot-password');
                        }}
                    >
                        Forgot your password?
                    </a>
                )}
            </Div>
            <InputWrapper>
                <IconWrapper className="input-icon" onClick={() => setShowPassword(!showPassword)}>
                    <InputPasswordHideIcon />
                </IconWrapper>
                <SInput placeholder={placeholder} type={showPassword ? 'text' : 'password'} id={id} name={name} value={value} onChange={onChange} />
            </InputWrapper>
            {meta.touched && meta.error ? <UIError>{meta.error}</UIError> : null}
        </UIFormControl>
    );
};

UIPasswordField.defaultProps = {};

export default UIPasswordField;
