import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Radio } from '@material-ui/core';
import UIButtonBase from '../../../ui-kit/button/UIButtonBase';
import UIMenu from '../../../ui-kit/navigation/menu/UIMenu';
import { Tween } from '../../../settings/Tween';
import { BinIcon, EditIcon, HMorelIcon, ClipboardCheckIcon } from '../../../ui-kit/icon/UIIconAssets';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-start;
    align-items: ${(props) => (props.type === 'card' ? 'flex-start' : 'center')};
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    align-items: center;
    margin: 0px 0px 0px 0px;
    padding: 24px 0px;
    background: ${ThemeColor.white};
    box-sizing: border-box;
    flex: none;
    align-self: stretch;
    flex-grow: 0;

    > div:nth-child(2) {
        width: 48px;
        display: flex;
        align-items: center;
        img {
            width: 100%;
            height: auto;
        }
    }

    > div:nth-child(3) {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: flex-start;
        align-items: flex-start;
        margin-left: 15px;

        > h4 {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-style: normal;
            font-weight: ${FontWeight.regular};
            font-size: 15px;
            line-height: ${LineHeight.md};
            letter-spacing: ${LetterSpacing.md};
            color: ${ThemeColor.messages};
            margin: 0px;
            height: 20px;
        }
        > span {
            font-style: normal;
            font-weight: ${FontWeight.regular};
            font-size: ${FontSize.sm};
            line-height: ${LineHeight.md};
            letter-spacing: ${LetterSpacing.md};
            color: ${ThemeColor.grey104};
            margin: 3px 0px;
        }
    }

    > div:nth-child(4) {
        display: inline-flex;
        flex-direction: row;
        justify-content: flex-end;
        transform: rotate(90deg);

        > button {
            width: 30px;
            height: 30px;
            padding: 6px;
            border-radius: 50%;
            background-color: #fafafe;

            &:hover {
                background-color: #fafafe;
                svg {
                    * {
                        fill: ${ThemeColor.subtitle};
                    }
                }
            }

            svg {
                * {
                    transition: fill ${Tween.duration}s ${Tween.ease};
                    fill: ${ThemeColor.subtitle};
                }
            }
        }
    }
`;

const Separator = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 20px;
    margin: 0px 4px;

    > div {
        width: 4px;
        height: 4px;
        background-color: ${ThemeColor.grey45};
        border-radius: 4px;
        margin: 0px 1px;
    }
`;
interface IProps {
    className?: string;
    id?: string;
    icon: ReactNode;
    type: string;
    name: string;
    email?: string;
    digits?: string | number;
    validity?: string;
    style?: any;
    selectable?: boolean;
    onChangeRadio?: (x: any) => void;
    buttonAction?: boolean;
}

const PaymentMethodItem: FC<IProps> = (props) => {
    const { id, icon, type, name, digits, validity, email, style, selectable, buttonAction, onChangeRadio } = props;
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);

    const menuList = [
        { label: 'Make default', value: 'makeDefault', icon: ClipboardCheckIcon },
        { label: 'Edit', value: 'Edit', icon: EditIcon },
        { label: 'Remove', value: 'remove', icon: BinIcon },
    ];

    const renderCard = () => {
        return (
            <div>
                <h4>
                    {name}
                    <Separator>
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                    </Separator>
                    {digits}
                </h4>
                <span>{`Validity period: ${validity}`}</span>
            </div>
        );
    };

    const renderPaypal = () => {
        return (
            <div>
                <h4>{`${name} (${email})`}</h4>
            </div>
        );
    };

    return (
        <Wrapper id={id} type={type} style={style}>
            {selectable ? <Radio /> : <div></div>}
            <div>{icon}</div>
            {type === 'card' ? renderCard() : null}
            {type === 'paypal' ? renderPaypal() : null}
            {buttonAction && (
                <div>
                    <UIButtonBase onClick={(e) => setMenuAnchorEl(e.target)}>
                        <HMorelIcon />
                    </UIButtonBase>
                </div>
            )}
            <UIMenu list={menuList} anchorEl={menuAnchorEl} onClose={() => setMenuAnchorEl(null)} />
        </Wrapper>
    );
};

PaymentMethodItem.defaultProps = {
    buttonAction: true,
};

export default PaymentMethodItem;
