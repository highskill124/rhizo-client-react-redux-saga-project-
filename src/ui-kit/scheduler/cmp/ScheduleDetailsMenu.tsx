import React, { FC, ReactElement, ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';
import { PopperPlacementType } from '@material-ui/core';
import { Tween } from '../../../settings/Tween';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';
import { CalendarIcon, TimeIcon } from '../../icon/UIIconAssets';
import RichTooltip from './RichTooltip';
import UIBox from '../../layout/UIBox';

const Item = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex: none;
    flex-shrink: 0;
    min-width: 28px;
    align-self: stretch;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    height: 28px;
    list-style: none;
    cursor: pointer;

    > div:nth-child(1) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: none;
        width: 24px;
        height: 24px;
        margin-right: 4px;

        svg {
            max-width: 16px;
            max-height: 16px;
            * {
                transition: fill ${Tween.duration}s ${Tween.ease};
                fill: ${ThemeColor.grey104};
            }
        }
    }

    > span {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        align-self: stretch;
        flex: 1;
        height: 24px;
        margin-right: 8px;
        h4 {
            margin: 0px;
            padding: 0px;
            font-weight: ${FontWeight.bold};
            font-size: ${FontSize.sm};
            line-height: ${LineHeight.md};
            letter-spacing: ${LetterSpacing.md};
            color: ${ThemeColor.grey104};
            transition: color ${Tween.duration}s ${Tween.ease};
        }
    }

    &:hover {
        div {
            svg {
                * {
                    fill: ${ThemeColor.danger};
                }
            }
        }
        h4 {
            color: ${ThemeColor.danger};
        }
    }
`;

interface IProps {
    className?: string;
    id?: string;
    children?: ReactElement;
    anchorEl: any;
    onClose?: () => void;
    onChange?: (x) => void;
    anchorOrigin?: any;
    transformOrigin?: any;
    width?: number;
    padding?: Array<number>;
    margin?: Array<number>;
    borderRadius?: Array<number>;
    target: any;
}

const ScheduleDetailsMenu: FC<IProps> = (props) => {
    const { id, children, anchorEl, onClose, onChange, anchorOrigin, transformOrigin, width, padding, margin, borderRadius } = props;

    const [open, setOpen] = useState(Boolean(anchorEl));

    const onItemClick = (x) => {
        onChange(x);
        onClose();
    };

    const createContent = () => {
        return (
            <UIBox direction="column">
                <Item key={`${id}-menu-content-${0}`} onClick={(e) => {}} role="button" hasIcon>
                    <span>
                        <h4>Mon, 11, June</h4>
                    </span>
                    <div>
                        <CalendarIcon />
                    </div>
                </Item>
                <Item key={`${id}-menu-content-${1}`} onClick={(e) => {}} role="button" hasIcon>
                    <span>
                        <h4>07:00am-08:00am</h4>
                    </span>
                    <div>
                        <TimeIcon />
                    </div>
                </Item>
                <Item key={`${id}-menu-content-${2}`} onClick={(e) => {}} role="button" hasIcon>
                    <span>
                        <h4>School Schedule</h4>
                    </span>
                    <div>
                        <CalendarIcon />
                    </div>
                </Item>
            </UIBox>
        );
    };

    return (
        <RichTooltip
            // ---
            open={Boolean(anchorEl)}
            onClose={() => onClose()}
            placement="right"
            anchorEl={anchorEl}
        >
            {createContent()}
        </RichTooltip>
    );
};

// 'auto-end'
// | 'auto-start'
// | 'auto'
// | 'bottom-end'
// | 'bottom-start'
// | 'bottom'
// | 'left-end'
// | 'left-start'
// | 'left'
// | 'right-end'
// | 'right-start'
// | 'right'
// | 'top-end'
// | 'top-start'
// | 'top'

ScheduleDetailsMenu.defaultProps = {
    onClose: () => {},
    onChange: (x) => {},
    anchorOrigin: { vertical: 'center', horizontal: 20 },
    transformOrigin: { vertical: 'top', horizontal: 'left' },
    width: 180,
    padding: [12, 15],
    margin: [0],
    borderRadius: [10],
    target: { width: 20 },
};

export default ScheduleDetailsMenu;
