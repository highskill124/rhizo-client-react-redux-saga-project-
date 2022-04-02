import React, { FC, ReactNode, useState } from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';
import UIForm from '../../ui-kit/form/UIForm';
import UIButton from '../../ui-kit/button/UIButton';
import UISpacer from '../../ui-kit/core/UISpacer';
import UIBox from '../../ui-kit/layout/UIBox';
import PaymentMethodListing from './payment/PaymentMethodListing';
import AddPaymentMethod from './payment/AddPaymentMethod';
import PaymentHistoryTable from './payment/PaymentHistoryTable';
import UICustomModal from '../../ui-kit/core/UICustomModal';
import UITextField from '../../ui-kit/form/UITextField';
import UIHeading from '../../ui-kit/core/UIHeading';
import UISelectField from '../../ui-kit/form/UISelectField';
import UIDatePicker from '../../ui-kit/form/UIDatePicker';
import UICheckBox from '../../ui-kit/form/UICheckBox';
import { LockIcon, QuestionIcon, VisaIcon, MastercardIcon, PaypalIcon, CreditCardIcon, AccountWalletIcon, BankIcon } from '../../ui-kit/icon/UIIconAssets';
import { Device } from '../../settings/Device';
import Footer from '../../page/common/Footer';
import { Label } from '../../ui-kit/form/UIRadioField';

const Wrapper = styled.div<Partial<IProps>>`
    display: block;
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    flex: 1;
    /* padding: 0px 25px 0px 25px; */
    padding: 0px;
    @media (max-width: ${Device.laptop - 1}px) {
        padding: 0px 3px;
        > form {
            > div {
                width: 100% !important;
            }
        }
    }
    @media (max-width: ${Device.laptop - 1}px) and (min-width: ${Device.tablet}px) {
        table {
            td{
                font-size: 12px;
                padding-right: 7px;
            }
            td:nth-child(3) > div > div:nth-child(1){
                width: 30px;
                height: 30px;
                flex-shrink: 0;
            }
        }
    }
    @media (max-width: ${Device.mobileMedium - 1}px) and (min-width: ${Device.mobileSmall}px) {
        > form > div:last-child{
         zoom: 0.9;
     }
`;

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    width: 270px;
    @media (max-width: ${Device.tablet}px) {
        zoom: 0.8;
    }
`;

const CardNumber = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    align-items: center;
    > div:nth-child(1) {
        width: 70%;
    }
    > div:nth-child(2) {
        width: 30%;
    }
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    align-items: center;
    >div: nth-child(1) {
        width: 50%;
    }
    >div: nth-child(2) {
        width: 50%;
    }
`;

const UIDiv = styled.div``;

const selectField = [
    { value: 'all', label: 'All' },
    { value: '5', label: '5' },
    { value: '10', label: '10' },
];

const buttonList = [
    { label: 'Tutor', value: 'tutor', icon: LockIcon },
    { label: 'Student', value: 'student' },
];

const paymentMethodList = [
    {
        icon: VisaIcon,
        type: 'card',
        name: 'Visa',
        digits: 2222,
        validity: '17.06.2024',
        flow: 'in',
    },
    {
        icon: MastercardIcon,
        type: 'card',
        name: 'Mastercard',
        digits: 4455,
        validity: '17.06.2024',
        flow: 'out',
    },
    {
        icon: PaypalIcon,
        type: 'paypal',
        name: 'PayPal',
        email: 'xyz@domain.com',
        flow: 'in',
    },
];

const PaymenttMethodList = [
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
    children?: ReactNode;
}

const Billing: FC<IProps> = (props) => {
    const { id } = props;

    const [openPayment, setOpenPayment] = React.useState(false);

    const handlePayment = (event) => {
        event.preventDefault();
        setOpenPayment(true);
    };

    const handlePaymentClose = () => {
        setOpenPayment(false);
    };

    const [profileType, setProfiletype] = useState(buttonList[0]);

    const onProfileChange = (x) => {
        setProfiletype(x);
    };

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values: any) => {},
    });

    return (
        <Wrapper id={id}>
            <UIForm formik={formik} style={{ width: '100%' }}>
                <UISpacer height={50}></UISpacer>
                <PaymentMethodListing title="Saved Payment Methods" paymentList={paymentMethodList} selectable={false} buttonAction={true} style={{ width: '60%' }} />
                <UISpacer height={50} />
                <UIHeading header="Add New Payment Method" subheader="Add, edit or delete your saved payment method" style={{ width: '60%' }}></UIHeading>

                {/* Add new payment method modal */}
                <UICustomModal id="addPayment" onClose={handlePaymentClose} onBack={handlePaymentClose} onSave={handlePaymentClose} open={openPayment} title="Add Payment Method" subButtonLabel="Cancel" mainButtonLabel="Save">
                    <Label>Name on card</Label>
                    <UITextField id="cardName" name="cardName" style={{ width: '100%' }} placeholder="Name on card" />
                    <CardNumber>
                        <UIBox direction="column">
                            <Label>Card number</Label>
                            <UITextField id="cardNumber" placeholder="xxxx xxxx xxxx xxxx" name="cardNumber" icon={VisaIcon} />
                        </UIBox>
                        <UIBox direction="column">
                            <UIBox alignItems="center">
                                <Label>CVC</Label>
                                <UISpacer width={10}></UISpacer>
                                <QuestionIcon />
                            </UIBox>
                            <UITextField id="cvc" name="cvc" placeholder="CVC" />
                        </UIBox>
                    </CardNumber>
                    <Container>
                        <UIDiv>
                            <UIBox alignItems="center">
                                <Label>Expiration</Label>
                                <UISpacer width={10}></UISpacer>
                                <QuestionIcon />
                            </UIBox>
                            <UIDatePicker id="expire" name="expire" />
                        </UIDiv>
                        <UIDiv>
                            <Label>Zipcode</Label>
                            <UITextField id="zipcode" name="zipcode" placeholder="zipcode" />
                        </UIDiv>
                    </Container>
                    <UIBox justifyContent="end">
                        <UICheckBox id="default" name="default" label="Set as default?" checked />
                    </UIBox>
                </UICustomModal>

                {/* ADD PAYMENT METHOD */}
                <AddPaymentMethod style={{ width: '60%' }} paymentList={PaymenttMethodList} onClick={handlePayment} />

                <UISpacer height={40} />
                <UIHeading header="Payment History" subheader="Hiere are your transactions." download={true}>
                    <Div style={{ width: '270px' }}>
                        <UIButton color="basicline">Download CSV</UIButton>
                        <UISpacer width={5}></UISpacer>
                        <UISelectField id="all" name="all" options={selectField} />
                    </Div>
                </UIHeading>
                <UISpacer height={20} />
                <PaymentHistoryTable />
            </UIForm>
            <UISpacer height={80}></UISpacer>
            <Footer />
        </Wrapper>
    );
};

Billing.defaultProps = {};

export default Billing;
