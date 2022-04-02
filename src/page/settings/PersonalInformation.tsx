import { useFormik } from 'formik';
import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import UIForm from '../../ui-kit/form/UIForm';
import UIButton from '../../ui-kit/button/UIButton';
import UISpacer from '../../ui-kit/core/UISpacer';
import UIBox from '../../ui-kit/layout/UIBox';
import UISelectField from '../../ui-kit/form/UISelectField';
import UITextFieldCustom from '../../ui-kit/form/UITextFieldCustom';
import UITextAreaField from '../../ui-kit/form/UITextAreaField';
import CourseList from '../../ui-kit/core/CourseList';
import EarningChart from './earning/EarningChart';
import EarningTable from './earning/EarningTable';
import UIHeading from '../../ui-kit/core/UIHeading';
import { FacebookIcon, TwitterIcon, InstagramIcon } from '../../ui-kit/icon/UIIconAssets';
import { ThemeColor } from '../../settings/ThemeColor';
import { Device } from '../../settings/Device';
import { courseList } from '../../util/mock-api/data/course-list';
import Footer from '../../page/common/Footer';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    flex: 1;
    padding: 0px;
    width: 100%;
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
            td:nth-child(3) > div > div:nth-child(1) {
                width: 30px;
                height: 30px;
                flex-shrink: 0;
            }
        }
    }
`;

const Currency = styled.div`
    height: 40px;
    width: 100px;
    border: 1px solid ${ThemeColor.border};
    border-radius: 10px 0 0 10px;
    color: ${ThemeColor.subtitle};
    padding: 12px;
    text-align: center;
    background-color: ${ThemeColor.basic};
`;

const UIDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    width: 270px;
    @media (max-width: ${Device.tablet}px) {
        zoom: 0.7;
        width: 200px;
    }
`;

const earning = [10, 20, 40, 15, 5, 53, 12, 38];

const date = ['text', 'text', 'text', 'text', 'text', 'text', 'text', 'text'];

const state = {
    series: [
        {
            name: 'earning',
            data: earning,
        },
    ],
    options: {
        colors: [`${ThemeColor.primary}`],
        chart: {
            height: 350,
            type: 'line',
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            shared: false,
            intersect: true,
        },
        grid: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'straight',
        },
        xaxis: {
            categories: date,
        },
    },
};

const initialProfile = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,k sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit,k sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const initialRate = '200';

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
}

const selectField = [
    { value: 'all', label: 'All' },
    { value: '5', label: '5' },
    { value: '10', label: '10' },
];

const PersonalInformation: FC<IProps> = (props) => {
    const [value, setValue] = useState(initialProfile);
    const [rate, setRate] = useState(initialRate);
    const [editState, setEditState] = useState(true);
    const [rateEditState, setRateEditState] = useState(true);

    // rate events
    const editRate = () => {
        setRateEditState(false);
    };

    const cancelEdit = () => {
        setRate(initialRate);
        setRateEditState(true);
    };

    const handleRate = (e) => {
        setRate(e.target.value);
    };

    const saveEdit = () => {
        setRateEditState(true);
        setRate(rate);
    };

    // profile events
    const handleProfile = () => {
        setEditState(false);
    };

    const handleSave = () => {
        setEditState(true);
    };

    const handleCancel = () => {
        setValue(initialProfile);
        setEditState(true);
    };

    const handleValue = (e: any) => {
        setValue(e.target.value);
    };

    const { id } = props;
    const formik = useFormik({
        initialValues: {},
        onSubmit: (values: any) => {},
    });
    return (
        <Wrapper id={id}>
            <UIForm formik={formik} style={{ width: '100%' }}>
                <UISpacer height={50}></UISpacer>

                {/* PERSONAL INFORMATION PART */}
                <UIHeading header="Personal Information" subheader="UPdate your personal information">
                    <UIButton color="basicline" size="small" onClick={editRate}>
                        Edit
                    </UIButton>
                </UIHeading>
                <UISpacer height={30}></UISpacer>
                <UIBox>
                    <UIBox direction="row" style={{ width: '200px' }}>
                        <Currency>USD</Currency>
                        <UITextFieldCustom id="price" name="price" value={rate} readOnly={rateEditState} onChange={handleRate} style={{ width: '100px', backgroundColor: `${ThemeColor.basic}`, borderRadius: '10px', borderBottomLeftRadius: '0', borderTopLeftRadius: '0' }} />
                    </UIBox>
                </UIBox>
                {!rateEditState && (
                    <UIBox>
                        <UIButton color="basic" onClick={cancelEdit}>
                            Cancel
                        </UIButton>
                        <UISpacer width={10}></UISpacer>
                        <UIButton color="second" onClick={saveEdit}>
                            Save
                        </UIButton>
                    </UIBox>
                )}

                {/* ABOUT YOU PART */}
                <UISpacer height={40}></UISpacer>
                <UIHeading header="About you" subheader="This information will be displayed on your public profile.">
                    <UIButton color="basicline" size="small" onClick={handleProfile}>
                        Edit
                    </UIButton>
                </UIHeading>
                <UISpacer height={30}></UISpacer>
                <UITextAreaField id="profile" name="profile" value={value} readOnly={editState} onChange={handleValue} style={{ width: '70%' }}></UITextAreaField>
                {!editState && (
                    <>
                        <UIBox alignItems="center">
                            <UIButton color="basic" onClick={handleCancel}>
                                Cancel
                            </UIButton>
                            <UISpacer width={10}></UISpacer>
                            <UIButton color="second" onClick={handleSave}>
                                Save
                            </UIButton>
                        </UIBox>
                    </>
                )}

                {/* SHARE PROFILE PART */}
                <UISpacer height={40} />
                <UIHeading header="Share your profile" subheader="Edit or delete your current saved payment methods"></UIHeading>
                <UISpacer height={30}></UISpacer>
                <UIBox direction="row">
                    <FacebookIcon />
                    <UISpacer width={15} />
                    <TwitterIcon />
                    <UISpacer width={15} />
                    <InstagramIcon />
                </UIBox>
                <UISpacer height={40}></UISpacer>

                {/*  YOUR COURSES PART  */}
                <UIHeading header="Your courses" subheader="Add, edit or delete your saved payment." style={{ width: '70%' }}>
                    <UIButton color="basicline" size="small">
                        Edit
                    </UIButton>
                </UIHeading>

                {/*  MAIN COURSE IMPORT PART  */}
                <CourseList list={courseList} style={{ width: '70%' }} />
                <UISpacer height={50}></UISpacer>

                {/* YOUR EARNING THIS MONTH CHART PART */}
                <UIHeading header="Your earning this month" subheader="Add, edit or delete your saved payment."></UIHeading>
                <EarningChart options={state.options} series={state.series} earning={earning} date={date} style={{ width: '100%' }} />

                {/* YOUR EARNING TABEL PART */}
                <UISpacer height={50}></UISpacer>
                <UIHeading header="Payment History" subheader="Update your personal information" download={true}>
                    <UIDiv>
                        <UIButton color="basicline">Download CSV</UIButton>
                        <UISpacer width={5}></UISpacer>
                        <UISelectField id="all" name="all" options={selectField} />
                    </UIDiv>
                </UIHeading>
                <UISpacer height={15}></UISpacer>
                <EarningTable />
            </UIForm>
            <UISpacer height={80}></UISpacer>
            <Footer />
        </Wrapper>
    );
};

PersonalInformation.defaultProps = {};

export default PersonalInformation;
