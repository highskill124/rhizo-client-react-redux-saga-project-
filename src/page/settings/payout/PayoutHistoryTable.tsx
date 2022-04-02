import React, { FC, useState } from 'react';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import UIBox from '../../../ui-kit/layout/UIBox';
import UISpacer from '../../../ui-kit/core/UISpacer';
import PayoutHistoryItem from './PayoutHistoryItem';
import PayoutHistoryItemMobile from './PayoutHistoryItemMobile';
import { ThemeColor } from '../../../settings/ThemeColor';
import { Device } from '../../../settings/Device';
import { FontSize } from '../../../settings/Font';

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
        padding: 25px;
        padding-left: 0;
    }
    td:nth-child(5) {
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
    @media (max-width: ${Device.tablet - 1}px) {
        display: none;
    }
    div {
        width: 20%;
        text-align: start;
    }
    td,
    th {
        border-bottom: 0.5px solid ${ThemeColor.tableBorder};
        text-align: start;
        padding: 10px;
        padding-left: 0;
    }
    td:nth-child(6) {
        text-align: center;
    }
`;

const Tbody = styled.tbody``;

const Data = [
    {
        id: '#134',
        amount: 294,
        date: 'Sept.08.2021',
        destination: 'bank',
        accountId: 'Account ***333(USD)',
    },
    {
        id: '#134',
        amount: 294345454,
        date: 'Sept.08.2021',
        destination: 'bank',
        accountId: 'Account ***333(USD)',
    },
    {
        id: '#134',
        amount: 294454,
        date: 'Sept.08.2021',
        destination: 'mastercard',
    },
    {
        id: '#134',
        amount: 29,
        date: 'Sept.08.2021',
        destination: 'bank',
        accountId: 'Account ***333(USD)',
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
        '&.page-item': {
            '&:hover': {
                button: {
                    backgroundColor: 'green',
                    borderColor: 'green',
                },
            },
        },
    },
}));

interface IProps {
    className?: string;
    id?: string;
    style?: any;
}

const PayoutHistoryTable: FC<IProps> = (props) => {
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
                <Desktop>
                    <tr>
                        <td>Payout ID</td>
                        <td>Amount</td>
                        <td>Destination</td>
                        <td>Date</td>
                        <td>Actions</td>
                    </tr>
                </Desktop>
                <UISpacer height={20}></UISpacer>
                <Tbody>
                    {list && list.length > 0 && width >= Device.tablet && list.map((x, i) => <PayoutHistoryItem date={x.date} id={x.id} amount={x.amount} destination={x.destination} accountId={x.accountId} />)}
                    {list && list.length > 0 && width < Device.tablet && list.map((x, i) => <PayoutHistoryItemMobile date={x.date} id={x.id} amount={x.amount} destination={x.destination} accountId={x.accountId} />)}
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

PayoutHistoryTable.defaultProps = {};

export default PayoutHistoryTable;
