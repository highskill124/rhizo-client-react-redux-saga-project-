import React, { FC, useEffect } from 'react';
import styled, { css } from 'styled-components';
import * as polished from 'polished';
import CloseIcon from '@material-ui/icons/Close';
import { Depth } from '../../../settings/Depth';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';
import { Tween } from '../../../settings/Tween';

export const TagBoxInputWrapper = styled.div`
    position: relative;
    border: none;
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin-right: 0px;
    margin-bottom: 0px;
    background: ${ThemeColor.white};
    box-sizing: border-box;
    border-radius: 0px;

    > input {
        &:focus {
            border-color: ${ThemeColor.primary};
            /* border-bottom-color: ${polished.lighten(0.1, ThemeColor.primary)}; */
            /* box-shadow: 0px 21px 73px rgba(0, 0, 0, 0.16); */
        }
    }
`;

export const TagBoxInput = styled.input<any>`
    flex: 1;
    height: 40px;
    border-radius: 10px;
    border: 1px solid ${ThemeColor.grey229};
    padding: ${(props) => (props.showCaret ? '8px 32px 8px 16px' : '8px 16px 8px 16px')};
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
    border-radius: ${(props) => (props.open ? '10px 10px 0px 0px' : '10px 10px 10px 10px')};

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

export const TagBoxListWrapper = styled.div`
    left: 0px;
    right: 0px;
    top: 40px;
    z-index: ${Depth.modal};
    position: absolute;
    box-shadow: 0px 21px 73px rgba(0, 0, 0, 0.16);
    list-style: none;
    background-color: ${ThemeColor.white};
    overflow: hidden;
    max-height: 250px;
    /* border-radius: 10px; */
    border-radius: 0px 0px 10px 10px;
`;

export const TagBoxList = styled('ul')`
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

export const TagBoxTagWrapper = styled('div')<any>`
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

export const TagBoxTagItem = styled(({ label, onDelete, ...props }) => (
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
