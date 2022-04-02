/* eslint-disable no-unused-vars */
import React, { FC, useEffect, useState } from 'react';
import { useField } from 'formik';
import styled from 'styled-components';
import UICheckBox from './UICheckBox';
import UIFormControl from './UIFormControl';
import { UILabel } from './UILabel';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

export const FieldWrapper = styled.div<any>`
    position: relative;
    border: none;
    display: flex;
    width: 100%;
    height: 40px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-right: 16px;
    border-radius: 16px;
    background: ${ThemeColor.basic};
    /* border: 1px solid ${ThemeColor.grey229}; */
    box-sizing: border-box;
    border-radius: 10px;
    padding: 4px 15px;
    margin-bottom: ${(props) => (props.count > 1 ? 10 : 0)}px;
`;

export const Text = styled.span`
    font-style: normal;
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.md};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.grey45};
    user-select: none;
`;

export const Title = styled.h4`
    font-style: normal;
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.md};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.grey45};
    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 3px 0px;
    user-select: none;
`;

export const Desc = styled.span`
    font-style: normal;
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.sm};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.grey104};
    margin: 3px 0px 10px 0px;
    user-select: none;
`;

interface IProps {
    className?: string;
    id?: string;
    name: string;
    label?: string;
    desc?: string;
    options: Array<any>;
}

const UICourseConfirmGroup: FC<IProps> = (props) => {
    const { id, name, label, options, desc } = props;
    // const [field, meta, helpers] = useField(name);
    const [field, meta, helpers] = useField({ name });

    const [list, setList] = useState([]);

    useEffect(() => {
        if (options && options.length > 0) {
            const l = options.map((x, i) => ({ ...x, confirm: false, cid: `c${i}` }));
            setList(l);
        }
    }, [options]);

    const toggleConfirm = (v) => {
        const map = [...list].reduce((m, x) => {
            const nm = { ...m };
            nm[x.cid] = x;
            return nm;
        }, {});
        const nMap = { ...map, [v.cid]: { ...v, confirm: !v.confirm } };
        const l = Object.keys(nMap).map((k) => nMap[k]);
        setList(l);
    };

    return (
        <UIFormControl>
            {label && <Title>{label}</Title>}
            {desc && <Desc>{desc}</Desc>}
            {list &&
                list.map((x, i) => (
                    <FieldWrapper key={`ui-static-cnfg-${x.cid}`} count={list.length}>
                        <Text>{`${x.major} ${x.course}`}</Text>
                        <UICheckBox id={x.cid} name={x.cid} label="" checked={x.confirm} onChange={() => toggleConfirm(x)} />
                    </FieldWrapper>
                ))}
        </UIFormControl>
    );
};

UICourseConfirmGroup.defaultProps = {};

export default UICourseConfirmGroup;
