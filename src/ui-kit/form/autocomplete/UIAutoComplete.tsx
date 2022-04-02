import React, { FC, useEffect } from 'react';
import useAutocomplete, { createFilterOptions } from '@material-ui/lab/useAutocomplete';
import { useField } from 'formik';
import styled, { css } from 'styled-components';
import CheckIcon from '@material-ui/icons/Check';
import UIError from '../UIError';
import UILoader from '../../core/UILoader';
import { ThemeColor } from '../../../settings/ThemeColor';
import UIBox, { IUIBoxProps } from '../../core/UIBox';
import { TagBoxInput, TagBoxInputWrapper, TagBoxList, TagBoxListWrapper, TagBoxTagItem, TagBoxTagWrapper } from './autocomplete-tag-box';
import { TagInsideInputWrapper, TagInsideItem, TagInsideItem2, TagInsideList, TagInsideListWrapper } from './auto-complete-tag-inside';
import { Color } from '../../../style-guide/Color';
import { UILabel } from '../UILabel';
import { ArrowDownIcon } from '../../icon/UIIconAssets';

interface IOption {
    label: string;
    value: number;
}

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
    }}

    & > svg {
        fill: ${Color.icon};
    }
`;

const GroupType = {
    TAG_INSIDE: 'tag-inside',
    TAG_BOX: 'tag-box',
    PLAIN: 'plain',
};

export interface IUIAutocompleteProps extends IUIBoxProps {
    className?: string;
    id?: string;
    name: string;
    label?: string;
    labelField?: string;
    placeholder?: string;
    options?: Array<any>;
    activity?: boolean;
    multiple?: boolean;
    showCaret?: boolean;
    creatable?: boolean;
    groupType?: 'tag-inside' | 'plain' | 'tag-box';
    onSearch?: (x: string) => void;
    onChange?: (x: any, create?: boolean) => void;
    onCreate?: (x: any) => void;
    defaultValue?: Array<any>;
    selection?: any;
    style?: any;
    stroke?: number;
    tagVarient?: number;
    boxProps?: IUIBoxProps;
}

const UIAutocomplete: FC<IUIAutocompleteProps> = (props) => {
    const { id, name, label, boxProps, placeholder, options, activity, onSearch, labelField, multiple, groupType, onChange, defaultValue, selection, showCaret, creatable, style, stroke, tagVarient, onCreate } = props;
    const [, meta, helpers] = useField({ name });
    const { setValue } = helpers;
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState<any>([]);

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
                    label: `Add "${params.inputValue}"`,
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
            // onSearch(e.target.value);
            onSearch(values);
        },

        onChange: (e: any, newValue) => {
            if (typeof newValue === 'string') {
                // setValue({
                //     label: newValue,
                // });
                setValue(newValue);
                onChange(newValue, false);
                setData({
                    label: newValue,
                });
            } else if (newValue && newValue.inputValue) {
                // setValue({
                //     label: newValue.inputValue,
                // });

                console.log('>>>');

                setValue(newValue.inputValue);
                onChange(newValue.inputValue, true);
                onCreate(newValue.inputValue);
                setData({
                    inputValue: newValue.inputValue,
                });
            } else if (newValue) {
                setValue(newValue.value);
                onChange(newValue.value, false);
                setData(newValue);
            } else {
                setValue(newValue);
                onChange(newValue, false);
                setData(newValue);
            }
        },
    });

    const renderTagBoxInput = () => {
        if (multiple) {
            return (
                <>
                    <TagBoxInputWrapper>
                        {focused && <ActivityWrapper showCaret={showCaret}>{activity && <UILoader color={ThemeColor.primary} type="dark" />}</ActivityWrapper>}
                        {showCaret && (
                            <IconWrapper className="input-icon">
                                <ArrowDownIcon />
                            </IconWrapper>
                        )}
                        <TagBoxInput showCaret={showCaret} open={groupedOptions && groupedOptions.length > 0 && open} placeholder={placeholder} type="text" id={id} name={name} {...getInputProps()} />
                    </TagBoxInputWrapper>
                    <TagBoxTagWrapper ref={setAnchorEl} className={focused ? 'focused' : ''} count={value ? value.length : 0}>
                        {value.map((option, index: number) => (
                            <TagBoxTagItem label={labelField ? option[labelField] : option.label} {...getTagProps({ index })} />
                        ))}
                    </TagBoxTagWrapper>
                </>
            );
        } else {
            return (
                <TagBoxInputWrapper>
                    {focused && <ActivityWrapper showCaret={showCaret}>{activity && <UILoader color={ThemeColor.primary} type="dark" />}</ActivityWrapper>}
                    {showCaret && (
                        <IconWrapper className="input-icon">
                            <ArrowDownIcon />
                        </IconWrapper>
                    )}
                    <TagBoxInput showCaret={showCaret} open={groupedOptions && groupedOptions.length > 0 && open} placeholder={placeholder} type="text" id={id} name={name} {...getInputProps()} />
                </TagBoxInputWrapper>
            );
        }
    };

    const renderTagBoxListing = () => {
        return (
            <TagBoxListWrapper {...getListboxProps()}>
                <TagBoxList>
                    {groupedOptions.map((option, index) => (
                        <li {...getOptionProps({ option, index })}>
                            <span>{option.label}</span>
                            <CheckIcon fontSize="small" />
                        </li>
                    ))}
                </TagBoxList>
            </TagBoxListWrapper>
        );
    };

    const renderTagInsideInput = () => {
        return (
            <TagInsideInputWrapper ref={setAnchorEl} stroke={stroke} className={focused ? 'focused' : ''} count={value ? value.length : 0}>
                {focused && <ActivityWrapper showCaret={showCaret}>{activity && <UILoader color={ThemeColor.primary} type="dark" />}</ActivityWrapper>}
                {showCaret && (
                    <IconWrapper className="input-icon">
                        <ArrowDownIcon />
                    </IconWrapper>
                )}
                {tagVarient === 1 && value.map((option: IOption, index: number) => <TagInsideItem label={option.label} {...getTagProps({ index })} />)}
                {tagVarient === 2 && value.map((option: IOption, index: number) => <TagInsideItem2 label={option.label} {...getTagProps({ index })} />)}
                {tagVarient === 1 && <input {...getInputProps()} style={{ height: 20 }} />}
                {tagVarient === 2 && <input {...getInputProps()} style={{ height: 36 }} />}
            </TagInsideInputWrapper>
        );
    };

    const renderTagInsideListing = () => {
        return (
            <TagInsideListWrapper {...getListboxProps()}>
                <TagInsideList>
                    {groupedOptions.map((option, index) => (
                        <li {...getOptionProps({ option, index })}>
                            <span>{option.label}</span>
                            <CheckIcon fontSize="small" />
                        </li>
                    ))}
                </TagInsideList>
            </TagInsideListWrapper>
        );
    };

    const renderLabel = () => (
        <UILabel htmlFor={id} {...getInputLabelProps()}>
            {label}
        </UILabel>
    );

    return (
        <UIBox display="flex" flex={1} flexDirection="column" {...boxProps}>
            {label && renderLabel()}

            <UIBox display="flex" flexDirection="column" position="relative" {...getRootProps()}>
                {groupType === GroupType.TAG_BOX && renderTagBoxInput()}
                {groupType === GroupType.TAG_BOX && groupedOptions.length > 0 && renderTagBoxListing()}

                {groupType === GroupType.TAG_INSIDE && renderTagInsideInput()}
                {groupType === GroupType.TAG_INSIDE && groupedOptions.length > 0 && renderTagInsideListing()}

                {meta.error ? <UIError>{meta.error}</UIError> : null}
            </UIBox>
        </UIBox>
    );
};

UIAutocomplete.defaultProps = {
    options: [],
    activity: false,
    multiple: false,
    groupType: 'tag-box',
    // onChange: (x: any) => {},
    defaultValue: [],
    stroke: 1,
    tagVarient: 1,
    onChange: (x) => {},
    onCreate: (x) => {},
};

export default React.memo(UIAutocomplete);
