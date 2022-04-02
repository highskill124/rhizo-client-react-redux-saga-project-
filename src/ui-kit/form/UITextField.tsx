/* eslint-disable no-unused-vars */
import { useField } from 'formik';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { makeStyles } from '@material-ui/core';
import UIFormControl from './UIFormControl';
import { UILabel } from './UILabel';
import UIError from './UIError';
import { Tween } from '../../settings/Tween';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import { MastercardIcon, VisaIcon } from '../icon/UIIconAssets';

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

    > input {
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

const SInput = styled.input`
    flex: 1;
    height: 40px;
    width: 100%;
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
    margin-top: 10px;
    font-style: normal;
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.md};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.content};
    user-select: none;
`;

const Required = styled.span`
    color: red;
`;

const Tag = styled.a`
    color: ${ThemeColor.secondDark};
    decoration: none;
    font-size: ${FontSize.sm};
    &: hover {
        cursor: pointer;
    }
`;

const SubLabel = styled.p`
    color: #839099;
    font-size: ${FontSize.sm};
    margin-top: 0;
`;

const useStyles = makeStyles((Theme) => ({
    label: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
}));

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
    required?: boolean;
    tag?: string;
    location?: string;
    subLable?: string;
}

const UITextField: FC<IProps> = (props) => {
    const classes = useStyles();
    const { id, name, label, icon, email, placeholder, onChange, className, autoComplete, style, readOnly, required, tag, location, subLable } = props;
    const [field, meta, helpers] = useField({ name });
    const history = useHistory();

    const { value } = meta;
    const { setValue } = helpers;

    const handleChange = (e) => {
        setValue(e.target.value);
        onChange(e);
    };

    const goTo = () => {
        history.push(`${location}`);
    };

    return (
        <UIFormControl style={style}>
            {label && (
                <>
                    <UILabel htmlFor={id} className={classes.label}>
                        <div>
                            {label}
                            {required && <Required>&nbsp;*</Required>}
                        </div>
                        {tag && <Tag onClick={goTo}>{tag}</Tag>}
                    </UILabel>
                    {subLable && <SubLabel>{subLable}</SubLabel>}
                </>
            )}
            {readOnly ? (
                <Text>{value}</Text>
            ) : (
                <InputWrapper>
                    {icon && (
                        <IconWrapper className="input-icon">
                            <MastercardIcon />
                        </IconWrapper>
                    )}
                    <SInput className={className} placeholder={placeholder} type={email ? 'email' : 'text'} id={id} name={name} value={value || ''} onChange={handleChange} {...autoComplete} style={{ paddingLeft: icon ? '35px' : null }} />
                </InputWrapper>
            )}
            {meta.touched && meta.error ? <UIError>{meta.error}</UIError> : null}
        </UIFormControl>
    );
};

UITextField.defaultProps = {
    autoComplete: true,
    readOnly: false,
    onChange: () => {},
};

export default UITextField;
