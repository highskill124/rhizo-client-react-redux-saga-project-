import React, { FC } from 'react';
import { Menu } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { Tween } from '../../../settings/Tween';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';

const SMenu = styled(Menu)<any>`
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0px;

    & .MuiMenu-paper {
        box-shadow: none;
        background: ${ThemeColor.white};
        box-shadow: 0px 21px 73px rgba(0, 0, 0, 0.16);

        ${(props) => {
            return css`
                padding: ${props.padding ? props.padding.map((x) => `${x}px`).join(' ') : '0px'};
                margin: ${props.margin ? props.margin.map((x) => `${x}px`).join(' ') : '0px'};
                border-radius: ${props.borderRadius ? props.borderRadius.map((x) => `${x}px`).join(' ') : '0px'};
            `;
        }}
    }

    ul {
        display: inline-flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin: 0px;
        padding: 0px;
    }
`;

const MenuItem = styled.li<any>`
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex: none;
    min-width: ${(props) => props.width}px;
    flex-grow: 0;
    /* align-self: initial; */
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    height: 32px;
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
        flex: none;
        height: 24px;
        margin-right: 8px;
        h4 {
            margin: 0px;
            padding: 0px;
            font-weight: ${FontWeight.medium};
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
    anchorEl: any;
    list: Array<any>;
    onClose?: () => void;
    onChange?: (x) => void;
    anchorOrigin?: any;
    transformOrigin?: any;
    width?: number;
    padding?: Array<number>;
    margin?: Array<number>;
    borderRadius?: Array<number>;
}

const UIHeaderMenu: FC<IProps> = (props) => {
    const { id, anchorEl, onClose, onChange, list, anchorOrigin, transformOrigin, width, padding, margin, borderRadius } = props;
    // const onClose = () => {};
    const onItemClick = (x) => {
        onChange(x);
        onClose();
    };
    return (
        <SMenu id={`${id}-menu`} anchorEl={anchorEl} getContentAnchorEl={null} anchorOrigin={anchorOrigin} transformOrigin={transformOrigin} keepMounted open={Boolean(anchorEl)} onClose={onClose} padding={padding} margin={margin} borderRadius={borderRadius}>
            {/* <UIBox direction="column"> */}
            {list &&
                list.length &&
                list.map((m, i) => (
                    <MenuItem key={`${id}-menu-content-${i}`} onClick={(e) => onItemClick(m)} role="button" hasIcon={m.icon} width={width}>
                        {m.icon && (
                            <div>
                                <m.icon />
                            </div>
                        )}
                        <span>
                            <h4>{m.label}</h4>
                        </span>
                    </MenuItem>
                ))}
            {/* </UIBox> */}
        </SMenu>
    );
};

UIHeaderMenu.defaultProps = {
    onClose: () => {},
    onChange: (x) => {},
    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
    transformOrigin: { vertical: 'top', horizontal: 'right' },
    width: 180,
    padding: [12, 15],
    margin: [0],
    borderRadius: [10],
};

export default UIHeaderMenu;
