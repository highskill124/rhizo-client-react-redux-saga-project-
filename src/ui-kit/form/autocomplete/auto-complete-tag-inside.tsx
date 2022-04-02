import React, { FC, useEffect } from 'react';
import styled, { css } from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import { Depth } from '../../../settings/Depth';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';
import { Tween } from '../../../settings/Tween';

export const TagInsideInputWrapper = styled('div')<any>`
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
    width: 100%;

    ${(props) => {
        return css`
            border: ${props.stroke}px solid ${ThemeColor.grey229};
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

export const TagInsideItem = styled(({ label, onDelete, ...props }) => (
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

export const TagInsideItem2 = styled(({ label, onDelete, ...props }) => (
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

export const TagInsideListWrapper = styled.div`
    left: 0px;
    right: 0px;
    top: 40px;
    z-index: ${Depth.modal};
    position: absolute;
    box-shadow: 0px 21px 73px rgba(0, 0, 0, 0.16);
    padding: 0px;
    list-style: none;
    background-color: ${ThemeColor.white};
    overflow: hidden;
    max-height: 250px;
    /* border-radius: 10px; */
    border-radius: 0px 0px 10px 10px;
`;

export const TagInsideList = styled('ul')`
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
