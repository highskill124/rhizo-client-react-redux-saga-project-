import React, { FC, useEffect } from 'react';
import useAutocomplete, { createFilterOptions } from '@material-ui/lab/useAutocomplete';
import { useField } from 'formik';

import styled, { css } from 'styled-components';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import UIFormControl from './UIFormControl';
import { UILabel } from './UILabel';
import UIError from './UIError';

import { ReactComponent as ArrowIcon } from '../../media/image/select-arrow-icon.svg';
import UILoader from '../core/UILoader';
import { Depth } from '../../settings/Depth';
import { Tween } from '../../settings/Tween';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

interface IOption {
    label: string;
    value: number;
}

// TagBoxItem Inside
const TagInputWrapper = styled('div')<any>`
    position: relative;
    flex: none;
    align-self: stretch;
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

    ${(props) => {
        return css`
            border: ${props.stroke}px solid ${ThemeColor.grey219};
        `;
    }}

    &:hover {
        border-color: rgba(94, 198, 157, 1);
    }

    &.focused {
        border-color: rgba(94, 198, 157, 1);
    }

    & input {
        font-size: ${FontSize.md};
        height: 20px;
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
        cursor: pointer;
        margin-left: 8px;
        fill: ${ThemeColor.grey45};
        &:hover {
            fill: ${ThemeColor.danger};
        }
    }
`;

const TagInsideItem2 = styled(({ label, onDelete, ...props }) => (
    <div {...props}>
        <span>{label}</span>
        <CloseIcon onClick={onDelete} />
    </div>
))`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px 8px;
    margin-right: 10px;
    margin-bottom: 10px;
    height: 36px;
    background-color: ${ThemeColor.white};
    border-radius: 7px;
    border: 1px solid ${ThemeColor.grey229};
    box-sizing: content-box;
    outline: 0;
    overflow: hidden;
    color: ${ThemeColor.grey45};
    border-radius: 10px;
    user-select: none;

    & span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: ${FontWeight.medium};
        font-size: ${FontSize.sm};
        line-height: ${LineHeight.md};
        color: ${ThemeColor.grey104};
        letter-spacing: ${LetterSpacing.md};
    }

    & svg {
        width: 10px;
        height: 10px;
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
    padding: 0px;
    z-index: ${Depth.modal};
    list-style: none;
    background-color: ${ThemeColor.white};
    overflow: hidden;
    max-height: 250px;
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

// TagBoxItem Box

const TagBoxWrapper = styled('div')<any>`
    width: 100%;
    background-color: ${ThemeColor.white};
    border-radius: 4px;
    display: flex;
    flex-wrap: wrap;

    border-radius: 16px;
    background: ${ThemeColor.basic};
    box-sizing: border-box;
    border-radius: 10px;
    padding: ${(props) => (props.count ? '15px 15px 5px 15px' : '0px')};
    margin-top: ${(props) => (props.count ? '4px' : '0px')};
    height: ${(props) => (props.count ? 'auto' : '0px')};
    max-height: 168px;
    overflow: auto;

    /* &:hover {}

    &.focused {} */
`;

const TagBoxItem = styled(({ label, onDelete, ...props }) => (
    <div {...props}>
        <span>{label}</span>
        <CloseIcon onClick={onDelete} />
    </div>
))`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 6px 3px 7px;
    background-color: ${ThemeColor.white};
    box-sizing: content-box;
    outline: 0;
    overflow: hidden;
    color: ${ThemeColor.grey45};
    border-radius: 7px;
    margin: 0 10px 10px 0;
    user-select: none;

    /* &:hover {} */

    & span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    & svg {
        width: 20px;
        height: 20px;
        cursor: pointer;
        padding: 4px;
        fill: ${ThemeColor.grey45};
    }
`;

const ListWrapper = styled.div`
    width: 100%;
    margin: 85px 0px 0px 0px;
    padding: 0px;
    z-index: ${Depth.modal};
    position: absolute;
    list-style: none;
    background-color: ${ThemeColor.white};
    overflow: hidden;
    max-height: 250px;
    border-radius: 10px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;

const ListBoxWrapper = styled('ul')`
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

const ActivityWrapper = styled.div<any>`
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    top: 3px;
    right: ${(props) => (props.showCaret ? 32 : 8)}px;
    width: 32px;
    height: 32px;
    padding: 0px;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    pointer-events: none;
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
    }
`;

const InputWrapper = styled.div`
    position: relative;
    border: none;
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin-right: 0px;
    margin-bottom: 0px;
    border-radius: 16px;

    background: ${ThemeColor.white};
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

const GroupType = {
    TAG_INSIDE: 'tag-inside',
    TAG_BOX: 'tag-box',
    PLAIN: 'plain',
};

interface IProps {
    className?: string;
    id?: string;
    name: string;
    label?: string;
    labelField?: string;
    placeholder?: string;
    options: Array<any>;
    activity?: boolean;
    multiple?: boolean;
    showCaret?: boolean;
    creatable?: boolean;
    groupType?: 'tag-inside' | 'plain' | 'tag-box';
    onSearch?: (x: string) => void;
    onChange?: (x: any) => void;
    defaultValue?: Array<any>;
    selection?: any;
    style?: any;
    stroke?: number;
    tagVarient?: number;
}

