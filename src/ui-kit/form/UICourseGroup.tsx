/* eslint-disable no-unused-vars */
import { useField } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Color from 'color';
import UIFormControl from './UIFormControl';
import { UILabel } from './UILabel';
import { Device } from '../../settings/Device';
import UITextField from './UITextField';
import UISpacer from '../core/UISpacer';
import UIButton from '../button/UIButton';
import UIIconButton from '../core/UIIconButton';

import { ReactComponent as PlusIcon } from '../../media/image/plus-icon.svg';
import { ReactComponent as BinIcon } from '../../media/image/bin-icon.svg';
import UITagField from './UITagField';
import UIAutocomplete from './UIAutoComplete';
import { Tween } from '../../settings/Tween';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;

    @media (max-width: ${Device.mobileMedium - 1}px) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    > button {
        width: 40px;
        height: 40px;

        svg {
            width: 14px;
            height: 14px;
        }
    }
`;

const CircleWrapper = styled.span`
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    top: 12px;
    right: 12px;
`;

// const OuterCircle = styled.div`
//     position: relative;

//     display: flex;
//     flex-direction: row;
//     justify-content: center;
//     align-items: center;
//     width: 16px;
//     height: 16px;
//     background-color: ${ThemeColor.white};
//     border-radius: 50%;
// `;

const InnerCircle = styled.div<any>`
    position: relative;

    display: flex;
    width: 16px;
    height: 16px;
    border: 3px solid ${ThemeColor.white};
    background-color: ${ThemeColor.white};
    /* background-color: ${(props) => props.fill}; */
    border-radius: 50%;
    transition: background-color ${Tween.duration}s ${Tween.ease};
`;

const SelectedCourseGroupWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    background: ${ThemeColor.basic};
    border-radius: 13px;
    padding: 15px 20px;
    margin-bottom: 15px;

    > div {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        > h4 {
            font-style: normal;
            font-weight: ${FontWeight.medium};
            font-size: ${FontSize.md};
            line-height: ${LineHeight.md};
            letter-spacing: ${LetterSpacing.md};
            color: ${ThemeColor.grey45};
            margin: 0 0 3px 0;
        }

        > span {
            font-style: normal;
            font-weight: ${FontWeight.medium};
            font-size: ${FontSize.sm};
            line-height: ${LineHeight.md};
            letter-spacing: ${LetterSpacing.md};
            color: ${ThemeColor.grey104};
        }
    }

    > span {
        position: relative;
        display: flex;
        min-width: 32px;
        min-height: 24px;
        justify-content: center;
        align-items: center;

        svg {
            width: 15px;
            height: 15px;
        }
    }
`;

const IconWrapper = styled.div<any>`
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    right: -8px;
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
                    }
                }
            `;
        }

        return null;
    }}

    & > svg {
        display: flex;
        width: 15px;
        height: 15px;
        user-select: false;
        pointer-events: none;
    }
`;

const CourseInputWrapper = styled.div`
    display: flex;
    flex: none;
    flex-direction: column;
    align-items: flex-start;
    padding: 15px 20px;
    align-self: stretch;
    flex-grow: 0;
    background: ${ThemeColor.white};
    border: 1px solid ${ThemeColor.grey229};
    box-sizing: border-box;
    border-radius: 15px;
    margin: 0px 0px;
`;
const CourseGroupWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    margin: 0px;

    @media (max-width: ${Device.mobileMedium - 1}px) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
`;

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    > div {
        width: 100px;
    }
`;

interface ICourseItem {
    major: string;
    course: string;
    tags?: Array<any>;
}

interface IProps {
    className?: string;
    id: string;
    name: string;
    label?: string;
    tagList?: Array<any>;
    showTag?: boolean;
    tagLoading?: boolean;
    onTagSearch?: (x) => void;
    majorList?: Array<any>;
    majorLoading?: boolean;
    onMajorSearch?: (x) => void;
}

const UICourseGroup: FC<IProps> = ({ id, name, label, tagList, tagLoading, onTagSearch, showTag, onMajorSearch, majorList, majorLoading }) => {
    const [list, setList] = useState([]);
    const [item, setItem] = useState({ major: '', course: '', tags: [] });
    const [field, meta, helpers] = useField({ name });

    const { value } = meta;
    const { setValue } = helpers;

    const isSelected = (v) => (v === value ? 'selected' : '');

    useEffect(() => {
        // if (list && list.length) setValue(list);
    }, [list]);

    const onChange = (fi, v) => {
        if (fi === 0) setItem({ ...item, major: v });
        else if (fi === 1) setItem({ ...item, course: v });
        else if (fi === 2) setItem({ ...item, tags: v });
    };

    const addItem = () => {
        if (item.major && item.course) {
            const itemList: Array<ICourseItem> = [...list];
            itemList.push({ ...item });
            setList([...itemList]);
            setItem({ major: '', course: '', tags: [] });
            setValue(itemList);
        }
    };
    const removeItem = (n) => {
        if (list && list.length) {
            const itemList: Array<ICourseItem> = [...list];
            itemList.splice(n, 1);
            setList([...itemList]);
            setValue(itemList);
        }
    };

    return (
        <UIFormControl>
            {label && <UILabel>{label}</UILabel>}
            <Wrapper>
                {list &&
                    list.map((x, i) => (
                        <SelectedCourseGroupWrapper key={`${name}-sel-course-${i}`}>
                            <div>
                                <h4>{`${list[i].major} ${list[i].course}`}</h4>
                                {showTag && list[i].tags && list[i].tags.length > 0 && <span>{list[i].tags.map((m) => m.label).join(', ')}</span>}
                            </div>
                            <span>
                                <IconWrapper onClick={() => removeItem(i)}>
                                    <BinIcon />
                                </IconWrapper>
                            </span>
                        </SelectedCourseGroupWrapper>
                    ))}
                <CourseInputWrapper>
                    <CourseGroupWrapper>
                        {/* <UITextField id={`${name}-majorName`} name={`${name}-majorName`} onChange={(e) => onChange(0, e.target.value)} value={item.major} label="Major" placeholder="Enter Major" style={{ marginBottom: 0 }} /> */}
                        <UIAutocomplete creatable id={`${name}-majorName`} name={`${name}-majorName`} label="Major" placeholder="Subject" options={majorList} activity={majorLoading} onSearch={(x) => onMajorSearch(x)} onChange={(x) => onChange(0, x)} defaultValue={[]} style={{ marginBottom: 10 }} />
                        <UISpacer width={10} height={1} />
                        <UITextField id={`${name}-courseNum`} name={`${name}-courseNum`} onChange={(e) => onChange(1, e.target.value)} value={item.course} label="Course Number" placeholder="Enter Course" style={{ marginBottom: 0 }} />
                    </CourseGroupWrapper>
                    {showTag && <UIAutocomplete creatable id={`${name}-tags`} name={`${name}-tags`} label="Tags" placeholder="Select major" multiple groupType="tag-inside" options={tagList} activity={tagLoading} onSearch={(x) => onTagSearch(x)} onChange={(x) => onChange(2, x)} selection={item.tags} defaultValue={[]} />}
                    <ButtonContainer>
                        <UIButton color="second">Confirm</UIButton>
                    </ButtonContainer>
                </CourseInputWrapper>
                <UISpacer height={10}></UISpacer>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'end' }}>
                    <UIButton onClick={addItem} color="second">
                        Add Course
                    </UIButton>
                </div>
            </Wrapper>
        </UIFormControl>
    );
};

export default React.memo(UICourseGroup);
