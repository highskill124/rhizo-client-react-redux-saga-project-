import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Tween } from '../../../settings/Tween';
import UIButtonBase from '../../../ui-kit/button/UIButtonBase';
import { BinIcon, EditIcon, HMorelIcon, ClipboardCheckIcon, ArrowRightIcon } from '../../../ui-kit/icon/UIIconAssets';
import UIMenu from '../../../ui-kit/navigation/menu/UIMenu';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';
import UIButton from '../../../ui-kit/button/UIButton';
import UISpacer from '../../../ui-kit/core/UISpacer';

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

    > div:nth-child(1) {
        width: 48px;
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
            color: ${ThemeColor.messages};
            line-height: ${LineHeight.md};
            letter-spacing: ${LetterSpacing.md};
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
            transform: rotate(90deg);
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
        background-color: ${ThemeColor.contentLight};
        border-radius: 4px;
        margin: 0px 1px;
    }
`;

const Details = styled.div`
    display: flex;
    align-items: center;
    p {
        font-size: ${FontSize.sm};
        color: ${ThemeColor.contentLight};
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
    state?: string;
}

const PaymentMethodItem: FC<IProps> = (props) => {
    const { id, icon, type, name, digits, validity, email, state, style } = props;
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);

    const menuList = [
        { label: 'Set default', value: 'makeDefault', icon: ClipboardCheckIcon },
        { label: 'Delete', value: 'delete', icon: BinIcon },
    ];

    const renderCard = () => {
        return (
            <div>
                <h4>
                    {name}
                    <UISpacer width={10} />
                    {state === 'default' && (
                        <UIButton color="basic" size="small">
                            Default
                        </UIButton>
                    )}
                </h4>
                <Details>
                    <p>{validity}</p>
                    <Separator>
                        <div />
                        <div />
                        <div />
                        <div />
                    </Separator>
                    <p>{digits}(USD)</p>
                </Details>
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
            <div>{icon}</div>
            {type === 'card' ? renderCard() : null}
            {type === 'paypal' ? renderPaypal() : null}
            <div>
                <UIButtonBase onClick={(e) => setMenuAnchorEl(e.target)}>
                    <HMorelIcon />
                </UIButtonBase>
            </div>
            <UIMenu list={menuList} anchorEl={menuAnchorEl} onClose={() => setMenuAnchorEl(null)} />
        </Wrapper>
    );
};

PaymentMethodItem.defaultProps = {};

export default PaymentMethodItem;
