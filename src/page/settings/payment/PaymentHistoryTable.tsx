import React, { FC, useState } from 'react';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import UIBox from '../../../ui-kit/layout/UIBox';
import UISpacer from '../../../ui-kit/core/UISpacer';
import PaymentHistoryItems from './PaymentHistoryItems';
import PaymentHistoryItemsMobile from './PaymentHistoryItemsMobile';
import { FontSize } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';
import { Device } from '../../../settings/Device';

const Wrapper = styled.table<Partial<IProps>>`
    width: 100%;
    color: ${ThemeColor.subtitle};
    font-weight: 400 !important;
    border-collapse: seperate;
    border-spacing: 0;
    td,
    th {
        border-bottom: 0.5px solid ${ThemeColor.tableBorder};
        text-align: start;
        padding: 23px;
        padding-left: 0;
    }
    td:nth-child(6) {
        text-align: center;
    }
    > div:nth-child(1) {
        width: 100%;
    }
`;

const Desktop = styled.thead`
    > tr td {
        color: ${ThemeColor.title};
        font-size: ${FontSize.lg};
    }
`;

const Tbody = styled.tbody``;

const Data = [
    {
        date: 'Sept.08.2021',
        amount: '$29445.00',
        name: 'Mark Otto',
        course: 'ECON 101',
        skills: 'Economic & Maths',
        methods: 'mastercard',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
    },
    {
        date: 'Sept.08.2021',
        amount: '$29445.00',
        name: 'Mark Otto',
        course: 'ECON 101',
        skills: 'Economic & Maths',
        methods: 'applepay',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
    },
    {
        date: 'Sept.08.2021',
        amount: '$2.00',
        name: 'Mark Otto',
        course: 'ECON 101rter',
        skills: 'Economic & Maths',
        methods: 'mastercard',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
    },
    {
        date: 'Sept.08.2021',
        amount: '$294544.00',
        name: 'Mark Otto',
        course: 'ECON 101 Mathmatic',
        skills: 'Economic & Maths',
        methods: 'applepay',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
        '& .MuiPaginationItem-icon': {
            backgroundColor: `${ThemeColor.second}`,
            borderRadius: '50%',
        },
        '& svg': {
            fill: `${ThemeColor.secondDark}`,
        },
        '& .MuiPaginationItem-root': {
            color: `${ThemeColor.subtitle}`,
        },
    },
}));

interface IProps {
    className?: string;
    id?: string;
    style?: any;
}

const PaymentHistoryTable: FC<IProps> = (props) => {
    const { id, style } = props;
    const [list] = useState(Data);
    const classes = useStyles();

    const [width, setWidth] = useState<number>(document.body.clientWidth);

    React.useEffect(() => {
        const resizeWidth = (event) => {
            setWidth(document.body.clientWidth);
        };

        window.addEventListener('resize', resizeWidth);

        // cleanup this component
        return () => {
            window.removeEventListener('resize', resizeWidth);
        };
    }, []);

    return (
        <>
            <Wrapper id={id} style={style}>
                {width >= Device.tablet + 75 && (
                    <Desktop>
                        <tr>
                            <td>Date</td>
                            <td>Amount</td>
                            <td>Student</td>
                            <td>Course</td>
                            <td>Duration</td>
                            <td>Details</td>
                        </tr>
                    </Desktop>
                )}
                <Tbody>
                    {list && list.length > 0 && width >= Device.tablet + 75 && list.map((x, i) => <PaymentHistoryItems date={x.date} name={x.name} avatar={x.avatar} amount={x.amount} course={x.course} methods={x.methods} skills={x.skills} />)}
                    {list && list.length > 0 && width < Device.tablet + 75 && list.map((x, i) => <PaymentHistoryItemsMobile date={x.date} name={x.name} avatar={x.avatar} amount={x.amount} course={x.course} methods={x.methods} skills={x.skills} />)}
                </Tbody>
                <UISpacer height={40}></UISpacer>
            </Wrapper>
            <UIBox justifyContent="center">
                <div className={classes.root}>
                    <Pagination count={10} siblingCount={0} boundaryCount={1} />
                </div>
            </UIBox>
        </>
    );
};

PaymentHistoryTable.defaultProps = {};

export default PaymentHistoryTable;
