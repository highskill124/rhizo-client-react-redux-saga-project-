import { useFormik } from 'formik';
import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/state/RootReducer';
import SessionContainer from '../../../ui-kit/core/UISessions';
import { Device } from '../../../settings/Device';

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
        padding: 0px 10px;
    }
`;

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    data: any;
}

const Dispute: FC<IProps> = (props) => {
    const { id, data } = props;
    const isTutor = useSelector<RootState, boolean>((s) => s.profileState.user.isTutor);

    // some dummy data (replace data from api in here)

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values: any) => {},
    });

    const disputeData = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].status === 'resolved' || data[i].status === 'disputeAnr' || data[i].status === 'disputeAr') {
            disputeData.push(data[i]);
        }
    }

    return (
        <Wrapper id={id}>
            <SessionContainer data={disputeData} userType={isTutor} sessionType="dispute" />
        </Wrapper>
    );
};

Dispute.defaultProps = {};

export default Dispute;
