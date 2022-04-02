/* eslint-disable no-unused-vars */
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import React, { FC, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Depth } from '../../settings/Depth';
import { Device } from '../../settings/Device';
import { Tween } from '../../settings/Tween';
import { AutoCompleteService, ICourseSearchParams } from './autocomplete/AutoCompleteService';
import UIButtonBase from '../button/UIButtonBase';
import UILoader from '../core/UILoader';
import { CaretIcon, ExpandIcon, SearchIcon, SliderIcon } from '../icon/UIIconAssets';
import UIMenu from '../navigation/menu/UIHeaderMenu';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const ListWrapper = styled.div`
    left: 0px;
    right: 0px;
    top: 40px;
    z-index: ${Depth.modal};
    position: absolute;
    list-style: none;
    background-color: ${ThemeColor.white};
    overflow: hidden;
    max-height: 250px;
    border-radius: 0px 0px 10px 10px;
    box-shadow: 0px 21px 73px rgba(0, 0, 0, 0.16);
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
        padding: 5px 15px;
        display: flex;
        font-weight: ${FontWeight.medium};
        font-size: ${FontSize.sm};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.grey104};
        display: flex;
        align-items: center;
        transition: color ${Tween.duration}s ${Tween.ease};

        & span {
            flex-grow: 1;
        }

        & svg {
            width: 24px;
            height: 24px;
            color: transparent;
        }

        &:hover {
            color: ${ThemeColor.danger};
        }
    }

    & li[aria-selected='true'] {
        background-color: rgba(94, 198, 157, 0.1);
        font-weight: ${FontWeight.medium};

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

const InputWrapper = styled.div`
    position: relative;
    width: 100%;
    border: none;
    width: 179px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin-right: 0px;
    margin-bottom: 0px;
    border-radius: 0px;
    background-color: #fafafe;
    box-sizing: border-box;
    border: none;

    > input {
        &:focus {
            /* border-color: ${ThemeColor.primary}; */
        }
    }
`;

const SInput = styled.input`
    flex: 1;
    min-width: 80px;
    height: 40px;
    border-radius: 0px;
    /* border: 1px solid ${ThemeColor.basic}; */
    border: none;
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
    background-color: #fafafe;

    @media (min-width: ${Device.tablet}px) {
        max-width: 178px;
    }

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

const MenuButtonWrapper = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0px 0px 0px 0px;
    padding: 0px 15px 0px 15px;
    background: ${ThemeColor.searchSelectBg};
    border-radius: ${(props) => (props.open ? '5px 0px 0px 0px' : '5px 0px 0px 5px')};
    @media (max-width: ${Device.mobileLarge}px) {
        padding: 0px 0px 0px 0px;
        background: ${ThemeColor.second};
    }
    @media (min-width: ${Device.mobileLarge}px) {
        width: 100px;
    }

    > button {
        width: 100px;
        height: 40px;
        border-radius: 10px;
        background-color: transparent;
        color: ${ThemeColor.white};
        padding: 0px 0px;
        margin: 0px 0px;
        position: relative;
        align-self: stretch;
        flex: 1;
        justify-content: space-between;
        @media (max-width: ${Device.mobileLarge}px) {
            width: 40px;
            width: 40px;
        }

        > div {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin: 0px;
            padding: 0px;
            display: none;
            width: 40px;
            height: 40px;
            @media (max-width: ${Device.mobileLarge}px) {
                display: flex;
            }

            svg {
                width: 20px;
                height: 20px;

                * {
                    transition: stroke ${Tween.duration}s ${Tween.ease};
                    stroke: ${ThemeColor.secondDark};
                    fill: ${ThemeColor.secondDark};
                }
            }
        }

        > span {
            font-style: normal;
            font-weight: ${FontWeight.medium};
            font-size: ${FontSize.md};
            line-height: ${LineHeight.md};
            display: flex;
            align-items: center;
            letter-spacing: ${LetterSpacing.md};
            color: ${ThemeColor.grey104};
            @media (max-width: ${Device.mobileLarge}px) {
                display: none;
            }
        }

        > svg {
            width: 12px;
            height: 8px;
            @media (max-width: ${Device.mobileLarge}px) {
                display: none;
            }
            * {
                transition: fill ${Tween.duration}s ${Tween.ease};
                fill: ${ThemeColor.grey165};
            }
        }

        &:hover {
            background-color: transparent;
            svg {
                * {
                    fill: ${ThemeColor.primary};
                }
            }
        }
    }
`;

const SearchButtonWrapper = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex: none;
    flex-grow: 0;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;

    > button {
        width: 40px;
        height: 40px;
        border-radius: ${(props) => (props.open ? '0px 5px 0px 0px' : '0px 5px 5px 0px')};
        color: ${ThemeColor.white};
        padding: 0px 0px;
        margin: 0px 0px;
        position: relative;
        align-self: stretch;
        flex: 1;
        justify-content: center;
        align-items: center;
        background-color: #fafafe;

        svg {
            width: 16px;
            height: 16px;
            * {
                transition: fill ${Tween.duration}s ${Tween.ease};
                fill: ${ThemeColor.subtitle};
            }
        }

        &:hover {
            background-color: #fafafe;
            svg {
                * {
                    fill: ${ThemeColor.subtitle};
                }
            }
        }
    }
`;

const Wrapper = styled.div<any>`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0px 10px 0px 10px;
    padding: 0px 0px 0px 0px;
    flex: 1;
    align-self: stretch;

    @media (max-width: ${Device.tablet}px) {
        ${(props) => {
            if (props.show) {
                return css`
                    display: flex;
                `;
            } else {
                return css`
                    display: none;
                `;
            }
        }}

        ${(props) => {
            if (props.block) {
                return css`
                    flex: 1;
                    align-self: stretch;
                `;
            } else {
                return css`
                    flex: 0;
                    align-self: auto;
                `;
            }
        }}
    }
`;

