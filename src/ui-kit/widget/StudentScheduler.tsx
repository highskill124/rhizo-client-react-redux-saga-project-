import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { addMinutes, addHours, addDays, startOfDay, isSameMinute, startOfWeek, differenceInDays } from 'date-fns';
import moment from 'moment';
import { Drawer } from '@material-ui/core';
import { SelectionSchemeType } from '../scheduler/scheme';
import UIScheduler from '../scheduler/UIScheduler';
import UIDateRangePicker from '../date-time/UIDateRangePicker';
import UISpacer from '../core/UISpacer';
import { Device } from '../../settings/Device';
import { Tween } from '../../settings/Tween';
import { ThemeColor } from '../../settings/ThemeColor';
import UIButton from '../button/UIButton';

const SDrawer = styled(Drawer)<any>`
    .MuiDrawer-paper {
        position: fixed;
        white-space: nowrap;
        overflow: hidden;
        position: fixed;
        left: 0px;
        top: 0px;
        bottom: 0px;
        height: 100vh;
        box-shadow: none;
        border: none;
        transition: width ${Tween.duration}s ${Tween.ease};
        width: 1024px;

        @media (min-width: ${Device.mobileMedium - 1}px) {
            width: 100vw;
        }
    }
    .MuiDrawer-paperAnchorDockedLeft {
        border-right: none;
    }
`;

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    /* align-self: stretch; */
    background-color: #ffffff;
    padding: 0px;
    /* margin: 24px; */
    border-radius: 0px;
    width: 100vw;
    max-width: 100vw;
    height: 100vh;
`;

const ContentWrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    /* align-self: stretch; */
    background-color: #ffffff;
    padding: 0px;
    /* margin: 24px; */
    border-radius: 0px;
    width: 100vw;
    max-width: 100vw;
    overflow: auto;
    padding: 8px;
`;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: ${ThemeColor.white};
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    margin: 0px;
    padding: 24px;
    /* height: 64px; */

    > h4 {
        font-weight: bold;
        font-size: 22px;
        line-height: 32px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        letter-spacing: 0.01em;
        color: #686868;
        margin: 0px;
    }
`;

const FooterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    background-color: ${ThemeColor.white};
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    margin: 0px;
    padding: 24px;
    /* height: 64px; */
`;

interface IProps {
    id?: string;
    open?: boolean;
    onClose?: () => void;
}

const StudentScheduler: FC<IProps> = (props) => {
    const { id, open, onClose } = props;
    const [schedule, setSchedule] = React.useState([]);
    const [selectionScheme, setSelectionScheme] = React.useState<SelectionSchemeType>('linear');
    const [startDate, setStartDate] = React.useState<Date>(new Date());
    const [numDays, setNumDays] = React.useState<number>(7);
    const [minTime, setMinTime] = React.useState<number>(1);
    const [maxTime, setMaxTime] = React.useState<number>(24);

    const handleDrawerClose = () => {
        onClose();
    };

    const onCancel = () => {
        onClose();
    };

    const handleDrawerOpen = () => {};

    return (
        <SDrawer open={open} anchor="right">
            <Wrapper id={id}>
                <TitleWrapper>
                    <h4>Select a session time</h4>
                    <UISpacer height={12} />

                    <UIDateRangePicker
                        //---
                        id="studentSchedulerDateRange"
                        onChange={(s, e) => {
                            if (s && e) {
                                const start = moment(s).toDate();
                                const end = moment(e).toDate();
                                const totalDays = differenceInDays(end, start);
                                setStartDate(start);
                                setNumDays(totalDays);
                            }
                        }}
                    />
                </TitleWrapper>
                <ContentWrapper>
                    <UIScheduler
                        // ---
                        minTime={minTime}
                        maxTime={maxTime}
                        numDays={numDays}
                        // startDate={startOfWeek(startDate, { weekStartsOn: 1 })}
                        startDate={startDate}
                        selection={schedule}
                        onChange={(e) => {
                            setSchedule(e);
                        }}
                        dateFormat="MMM/dd"
                        // dateFormat="EEE"
                        timeFormat="hh:mm"
                        // timeFormat="hh:mma"
                        // blockedSpan={[new Date('Mon Sep 15 2021 13:00:00 GMT+0530 (India Standard Time)'), new Date('Mon Sep 15 2021 13:30:00 GMT+0530 (India Standard Time)'), new Date('Mon Sep 15 2021 14:00:00 GMT+0530 (India Standard Time)'), new Date('Mon Sep 15 2021 14:30:00 GMT+0530 (India Standard Time)')]}
                        selectionScheme={selectionScheme}
                    />
                </ContentWrapper>
                <FooterWrapper>
                    <UIButton color="basic" onClick={() => onCancel()}>
                        Cancel
                    </UIButton>
                    <UISpacer width={10} />
                    <UIButton color="primary">Confirm</UIButton>
                </FooterWrapper>
            </Wrapper>
        </SDrawer>
    );
};

StudentScheduler.defaultProps = {
    open: false,
    onClose: () => {},
};

export default StudentScheduler;
