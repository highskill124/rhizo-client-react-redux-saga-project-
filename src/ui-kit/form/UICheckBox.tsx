import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as InputCheckBoxIcon } from '../../media/image/input-checkbox-icon.svg';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 0px;

    & > div {
        flex-basis: auto;
        max-width: 250px;
    }

    & .option-label {
        font-size: ${FontSize.sm};
    }

    & > label {
        display: flex;
        align-items: flex-start;
        cursor: pointer;
        margin: 0 0px;
        padding: 0px 0px;
        user-select: none;
        font-style: normal;
        font-weight: ${FontWeight.medium};
        font-size: ${FontSize.sm};
        letter-spacing: ${LetterSpacing.md};

        color: ${ThemeColor.grey165};

        .square-md {
            width: 14px;
            height: 14px;
            background: ${ThemeColor.white};
            border-radius: 4px;
            border: 1px solid ${ThemeColor.primary};
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin: 0px 8px 0 0;

            .icon-check {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                width: 14px;
                height: 14px;

                > svg {
                }
            }
        }
    }

    input[type='checkbox'] {
        display: none;
    }

    input[type='checkbox']:checked + label {
        .square-md {
            width: 14px;
            height: 14px;
            background: ${ThemeColor.primary};
            border-radius: 4px;
        }
    }
`;

interface IProps {
    className?: string;
    id: string;
    name: string;
    label: string;
    checked?: boolean;
    onChange?: (e) => void;
}

const UICheckBox: FC<IProps> = ({ label, onChange, checked, id, name }) => {
    const [selected, setChecked] = useState(checked);

    // const onChangeHandler = () => {};

    return (
        <Wrapper>
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={selected}
                onChange={(e) => {
                    setChecked(!selected);
                    if (onChange) onChange(e);
                }}
            />
            <label htmlFor={name}>
                <span className="square-md">
                    <span className="icon-check">
                        <InputCheckBoxIcon />
                    </span>
                </span>
                <span className="option-label">{label}</span>
            </label>
        </Wrapper>
    );
};

UICheckBox.defaultProps = {
    label: 'Check',
    checked: false,
    onChange: () => null,
};

export default UICheckBox;
