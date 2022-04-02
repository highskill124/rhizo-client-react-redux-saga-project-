import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { CreditCardIcon, BankIcon } from '../../../ui-kit/icon/UIIconAssets';
import UIBox from '../../../ui-kit/layout/UIBox';
import WithdrawAddPaymentMethodItem from './WithdrawAddPayoutMethodItem';
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

const payoutMethodList = [
    {
        icon: CreditCardIcon,
        type: 'card',
        name: 'Debit Card',
        digits: 2222,
        validity: '17.06.2024',
        flow: 'in',
    },
    {
        icon: BankIcon,
        type: 'paypal',
        name: 'Bank Account',
        email: 'xyz@domain.com',
        flow: 'in',
    },
];

interface IProps {
    className?: string;
    id?: string;
    title?: string;
    style?: any;
    onClick?: () => void;
}

const AddPaymentMethod: FC<IProps> = (props) => {
    const { id, title, style, onClick } = props;
    const [list] = useState(payoutMethodList);
    return (
        <Wrapper id={id} style={style}>
            <UIBox direction="column">
                {list &&
                    list.length > 0 &&
                    list.map((x, i) => (
                        <UIBox>
                            <WithdrawAddPaymentMethodItem
                                // ---
                                type={x.type}
                                name={x.name}
                                icon={<x.icon />}
                                digits={x.digits}
                                validity={x.validity}
                                email={x.email}
                                onClick={onClick}
                            />
                        </UIBox>
                    ))}
            </UIBox>
        </Wrapper>
    );
};

AddPaymentMethod.defaultProps = {};

export default AddPaymentMethod;
