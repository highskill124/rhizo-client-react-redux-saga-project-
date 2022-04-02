import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import UIBox from '../../../ui-kit/layout/UIBox';
import UIButton from '../../../ui-kit/button/UIButton';
import UISpacer from '../../../ui-kit/core/UISpacer';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';

const Wrapper = styled.tr<Partial<IProps>>`
    color: ${ThemeColor.subtitle};
    font-weight: ${FontWeight.regular};

    > td:nth-child(5) {
        > div {
            width: 80px;
            margin: 0 auto;
            height: 30px;
            > button {
                width: 80px;
                span {
                    font-weight: ${FontWeight.regular} !important;
                    font-size: ${FontSize.xxs}!important;
                }
            }
        }
    }
`;
interface IProps {
    className?: string;
    id?: string;
    date: string;
    destination: string;
    amount: number;
    accountId?: string;
    style?: any;
}

const PayoutHistoryItems: FC<IProps> = (props) => {
    const { id, date, destination, amount, style, accountId } = props;

    return (
        <Wrapper id={id} style={style}>
            <td>{id}</td>
            <td>${amount.toFixed(2)}</td>
            <td>
                <UIBox alignItems="center">
                    <img src={require(`../../../media/image/png/${destination}.png`)} alt="payment" />
                    <UISpacer width={23}></UISpacer>
                    <div style={{ textAlign: 'start' }}>
                        <div>{destination}</div>
                        {accountId && <div>{accountId}</div>}
                    </div>
                </UIBox>
            </td>
            <td>{date}</td>
            <td>
                <UIButton color="basicline" size="small">
                    View
                </UIButton>
            </td>
        </Wrapper>
    );
};

PayoutHistoryItems.defaultProps = {};

export default PayoutHistoryItems;
