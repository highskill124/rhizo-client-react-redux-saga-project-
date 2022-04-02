import React, { FC, useState } from 'react';
import styled from 'styled-components';
import UIBox from '../../../ui-kit/layout/UIBox';
import UIHeading from '../../../ui-kit/core/UIHeading';
import WithdrawPaymentMethodItem from './WithdrawPaymentMethodItem';
import { BankIcon } from '../../../ui-kit/icon/UIIconAssets';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    > h4 {
        font-style: normal;
        font-weight: ${FontWeight.medium};
        font-size: ${FontSize.lg};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.grey45};
        margin: 15px 0px;
    }
    div:nth-child(3) {
        > div:last-child {
            border-bottom: 1px solid ${ThemeColor.border};
        }
    }
`;

const paymentMethodList = [
    {
        icon: BankIcon,
        type: 'card',
        name: 'Bank Account',
        digits: 2222,
        validity: 'Account',
        flow: 'in',
        state: 'default',
    },
    {
        icon: BankIcon,
        type: 'card',
        name: 'Bank Account',
        digits: 4455,
        validity: 'Account',
        flow: 'out',
        state: '',
    },
];

interface IProps {
    className?: string;
    id?: string;
    title: string;
    style?: any;
}

const WithdrawPaymentMethodListing: FC<IProps> = (props) => {
    const { id, title, style } = props;
    const [list] = useState(paymentMethodList);
    return (
        <Wrapper id={id} style={style}>
            <UIHeading header="Saved Payout Methods" subheader="Edit or delete saved payment methods."></UIHeading>
            <UIBox direction="column">
                {list &&
                    list.length > 0 &&
                    list.map((x, i) => (
                        <UIBox>
                            <WithdrawPaymentMethodItem type={x.type} name={x.name} icon={<x.icon />} digits={x.digits} validity={x.validity} state={x.state} />
                        </UIBox>
                    ))}
            </UIBox>
        </Wrapper>
    );
};

WithdrawPaymentMethodListing.defaultProps = {};

export default WithdrawPaymentMethodListing;