const UIAutocomplete: FC<IProps> = (props) => {
    const { id, name, label, placeholder, options, activity, onSearch, labelField, multiple, groupType, onChange, defaultValue, selection, showCaret, creatable, style, stroke, tagVarient } = props;
    const [, meta, helpers] = useField({ name });
    const { setValue } = helpers;
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);

    const filter = createFilterOptions();

    useEffect(() => {
        if (selection) {
            setData(selection);
        }
    }, [selection, setData]);

    const { getRootProps, getInputLabelProps, getInputProps, getTagProps, getListboxProps, getOptionProps, groupedOptions, value, focused, setAnchorEl } = useAutocomplete({
        id: `autocomplete-${id}`,
        defaultValue,
        multiple,
        value: data,
        selectOnFocus: true,
        clearOnBlur: true,
        handleHomeEndKeys: true,
        filterOptions: (opts, params) => {
            const filtered = filter(opts, params);

            if (creatable && params.inputValue !== '') {
                filtered.push({
                    inputValue: params.inputValue,
                    label: `${params.inputValue}`,
                });
            }

            return filtered;
        },
        options: [...options],
        getOptionLabel: (option) => {
            if (option && typeof option === 'string') {
                return option;
            }

            if (option.inputValue) {
                return option.inputValue;
            }

            if (option) {
                const str = labelField ? option[labelField] : option.label;
                return str || '';
            }

            return 'loading...';
        },
        open,
        onOpen: () => {
            setOpen(true);
        },
        onClose: () => {
            setOpen(false);
        },
        onInputChange: (e: any, values) => {
            onSearch(e.target.value);
        },

        onChange: (e: any, newValue) => {
            if (typeof newValue === 'string') {
                setValue({
                    label: newValue,
                });
            } else if (newValue && newValue.inputValue) {
                setValue({
                    label: newValue.inputValue,
                });
            } else {
                setValue(newValue);
            }
            setData(newValue);
            if (onChange) {
                onChange(newValue);
            }
        },
    });

    return (
        <UIFormControl autoComplete={getRootProps()} style={style}>
            {label && (
                <UILabel htmlFor={id} {...getInputLabelProps()}>
                    {label}
                </UILabel>
            )}
            {groupType === GroupType.TAG_BOX && (
                <InputWrapper>
                    {focused && <ActivityWrapper showCaret={showCaret}>{activity && <UILoader color={ThemeColor.primary} type="dark" />}</ActivityWrapper>}
                    {showCaret && (
                        <IconWrapper className="input-icon">
                            <ArrowIcon />
                        </IconWrapper>
                    )}
                    <SInput
                        placeholder={placeholder}
                        type="text"
                        id={id}
                        name={name}
                        // value={value}
                        {...getInputProps()}
                    />
                </InputWrapper>
            )}
            {multiple && groupType === GroupType.TAG_BOX && (
                <TagBoxWrapper ref={setAnchorEl} className={focused ? 'focused' : ''} count={value ? value.length : 0}>
                    {value.map((option, index: number) => (
                        <TagBoxItem label={labelField ? option[labelField] : option.label} {...getTagProps({ index })} />
                    ))}
                </TagBoxWrapper>
            )}
            {multiple && groupType === GroupType.TAG_INSIDE && (
                <TagInputWrapper ref={setAnchorEl} stroke={stroke} className={focused ? 'focused' : ''} count={value ? value.length : 0}>
                    {focused && <ActivityWrapper showCaret={showCaret}>{activity && <UILoader color={ThemeColor.primary} type="dark" />}</ActivityWrapper>}
                    {showCaret && (
                        <IconWrapper className="input-icon">
                            <ArrowIcon />
                        </IconWrapper>
                    )}
                    {tagVarient === 1 && value.map((option: IOption, index: number) => <TagInsideItem label={option.label} {...getTagProps({ index })} />)}
                    {tagVarient === 2 && value.map((option: IOption, index: number) => <TagInsideItem2 label={option.label} {...getTagProps({ index })} />)}
                    {tagVarient === 1 && <input {...getInputProps()} style={{ height: 20 }} />}
                    {tagVarient === 2 && <input {...getInputProps()} style={{ height: 36 }} />}
                </TagInputWrapper>
            )}
            {meta.touched && meta.error ? <UIError>{meta.error}</UIError> : null}
            {groupType === GroupType.TAG_BOX && groupedOptions.length > 0 ? (
                <ListWrapper {...getListboxProps()}>
                    <ListBoxWrapper>
                        {groupedOptions.map((option, index) => (
                            <li {...getOptionProps({ option, index })}>
                                <span>{option.label}</span>
                                <CheckIcon fontSize="small" />
                            </li>
                        ))}
                    </ListBoxWrapper>
                </ListWrapper>
            ) : null}
            {groupType === GroupType.TAG_INSIDE && groupedOptions.length > 0 ? (
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

UIAutocomplete.defaultProps = {
    activity: false,
    multiple: false,
    groupType: 'tag-box',
    // onChange: (x: any) => {},
    defaultValue: [],
    stroke: 1,
    tagVarient: 1,
};

export default React.memo(UIAutocomplete);
