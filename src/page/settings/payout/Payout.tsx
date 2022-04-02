import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import UIForm from '../../../ui-kit/form/UIForm';
import UIButton from '../../../ui-kit/button/UIButton';
import UISpacer from '../../../ui-kit/core/UISpacer';
import UIBox from '../../../ui-kit/layout/UIBox';
import UIRadioField, { Label } from '../../../ui-kit/form/UIRadioField';
import UITextField from '../../../ui-kit/form/UITextField';
import UIHeading from '../../../ui-kit/core/UIHeading';
import UICustomModal from '../../../ui-kit/core/UICustomModal';
import WithdrawPaymentMethodListing from '../withdraw/WithdrawPaymentMethodListing';
import WithdrawAddPaymentMethod from '../withdraw/WithdrawAddPayoutMethod';
import PayoutHistoryTable from './PayoutHistoryTable';
import UISelectField from '../../../ui-kit/form/UISelectField';
import UIContent from '../../../ui-kit/core/UIContent';
import Footer from '../../common/Footer';
import UICheckBox from '../../../ui-kit/form/UICheckBox';
import { FontSize } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';
import { LockIcon, QuestionIcon } from '../../../ui-kit/icon/UIIconAssets';
import { Device } from '../../../settings/Device';
import { Tween } from '../../../settings/Tween';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    flex: 1;
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
            td {
                font-size: 12px;
                padding-right: 7px;
            }
        }
    }
`;

const UISubtitle = styled.div`
    font-size: 14px;
    color: ${ThemeColor.subtitle};
`;

const UIBalance = styled.p`
    font-size: ${FontSize.xxxxl};
    color: ${ThemeColor.basicBlack};
    margin: 0;
`;

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    width: 270px;
    align-items: start;
    @media (max-width: ${Device.tablet}px) {
        zoom: 0.8;
    }
`;

const Button = styled.button`
    width: 100px;
    height: 36px;
    background-color: ${ThemeColor.second};
    color: ${ThemeColor.secondDark};
    font-size: ${FontSize.md};
    border-radius: 5px;
    border: none;
    transition: ${Tween.duration}s ${Tween.ease};
    &:hover {
        cursor: pointer;
        background-color: ${ThemeColor.secondMiddle};
    }
`;

const selectField = [
    { value: 'all', label: 'All' },
    { value: '5', label: '5' },
    { value: '10', label: '10' },
];

const buttonList = [
    { label: 'Tutor', value: 'tutor', icon: LockIcon },
    { label: 'Student', value: 'student' },
];

const methods = [
    { label: 'Saving', value: 'saving' },
    { label: 'Checking', value: 'checking' },
];

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    bankData?: any;
}

