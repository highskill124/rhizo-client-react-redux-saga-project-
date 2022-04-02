import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import UIBox from '../../../ui-kit/layout/UIBox';
import UIButton from '../../../ui-kit/button/UIButton';
import UISpacer from '../../../ui-kit/core/UISpacer';
import { ThemeColor } from '../../../settings/ThemeColor';
import { Device } from '../../../settings/Device';

const Mobile = styled.div`
    border-bottom: 1px solid ${ThemeColor.border};
    width: 100%;
    display: flex;
    padding: 15px;
    align-items: center;
    display: none;
    p {
        margin: 7px 0;
    }
    @media (max-width: ${Device.tablet - 1}px) and (min-width: ${Device.mobileSmall}px) {
        display: block;
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

const PaymentHistoryItemsMobile: FC<IProps> = (props) => {
    const { id, date, destination, amount, style, accountId } = props;

    return (
        <Mobile>
            <UIBox justifyContent="space-between" alignItems="center" style={{ width: '100%' }}>
                <div>{date}</div>
                <UIBox>
                    <UISpacer width={15}></UISpacer>
                    <div>${amount.toFixed(2)}</div>
                </UIBox>
            </UIBox>
            <UIBox justifyContent="end">Payout ID: {id}</UIBox>
            <UISpacer height={10}></UISpacer>
            <UIBox justifyContent="space-between" alignItems="center">
                <UIBox alignItems="center">
                    <UISpacer width={5}></UISpacer>
                    <UIBox>
                        <img src={require(`../../../media/image/png/${destination}.png`)} alt="payment" />
                        <UISpacer width={5}></UISpacer>
                        <div>
                            <div>{destination}</div>
                            {accountId && <div>{accountId}</div>}
                        </div>
                    </UIBox>
                </UIBox>
                <UISpacer width={10}></UISpacer>
                <div>
                    <UIButton color="basicline" size="small">
                        View
                    </UIButton>
                </div>
            </UIBox>
        </Mobile>
    );
};

PaymentHistoryItemsMobile.defaultProps = {};

export default PaymentHistoryItemsMobile;
