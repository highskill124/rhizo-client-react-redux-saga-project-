import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { RadioGroup } from '@material-ui/core';
import { MastercardIcon, PaypalIcon, VisaIcon } from '../../../ui-kit/icon/UIIconAssets';
import UIBox from '../../../ui-kit/layout/UIBox';
import UIHeading from '../../../ui-kit/core/UIHeading';
import PaymentMethodItem from './PaymentMethodItem';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    // > h4 {
    //     font-style: normal;
    //     font-weight: ${FontWeight.medium};
    //     font-size: ${FontSize.lg};
    //     line-height: ${LineHeight.md};
    //     letter-spacing: ${LetterSpacing.md};
    //     color: ${ThemeColor.grey45};
    //     margin: 15px 0px;
    // }
`;

interface IProps {
    className?: string;
    id?: string;
    title?: string;
    style?: any;
    paymentList: Array<any>;
    selectable?: boolean;
    onChangeRadio?: (x: any) => void;
    buttonAction?: boolean;
}

const PaymentMethodListing: FC<IProps> = (props) => {
    const { id, title, style, paymentList, selectable, onChangeRadio, buttonAction } = props;
    const [value, setValue] = useState('');
    const onChange = (e: any) => {
        setValue(e.target.value);
    };
    return (
        <Wrapper id={id} style={style}>
            {title && <UIHeading header={title} subheader="Edit or delete your current saved payment methods."></UIHeading>}
            <UIBox direction="column">
                {paymentList &&
                    paymentList.length > 0 &&
                    paymentList.map((x, i) => (
                        <UIBox style={{ borderBottom: `1px solid ${ThemeColor.border}` }}>
                            <PaymentMethodItem type={x.type} name={x.name} icon={<x.icon />} digits={x.digits} validity={x.validity} email={x.email} selectable={selectable} buttonAction={buttonAction} style={{ height: '82px' }} />
                        </UIBox>
                    ))}
            </UIBox>
        </Wrapper>
    );
};

PaymentMethodListing.defaultProps = {};

export default PaymentMethodListing;
