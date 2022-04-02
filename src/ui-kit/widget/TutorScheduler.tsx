import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { addMinutes, addHours, addDays, startOfDay, isSameMinute, startOfWeek } from 'date-fns';
import { Scrollbars } from 'react-custom-scrollbars';
import { SelectionSchemeType } from '../scheduler/scheme';
import UIScheduler from '../scheduler/UIScheduler';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    background-color: #ffffff;
    padding: 0;
    margin: 0;
    border-radius: 12px;
`;

interface IProps {
    id?: string;
    style?: any;
    className?: string;
    children?: ReactNode;
    minTime?: number;
    maxTime?: number;
    numDays?: number;
    startDate?: Date;
    onSchedule: (x: any) => void;
}

const TutorScheduler: FC<IProps> = (props) => {
    const { id, minTime, maxTime, numDays, startDate, onSchedule, style, className } = props;
    const [selectionScheme, setSelectionScheme] = React.useState<SelectionSchemeType>('linear');
    const [TstartDate, setTStartDate] = React.useState<Date>(startDate || new Date());
    const [TnumDays, setTNumDays] = React.useState<number>(numDays || 7);
    const [TminTime, setTMinTime] = React.useState<number>(minTime || 0);
    const [TmaxTime, setTMaxTime] = React.useState<number>(maxTime || 24);
    const [schedule, setSchedule] = React.useState([]);

    return (
        <Wrapper id={id} style={style} className={className}>
            <UIScheduler
                minTime={TminTime}
                maxTime={TmaxTime}
                numDays={TnumDays}
                startDate={startOfWeek(TstartDate, { weekStartsOn: 1 })}
                selection={schedule}
                onChange={(e) => {
                    onSchedule(e);
                    setSchedule(e);
                }}
                hourlyChunks={4}
                timeFormat="HH:mm"
                dateFormat="eee"
                selectionScheme={selectionScheme}
            />
        </Wrapper>
    );
};

TutorScheduler.defaultProps = {};

export default TutorScheduler;
