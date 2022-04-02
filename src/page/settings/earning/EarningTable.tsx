import React, { FC, useState } from 'react';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import EarningItems from './EarningItems';
import EarningItemsMobile from './EarningItemsMobile';
import { FontSize } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';
import { Device } from '../../../settings/Device';
import UIBox from '../../../ui-kit/layout/UIBox';
import UISpacer from '../../../ui-kit/core/UISpacer';

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
        padding: 10px;
        padding-left: 0;
    }
    td:nth-child(6) {
        text-align: center;
    }
`;

const Desktop = styled.thead`
    > tr td {
        color: ${ThemeColor.title};
        font-size: ${FontSize.lg};
    }
`;

const Tbody = styled.tbody``;

const Earning = [
    {
        date: 'Sept.08.2021',
        amount: '29223.00',
        name: 'Mark Otto',
        course: 'ECON 101',
        skills: 'Economic & Maths',
        duration: 60,
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
    },
    {
        date: 'Sept.08.2021',
        amount: '2943.00',
        name: 'Mark Otto',
        course: 'ECONdfsdd 101',
        skills: 'Economic & Maths',
        duration: 6045,
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
    },
    {
        date: 'Sept.08.2021',
        amount: '23.00',
        name: 'Mark',
        course: 'ECON 101 & photoshop',
        skills: 'Economic & Maths',
        duration: 6000,
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
    },
    {
        date: 'Sept.08.2021',
        amount: '4.00',
        name: 'Mark Otto',
        course: 'ECON 101',
        skills: 'Economic & Maths',
        duration: 1231,
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
    },
    {
        date: 'Sept.08.2021',
        amount: '267594.00',
        name: 'Mark Otto',
        course: 'ECON sdfsdfd101',
        skills: 'Economic & Maths',
        duration: 6045,
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

const EarningTable: FC<IProps> = (props) => {
    const [width, setWidth] = useState<number>(document.body.clientWidth);
    const classes = useStyles();

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

    const { id, style } = props;
    const [list] = useState(Earning);
    return (
        <>
            <Wrapper id={id} style={style}>
                {width >= Device.tablet && (
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
                    {list && width >= Device.tablet && list.length > 0 && list.map((x, i) => <EarningItems date={x.date} name={x.name} avatar={x.avatar} amount={x.amount} course={x.course} duration={x.duration} skills={x.skills} />)}
                    {list && width < Device.tablet && list.map((x, i) => <EarningItemsMobile date={x.date} name={x.name} avatar={x.avatar} amount={x.amount} course={x.course} duration={x.duration} skills={x.skills} />)}
                </Tbody>
            </Wrapper>
            <UISpacer height={45}></UISpacer>
            <UIBox justifyContent="center">
                <div className={classes.root}>
                    <Pagination count={10} siblingCount={0} boundaryCount={1} />
                </div>
            </UIBox>
        </>
    );
};

EarningTable.defaultProps = {};

export default EarningTable;
