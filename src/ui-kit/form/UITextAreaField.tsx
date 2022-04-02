/* eslint-disable no-unused-vars */
import { useField } from 'formik';
import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import UIFormControl from './UIFormControl';
import { UILabel } from './UILabel';
import UIError from './UIError';
import { Tween } from '../../settings/Tween';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import { MastercardIcon, VisaIcon } from '../icon/UIIconAssets';
import { Device } from '../../settings/Device';

const InputWrapper = styled.div`
    position: relative;
    border: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin-right: 16px;
    margin-bottom: 0px;
    border-radius: 16px;
    background: ${ThemeColor.white};
    box-sizing: border-box;
    border-radius: 10px;
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    margin: 0px 0px 0px 0px;

    > textarea {
        &:focus {
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
    left: 4px;
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

const STextarea = styled.textarea`
    flex: 1;
    height: 150px;
    border-radius: 10px;
    border: 1px solid ${ThemeColor.border};
    padding: 8px 16px;
    resize: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    transition: border-color ${Tween.duration}s ${Tween.ease}, box-shadow ${Tween.duration}s ${Tween.ease};
    font-family: Roboto;
    font-style: normal;
    font-weight: ${FontWeight.regular};
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

export const StaticWrapper = styled.div<any>`
    position: relative;
    border: none;
    display: flex;
    width: 100%;
    height: 40px;
    flex-direction: row;
    justify-content: ${(props) => (props.hasIcon ? 'space-between' : 'flex-start')};
    align-items: center;
    margin-right: 16px;
    border-radius: 16px;
    background: ${ThemeColor.basic};
    box-sizing: border-box;
    border-radius: 10px;
    padding: 4px 15px;
    margin-bottom: 0px;

    svg {
        * {
            fill: ${ThemeColor.grey104};
        }
    }
`;

export const Text = styled.span`
    font-style: normal;
    font-weight: ${FontWeight.regular};
    font-size: ${FontSize.md};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.subtitle};
    user-select: none;
`;

interface IProps {
    className?: string;
    icon?: FC;
    id?: string;
    name: string;
    placeholder?: string;
    email?: boolean;
    label?: string;
    onChange?: (e) => void;
    value?: string;
    autoComplete?: any;
    style?: any;
    readOnly?: boolean;
    style1?: any;
}

const UITextAreaField: FC<IProps> = (props) => {
    const { id, name, label, icon, email, placeholder, onChange, value, autoComplete, style, readOnly, style1 } = props;
    // const [field, meta, helpers] = useField(name);
    // eslint-disable-next-line no-unused-vars
    const [field, meta, helpers] = useField({ name });
    return (
        <UIFormControl style={style}>
            {label && <UILabel htmlFor={id}>{label}</UILabel>}
            {readOnly ? (
                <Text style={style1}>{value}</Text>
            ) : (
                <InputWrapper>
                    <STextarea placeholder={placeholder} type={email ? 'email' : 'text'} id={id} name={name} value={value} onChange={onChange} {...autoComplete} />
                </InputWrapper>
            )}
            {meta.touched && meta.error ? <UIError>{meta.error}</UIError> : null}
        </UIFormControl>
    );
};

UITextAreaField.defaultProps = {
    autoComplete: true,
    readOnly: false,
};

export default UITextAreaField;
