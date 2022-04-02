import { useFormik } from 'formik';
import React, { FC, ReactNode } from 'react';
import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/state/RootReducer';
import SessionContainer from '../../../ui-kit/core/UISessions';
import { Device } from '../../../settings/Device';
import { ScheduleData } from '../temp-data/data';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    flex: 1;
    padding: 0px;

    & .name-container {
        flex-wrap: wrap;
    }

    @media (max-width: ${Device.laptop - 1}px) {
        & .info-content {
            flex-wrap: wrap-reverse;
        }
    }
`;

const useStyles = makeStyles((theme) => ({
    schedule: {
        '@media (min-width: 1290px)': {
            display: 'none !important',
        },
    },
}));

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    data: any;
}

const AllSessions: FC<IProps> = (props) => {
    const { id, data } = props;
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values: any) => {},
    });

    const isTutor = useSelector<RootState, boolean>((s) => s.profileState.user.isTutor);

    // DATA FILTERING TO PENDIND DATA AND UPCOMING DATA
    const pendingData = [];
    const upcomingData = [];

    for (let i = 0; i < data.length; i++) {
        if (data[i].status === 'pending') {
            pendingData.push(data[i]);
        }
        if (data[i].status === 'approved') {
            upcomingData.push(data[i]);
        }
    }

    return (
        <Wrapper id={id}>
            {isTutor ? <SessionContainer data={pendingData} sessionType="pending" userType={isTutor} /> : null}
            <SessionContainer data={ScheduleData} sessionType="schedule" userType={isTutor} className={classes.schedule} />
            <SessionContainer data={upcomingData} sessionType="approved" userType={isTutor} />
            <SessionContainer data={data} sessionType="all" userType={isTutor} />
        </Wrapper>
    );
};

AllSessions.defaultProps = {};

export default AllSessions;
