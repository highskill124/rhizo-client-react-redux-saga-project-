import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

import AllSessions from './main-pages/AllSessions';
import Disputes from './main-pages/Disputes';
import ScheduleSessions from './main-pages/ScheduleSessions';
import Content from '../common/Content';
import Header from '../common/Header';
import UINavigation from '../common/UINavigation';
import { Device } from '../../settings/Device';
import { Margin } from '../../settings/Margin';
import UITabNav from '../../ui-kit/navigation/tab/UITabNav';
import UITabPanel from '../../ui-kit/navigation/tab/UITabPanel';
import { ThemeColor } from '../../settings/ThemeColor';
import { Sessions, ScheduleData } from './temp-data/data';

import NewUITitle from '../../ui-kit/core/NewUITitle';

const PageContentWrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    flex: 1;
    margin: 0px !important;
    overflow: hidden;
    @media (max-width: ${Device.mobileMedium - 1}px) {
        margin: ${Margin.sm}px;
        #profileBar {
            display: none;
        }
    }
    @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
        margin: ${Margin.sm}px;
        #profileBar {
            display: none;
        }
    }
    @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
        margin: ${Margin.md}px;
        #profileBar {
            display: none;
        }
    }
    @media (min-width: ${Device.laptop}px) and (max-width: ${Device.laptopLarge - 1}px) {
        margin: ${Margin.md}px;
    }
    @media (min-width: ${Device.laptopLarge}px) and (max-width: ${Device.desktop - 1}px) {
        margin: ${Margin.lg}px;
    }
    @media (min-width: ${Device.desktop}px) {
        margin: ${Margin.xl}px;
    }
`;

const MainContentWrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    /* background: ${ThemeColor.white}; */
    flex: 1;
    align-self: stretch;
    max-height: 100%;
    padding: 0 20px 0 20px;
    overflow: auto;
    > div:nth-child(3) {
        > div:nth-child(1) {
            margin-left: 20px;
            margin-right: 20px;
        }
    }
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
    }
    @media (max-width: ${Device.laptop - 1}px) {
        padding: 0 8px 0 8px;
    }
`;

const Div = styled.div`
    padding: 20px 0;
    width: 100%;
`;

const Container = styled.div``;

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        maxWidth: '1440px',
    },
    tabnav: {},
}));
interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
}

const MySession: FC<IProps> = (props) => {
    const classes = useStyles();
    const { id } = props;
    // const formik = useFormik({
    //     initialValues: {},
    //     onSubmit: (values: any) => {},
    // });

    const disputeData = (x: any) => {
        return x.status === 'disputeAnr' || x.status === 'disputeAr' || x.status === 'resolved';
    };
    const disputes = Sessions.filter(disputeData).length;
    const [index, setIndex] = useState(0);
    const [tabLabels] = useState([
        { id: 'All Sessions', label: 'All Sessions' },
        { id: 'Mentor Information', label: `Disputes(${disputes})` },
    ]);
    const handleChangeIndex = (x: any) => {
        setIndex(x);
    };

    return (
        <Container>
            <Header />
            <UINavigation />
            <Content style={{ maxWidth: '1440px' }}>
                <PageContentWrapper id={id}>
                    <MainContentWrapper>
                        <NewUITitle header="Sessions" devideNone={true} style={{ padding: '20px', paddingLeft: '0' }} />
                        <UITabNav id="settingsTab" labels={tabLabels} onChange={handleChangeIndex} className={classes.tabnav}>
                            <UITabPanel id={id} hidden={index !== 0} index={index}>
                                <Div>
                                    <AllSessions data={Sessions} />
                                </Div>
                            </UITabPanel>
                            <UITabPanel id={id} hidden={index !== 1} index={index}>
                                <Div>
                                    <Disputes data={Sessions} />
                                </Div>
                            </UITabPanel>
                        </UITabNav>
                    </MainContentWrapper>
                    <ScheduleSessions data={ScheduleData} />
                </PageContentWrapper>
            </Content>
        </Container>
    );
};

MySession.defaultProps = {};

export default MySession;
