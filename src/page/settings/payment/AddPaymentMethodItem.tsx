import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Tween } from '../../../settings/Tween';
import UIButtonBase from '../../../ui-kit/button/UIButtonBase';
import { BinIcon, EditIcon, ClipboardCheckIcon, ArrowRightIcon } from '../../../ui-kit/icon/UIIconAssets';
import UIMenu from '../../../ui-kit/navigation/menu/UIMenu';
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
    border-bottom: 1px solid ${ThemeColor.border};
    align-self: stretch;
    align-items: center;
    margin: 0px 0px 0px 0px;
    padding: 24px 0px;
    background: ${ThemeColor.white};
    box-sizing: border-box;
    flex: none;
    align-self: stretch;
    flex-grow: 0;
    &:hover{
        cursor: pointer;
    }

    > div:nth-child(1) {
        width: 48px;
        /* height: 36px; */
        display: flex;
        align-items: center;
        img {
            width: 100%;
            height: auto;
        }
    }

    > div:nth-child(2) {
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

    > div:nth-child(3) {
        display: inline-flex;
        flex-direction: row;
        justify-content: flex-end;
        > button {
            width: 30px;
            height: 30px;
            padding: 6px;
            border-radius: 50%;
            background-color: ${ThemeColor.second};

            &:hover {
                background-color: ${ThemeColor.second};
                svg {
                        fill: ${ThemeColor.secondDark};
                    }
                }
            }

            svg {
                    transition: fill ${Tween.duration}s ${Tween.ease};
                    fill: ${ThemeColor.secondDark};
                }
            }
        }
    }
`;

interface IProps {
    className?: string;
    id?: string;
    icon: ReactNode;
    type?: string;
    name?: string;
    email?: string;
    digits?: string | number;
    validity?: string;
    style?: any;
    onClick?: (e) => void;
    buttonAction?: boolean;
}

const PaymentMethodItem: FC<IProps> = (props) => {
    const { id, icon, type, name, digits, validity, email, style, onClick, buttonAction } = props;
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [parent, setParent] = useState(false);

    const menuList = [
        { label: 'Make default', value: 'makeDefault', icon: ClipboardCheckIcon },
        { label: 'Edit', value: 'Edit', icon: EditIcon },
        { label: 'Remove', value: 'remove', icon: BinIcon },
    ];

    const renderCard = () => {
        return (
            <div>
                <h4>{name}</h4>
            </div>
        );
    };

    const renderPaypal = () => {
        return (
            <div>
                <h4>{`${name}`}</h4>
            </div>
        );
    };

    return (
        <Wrapper id={id} type={type} style={style} onClick={parent ? null : onClick}>
            <div>{icon}</div>
            {type === 'card' ? renderCard() : null}
            {type === 'paypal' ? renderPaypal() : null}
            <div>
                <UIButtonBase
                    onClick={(e) => {
                        if (buttonAction) {
                            e.stopPropagation();
                            e.preventDefault();
                            setParent(true);
                            setMenuAnchorEl(e.target);
                        }
                    }}
                >
                    <ArrowRightIcon />
                </UIButtonBase>
            </div>
            <UIMenu
                list={menuList}
                anchorEl={menuAnchorEl}
                onClose={() => {
                    setMenuAnchorEl(null);
                    setParent(false);
                }}
            />
        </Wrapper>
    );
};

PaymentMethodItem.defaultProps = {
    buttonAction: true,
};

export default PaymentMethodItem;
