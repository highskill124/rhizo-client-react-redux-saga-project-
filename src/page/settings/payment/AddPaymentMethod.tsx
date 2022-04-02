import React, { FC, useState } from 'react';
import styled from 'styled-components';
import UIBox from '../../../ui-kit/layout/UIBox';
import { FontSize, FontWeight, LineHeight, LetterSpacing } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';
import { CreditCardIcon, AccountWalletIcon, BankIcon } from '../../../ui-kit/icon/UIIconAssets';
import AddPaymentMethodItem from './AddPaymentMethodItem';

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
`;

const paymentMethodList = [
    {
        icon: CreditCardIcon,
        type: 'card',
        name: 'Credit/Debit Card',
        digits: 2222,
        validity: '17.06.2024',
        flow: 'in',
    },
    {
        icon: AccountWalletIcon,
        type: 'card',
        name: 'Link Bank Account',
        digits: 4455,
        validity: '17.06.2024',
        flow: 'out',
    },
    {
        icon: BankIcon,
        type: 'paypal',
        name: 'Apple/Google Pay',
        email: 'xyz@domain.com',
        flow: 'in',
    },
];

interface IProps {
    className?: string;
    id?: string;
    title?: string;
    style?: any;
    onClick?: (e) => void;
    paymentList: Array<any>;
    buttonAction?: boolean;
}

const AddPaymentMethod: FC<IProps> = (props) => {
    const { id, title, paymentList, style, onClick, buttonAction } = props;
    return (
        <Wrapper id={id} style={style}>
            <UIBox direction="column">
                {paymentList &&
                    paymentList.length > 0 &&
                    paymentList.map((x, i) => (
                        <UIBox>
                            <AddPaymentMethodItem
                                // ---
                                type={x.type}
                                name={x.name}
                                icon={<x.icon />}
                                digits={x.digits}
                                validity={x.validity}
                                email={x.email}
                                onClick={null || onClick}
                                buttonAction={buttonAction}
                            />
                        </UIBox>
                    ))}
            </UIBox>
        </Wrapper>
    );
};

AddPaymentMethod.defaultProps = {};

export default AddPaymentMethod;