const Root = styled.div<any>`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex: none;
    flex-grow: 0;
    margin: 0px 10px 0px 10px;
    padding: 0px 0px 0px 0px;

    @media (max-width: ${Device.tablet}px) {
        zoom: 0.8;
        ${(props) => {
            if (props.block) {
                return css`
                    flex: 1;
                    align-self: stretch;
                    margin: 0px 8px 0px 8px;
                `;
            } else {
                return css`
                    flex: 0;
                    align-self: auto;
                `;
            }
        }}
    }
`;

const SearchTargetMap = {
    COURSE: 'Course',
    TAG: 'Tag',
    MAJOR: 'Major',
    TUTOR: 'Tutor',
};

const searchTargetList = [
    { label: 'Course', value: 'Course', url: '' },
    { label: 'Tag', value: 'Tag', url: '' },
    { label: 'Major', value: 'Major', url: '' },
    { label: 'Tutor Name', value: 'Tutor', url: '' },
];

const autoCompleteService: AutoCompleteService = new AutoCompleteService();

interface IProps {
    className?: string;
    id?: string;
    style?: any;
    show?: boolean;
    block?: boolean;
}

const UISearch: FC<IProps> = (props) => {
    const { id, style, show, block } = props;

    const [activity, setActivity] = useState(false);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [options, setOptions] = useState([]);
    const list = [...searchTargetList];
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [searchTarget, setSearchTarget] = useState(searchTargetList[0]);
    const menuButtonRef = useRef(null);

    const onMenuChange = (x) => {
        setSearchTarget(x);
    };

    const processData = (d) => {
        if (d && d.results) {
            return d.results.map((x) => ({ label: x.name, value: x.alias }));
        }
        return [];
    };

    const { getRootProps, getInputLabelProps, getInputProps, getTagProps, getListboxProps, getOptionProps, groupedOptions, value, focused, setAnchorEl } = useAutocomplete({
        id: `autocomplete-${id}`,
        defaultValue: [],
        multiple: false,
        value: data,
        selectOnFocus: true,
        clearOnBlur: true,
        handleHomeEndKeys: true,
        options: [...options],
        getOptionLabel: (option) => {
            if (option && typeof option === 'string') {
                return option;
            }

            if (option.inputValue) {
                return option.inputValue;
            }

            if (option) {
                return option.label || '';
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
            setActivity(true);
            switch (searchTarget.value) {
                case SearchTargetMap.COURSE:
                    autoCompleteService
                        .searchCourse({
                            search: e.target.value,
                        })
                        .then((x) => {
                            setActivity(false);
                            setOptions(processData(x));
                        });
                    break;
                case SearchTargetMap.MAJOR:
                    autoCompleteService
                        .searchMajor({
                            title: e.target.value,
                        })
                        .then((x) => {
                            setActivity(false);
                            setOptions(processData(x));
                        });
                    break;
                case SearchTargetMap.TAG:
                    autoCompleteService
                        .searchTag({
                            search: e.target.value,
                        })
                        .then((x) => {
                            setActivity(false);
                            setOptions(processData(x));
                        });
                    break;
                case SearchTargetMap.TUTOR:
                    autoCompleteService
                        .searchTutor({
                            search: e.target.value,
                        })
                        .then((x) => {
                            setActivity(false);
                            setOptions(processData(x));
                        });
                    break;

                default:
                    break;
            }
        },

        onChange: (e: any, newValue) => {
            setData(newValue);
            // if (onChange) {
            //     onChange(newValue);
            // }
        },
    });

    return (
        <Wrapper style={{ margin: 0 }} show={show} block={block}>
            <Root {...getRootProps()} block={block}>
                <MenuButtonWrapper ref={(x) => (menuButtonRef.current = x)} open={menuAnchorEl || (open && options.length > 0)}>
                    <UIButtonBase onClick={(e) => setMenuAnchorEl(menuButtonRef.current)}>
                        <div>
                            <SliderIcon />
                        </div>
                        <span>{searchTarget.label}</span>
                        <ExpandIcon />
                    </UIButtonBase>
                </MenuButtonWrapper>

                <InputWrapper>
                    <ActivityWrapper showCaret={false}>{activity && <UILoader color={ThemeColor.second} type="dark" />}</ActivityWrapper>
                    <SInput placeholder="Search for student..." type="text" id={id} name={id} {...getInputProps()} />
                </InputWrapper>
                <SearchButtonWrapper open={open && options.length > 0}>
                    <UIButtonBase>
                        <SearchIcon />
                    </UIButtonBase>
                </SearchButtonWrapper>

                {groupedOptions.length > 0 && (
                    <ListWrapper {...getListboxProps()}>
                        <ListBoxWrapper>
                            {groupedOptions.map((option, index) => (
                                <li {...getOptionProps({ option, index })}>
                                    <span>{option.label}</span>
                                </li>
                            ))}
                        </ListBoxWrapper>
                    </ListWrapper>
                )}
            </Root>
            <UIMenu
                // ---
                list={list}
                anchorEl={menuAnchorEl}
                onChange={(x) => onMenuChange(x)}
                onClose={() => setMenuAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                width={100}
                borderRadius={[0, 0, 10, 10]}
            />
        </Wrapper>
    );
};

UISearch.defaultProps = {
    show: false,
    block: false,
};

export default UISearch;
