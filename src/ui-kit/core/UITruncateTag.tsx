import React, { FC, ReactNode, useEffect, useState } from 'react';
import Button from '@mui/material/Button';

import styled from 'styled-components';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Device } from '../../settings/Device';
import UIButtonBase from '../button/UIButtonBase';
import UISpacer from './UISpacer';
import UIButton from '../button/UIButton';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import { PlusIcon } from '../icon/UIIconAssets';
import UIBox from '../layout/UIBox';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    align-self: initial;
    flex-wrap: wrap;
    /* max-width: 50%; */
    overflow: hidden;
    align-self: stretch;
`;

const MoreButtonWrapper = styled.div<any>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    border-radius: 10px;
    margin: 0px 5px;
    @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
        margin: 0px 3px;
    }
    @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
        margin: 0px 3px;
    }

    > button {
        width: 24px;
        height: 24px;
        border-radius: 10px;
        background-color: ${ThemeColor.second};
        width: auto;
        height: 20px;
        cursor: pointer;
        font-style: normal;
        font-weight: ${FontWeight.medium};
        font-size: ${FontSize.xs};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.secondDark};
        padding: 0px 8px;
        &:hover {
            background-color: ${ThemeColor.second};
        }
        svg {
            width: 8px;
            * {
                fill: ${ThemeColor.secondDark};
            }
        }
    }
`;

const Tag = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 7px 3px;
    min-height: 20px;
    background: ${ThemeColor.second};
    border-radius: 10px;
    flex: none;
    flex-grow: 0;
    font-style: normal;
    font-weight: ${FontWeight.regular};
    font-size: ${FontSize.xs};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.secondDark};
    flex: none;
    flex-grow: 0;
    margin-right: 5px;
    margin-bottom: 5px;
    max-width: 100%;
    text-overflow: ellipsis;
    flex-wrap: nowrap;
    /* white-space: nowrap; */
    @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
        margin-right: 2px;
        margin-bottom: 2px;
    }
    @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
        margin-right: 2px;
        margin-bottom: 2px;
    }
    svg {
        width: 8px;
        * {
            fill: ${ThemeColor.secondDark};
        }
    }
`;

const UIParent = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 250px;
    padding: 10px;
    > div {
        // flex: 1 0 33.33%;
    }
`;

interface IProps {
    className?: string;
    id?: string;
    max?: number;
    list?: Array<any>;
    children?: ReactNode;
}

const UITruncateTag: FC<IProps> = (props) => {
    const { id, max, list } = props;
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(null);
    const [popItems, setPopItems] = useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (list) {
            if (list.length > max) {
                setItems(list.slice(0, max));
                setPopItems(list.slice(max, list.length));
            } else if (list.length < max) {
                setItems(list);
            }
        }
    }, [list, max, open]);

    const opens = Boolean(anchorEl);
    const ids = open ? 'simple-popover' : undefined;

    return (
        <Wrapper id={id}>
            {items && items.length > 0 && items.map((x, i) => <Tag key={`${i}`}>{x.label}</Tag>)}
            {list && list.length > max && (
                <div>
                    <Tag aria-describedby={ids} variant="contained" onClick={handleClick}>
                        <PlusIcon />
                        {list.length - max}
                    </Tag>
                    <Popover
                        id={ids}
                        open={opens}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <UIParent>{popItems && popItems.map((x, i) => <Tag key={`${id}`}>{x.label}</Tag>)}</UIParent>
                    </Popover>
                </div>
            )}
        </Wrapper>
    );
};

UITruncateTag.defaultProps = {
    max: 3,
};

export default UITruncateTag;