const Billing: FC<IProps> = (props) => {
    const { id, bankData } = props;
    const [profileType, setProfiletype] = useState(buttonList[0]);
    const [open, setOpen] = useState(false);
    const [openSecond, setOpenSecond] = useState(false);
    const [holder, setHolder] = useState('');
    const [bank, setBank] = useState('');
    const [accountHolder, setAccountHolder] = useState('');
    const [cardName, setCardName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

    // form events
    const onHolder = (e) => {
        setHolder(e.target.value);
    };

    const onBank = (e) => {
        setBank(e.target.value);
    };

    const onAccountHolder = (e) => {
        setAccountHolder(e.target.value);
    };

    const onCardName = (e) => {
        setCardName(e.target.value);
    };

    const onAccountNumber = (e) => {
        setAccountNumber(e.target.value);
    };

    const onProfileChange = (x) => {
        setProfiletype(x);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleFirstCancel = () => {
        setOpen(false);
        setHolder('');
        setAccountHolder('');
        setCardName('');
        setBank('');
        setAccountNumber('');
    };

    const handleNext = () => {
        setOpen(false);
        setOpenSecond(true);
    };

    const handleSecondCancel = () => {
        setOpenSecond(false);
        setOpen(true);
    };

    const handleSecondSave = () => {
        setOpenSecond(false);
    };

    const handleOnclose = () => {
        setOpenSecond(false);
        setOpen(false);
    };

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values: any) => {},
    });

    return (
        <Wrapper id={id} bankData={bankData}>
            <UIForm formik={formik} style={{ width: '100%' }}>
                <UISpacer height={50} />

                {/* YOUR EARNING BALANCE */}
                <UIHeading header="Your Earning" subheader="Edit or delete your current saved payment methods."></UIHeading>
                <UISpacer height={25} />
                <UIBox>
                    <UIBalance>${bankData.balance.toFixed(2)}</UIBalance>
                    <UISpacer width={50}></UISpacer>
                    <Button color="second">Withdraw</Button>
                </UIBox>
                <UISpacer height={20} />
                <UISubtitle>Widthdraw to default method: Bank Account {bankData.bankAccount}</UISubtitle>

                <UISpacer height={40}></UISpacer>
                <UIBox alignItems="flex-start" direction="column" padding={[16, 0, 25, 0]} flex style={{ width: '60%' }}>
                    <UIBox alignItems="flex-start" direction="column" flex>
                        {/* WITHDRAW PAYOUT METHOD */}
                        <WithdrawPaymentMethodListing title="Saved Payout Methods" style={{ width: '100%' }} />
                        <UISpacer height={50} />

                        {/* ADD PAYOUT METHOD PART */}
                        <UIHeading header="Add payout methods" subheader="Add, edit or delete your saved payment information"></UIHeading>
                        <WithdrawAddPaymentMethod title="Add Payout Methods" style={{ width: '100%' }} onClick={handleOpen} />

                        {/* ADD NEW PAYMENT METHOD MODAL */}
                        <UICustomModal id="addPayment" open={open} title="Add Payout Method" onClose={handleFirstCancel} onBack={handleFirstCancel} onSave={handleNext} subButtonLabel="Cancel" mainButtonLabel="Next">
                            <UIRadioField name="Select account type" options={methods} label="Select account type" />
                            <Label>Account holder name</Label>
                            <UITextField id="holdername" name="holdername" style={{ width: '100%' }} placeholder="" value={holder} onChange={onHolder} />
                            <Label>Bank Name</Label>
                            <UITextField id="bankname" name="bankname" style={{ width: '100%' }} placeholder="" value={bank} onChange={onBank} />
                            <UIBox justifyContent="space-between" style={{ flexWrap: 'wrap' }}>
                                <UIBox direction="column" style={{ width: '47%' }}>
                                    <Label>Institution Number</Label>
                                    <UITextField id="cardName" name="cardName" style={{ width: '100%' }} placeholder="" value={accountHolder} onChange={onAccountHolder} />
                                </UIBox>
                                <UISpacer width={5}></UISpacer>
                                <UIBox direction="column" style={{ width: '47%' }}>
                                    <UIBox alignItems="center">
                                        <Label>Transist Number</Label>
                                        <UISpacer width={5}></UISpacer>
                                        <QuestionIcon />
                                    </UIBox>
                                    <UITextField id="cardName" name="cardName" style={{ width: '100%' }} placeholder="" value={cardName} onChange={onCardName} />
                                </UIBox>
                            </UIBox>
                            <UIBox alignItems="center">
                                <Label>Account number</Label>
                                <UISpacer width={5}></UISpacer>
                                <QuestionIcon />
                            </UIBox>
                            <UITextField id="cardName" name="cardName" style={{ width: '100%' }} placeholder="" value={accountNumber} onChange={onAccountNumber} />
                            <UISpacer height={10}></UISpacer>
                            <UIBox justifyContent="end">
                                <UICheckBox id="default" name="default" label="Set as default?" checked />
                            </UIBox>
                        </UICustomModal>

                        {/* PAYOUT ADDRESS MODAL */}
                        <UICustomModal id="addPayment" open={openSecond} title="Add Payout Method" onBack={handleSecondCancel} onSave={handleSecondSave} onClose={handleOnclose} subButtonLabel="Back" mainButtonLabel="Save">
                            <UIContent style={{ width: '80%' }} content="Configure the derfault institution taht you log in to as a studetn. You can change institutions manually, too." />
                            <UISpacer height={5}></UISpacer>
                            <Label>Street Address</Label>
                            <UITextField id="streetAddress" name="streetAddress" style={{ width: '100%' }} placeholder="" />
                            <Label>Apt, suite, bldg.(optional)</Label>
                            <UITextField id="cardName" name="cardName" style={{ width: '100%' }} placeholder="" />
                            <UIBox justifyContent="space-between" style={{ flexWrap: 'wrap' }}>
                                <UIBox direction="column" style={{ width: '47%' }}>
                                    <Label>City</Label>
                                    <UITextField id="cardName" name="cardName" style={{ width: '100%' }} placeholder="" />
                                </UIBox>
                                <UIBox direction="column" style={{ width: '47%' }}>
                                    <Label>State</Label>
                                    <UITextField id="cardName" name="cardName" style={{ width: '100%' }} placeholder="" />
                                </UIBox>
                            </UIBox>
                            <Label>Zipcode</Label>
                            <UITextField id="cardName" name="cardName" style={{ width: '100%' }} placeholder="" />
                            <UISpacer height={10}></UISpacer>
                            <UIBox justifyContent="end">
                                <UICheckBox id="default" name="default" label="Set as default?" checked />
                            </UIBox>
                        </UICustomModal>

                        <UISpacer height={20} />
                    </UIBox>
                    <UISpacer height={40} />
                </UIBox>
                <UIHeading header="Payment History" subheader="Update your personal information" style={{ width: '100%' }} download={true}>
                    <Div style={{ width: '260px' }}>
                        <UIButton color="basicline">Download CSV</UIButton>
                        <UISpacer width={5}></UISpacer>
                        <UISelectField id="all" name="all" options={selectField} />
                    </Div>
                </UIHeading>
                <UISpacer height={25}></UISpacer>
                {/* PAYOUT HISTORY TABLE */}
                <PayoutHistoryTable />
            </UIForm>
            <UISpacer height={80}></UISpacer>
            <Footer />
        </Wrapper>
    );
};

Billing.defaultProps = {};

export default Billing;
