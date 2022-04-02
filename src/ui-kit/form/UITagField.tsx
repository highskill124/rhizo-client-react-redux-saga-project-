import React, { FC } from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import { useField } from 'formik';

import styled from 'styled-components';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import UIFormControl from './UIFormControl';
import { UILabel } from './UILabel';
import UIError from './UIError';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

interface IOption {
    label: string;
    value: number;
}

const TagInputWrapper = styled('div')<any>`
    flex: none;
    align-self: stretch;
    border: 1px solid ${ThemeColor.grey219};
    background-color: ${ThemeColor.white};
    display: flex;
    flex-wrap: wrap;
    border-radius: 16px;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 10px;
    margin-top: 0px;
    max-height: 168px;
    overflow: auto;

    &:hover {
        border-color: rgba(94, 198, 157, 1);
    }

    &.focused {
        border-color: rgba(94, 198, 157, 1);
    }

    & input {
        font-size: ${FontSize.md};
        min-height: 20px;
        box-sizing: border-box;
        padding: 4px 6px;
        width: 0;
        min-width: 30px;
        flex-grow: 1;
        border: 0;
        margin: 0;
        outline: 0;
    }
`;

const TagInsideItem = styled(({ label, onDelete, ...props }) => (
    <div {...props}>
        <span>{label}</span>
        <CloseIcon onClick={onDelete} />
    </div>
))`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px 6px;
    margin-right: 1px;
    margin-bottom: 1px;
    height: 20px;
    background-color: ${ThemeColor.basic};
    border-radius: 7px;
    box-sizing: content-box;
    outline: 0;
    overflow: hidden;
    color: ${ThemeColor.grey45};
    border-radius: 7px;
    user-select: none;

    & span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: ${FontWeight.medium};
        font-size: ${FontSize.xs};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
    }

    & svg {
        width: 10px;
        height: 10px;
        /* ${FontSize.sm}; */
        cursor: pointer;
        margin-left: 8px;
        fill: ${ThemeColor.grey45};
        &:hover {
            fill: ${ThemeColor.danger};
        }
    }
`;

const TagInsideListWrapper = styled.div`
    width: 100%;
    margin: 85px 0px 0px 0px;
    padding: 0px;
    z-index: 1;
    position: absolute;
    list-style: none;
    background-color: ${ThemeColor.white};
    overflow: hidden;
    max-height: 250px;
    /* border: 1px solid rgba(0, 0, 0, 0.25); */
    border-radius: 10px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;

const ListInsideWrapper = styled('ul')`
    width: 100%;
    margin: 2px 0 0;
    padding: 0;
    list-style: none;
    background-color: ${ThemeColor.white};
    overflow: auto;
    max-height: 250px;
    & li {
        cursor: pointer;
        color: ${ThemeColor.grey104};
        min-height: 32px;
        padding: 5px 12px;
        display: flex;

        & span {
            flex-grow: 1;
        }

        & svg {
            width: 24px;
            height: 24px;
            color: transparent;
        }
    }

    & li[aria-selected='true'] {
        background-color: rgba(94, 198, 157, 0.1);
        font-weight: ${FontWeight.semiBold};

        & svg {
            color: rgba(94, 198, 157, 1);
        }
    }

    & li[data-focus='true'] {
        background-color: ${ThemeColor.grey250};
        cursor: pointer;

        & svg {
            color: ${ThemeColor.grey192};
        }
    }
`;

interface IProps {
    className?: string;
    id?: string;
    name: string;
    label?: string;
    placeholder?: string;
    options: Array<any>;
}

const UITagField: FC<IProps> = (props) => {
    const { id, name, label, options } = props;
    const [, meta] = useField({ name });

    const { getRootProps, getInputLabelProps, getInputProps, getTagProps, getListboxProps, getOptionProps, groupedOptions, value, focused, setAnchorEl } = useAutocomplete({
        id: `autocomplete-${id}`,
        defaultValue: [options[1]],
        multiple: true,
        options,
        getOptionLabel: (option) => option.label,
    });

    return (
        <UIFormControl autoComplete={getRootProps()}>
            {label && (
                <UILabel htmlFor={id} {...getInputLabelProps()}>
                    {label}
                </UILabel>
            )}
            <TagInputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''} count={value ? value.length : 0}>
                {value.map((option: IOption, index: number) => (
                    <TagInsideItem label={option.label} {...getTagProps({ index })} />
                ))}
                <input {...getInputProps()} />
            </TagInputWrapper>

            {meta.touched && meta.error ? <UIError>{meta.error}</UIError> : null}
            {groupedOptions.length > 0 ? (
                <TagInsideListWrapper {...getListboxProps()}>
                    <ListInsideWrapper>
                        {groupedOptions.map((option, index) => (
                            <li {...getOptionProps({ option, index })}>
                                <span>{option.label}</span>
                                <CheckIcon fontSize="small" />
                            </li>
                        ))}
                    </ListInsideWrapper>
                </TagInsideListWrapper>
            ) : null}
        </UIFormControl>
    );
};

export default UITagField;
