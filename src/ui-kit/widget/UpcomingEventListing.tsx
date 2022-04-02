import React, { FC, ReactNode } from 'react';
import UIPanel from '../core/UIPanel';
import UpcomingEventItem from './UpcomingEventItem';

const data = {
    status: 'pending',
    title: 'Econ 101 class with Aaron Tomandl',
    userName: 'Ashley Jane',
    userType: 'tutor',
    message: "Hello! I've heard a lot about your excellent course. I like your approach to work and your attention to each student. I'm looking forward to our first class!",
    meetingLocation: 'Steven Bernson, Attorney at Law, 1556 Broadway, suite 416',
    meetingDate: '17.07.2021',
    meetingTime: '14:00',
    meetingDuration: '02:00 hr',
};

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    title: string;
    border?: boolean;
}

const UpcomingEventListing: FC<IProps> = (props) => {
    const { id, title, border } = props;

    return (
        <UIPanel id={id} title={title} border={border}>
            <UpcomingEventItem status={data.status} title={data.title} userName={data.userName} userType={data.userType} message={data.message} meetingDate={data.meetingDate} meetingTime={data.meetingTime} meetingDuration={data.meetingDuration}></UpcomingEventItem>
            <UpcomingEventItem status={data.status} title={data.title} userName={data.userName} userType={data.userType} message={data.message} meetingDate={data.meetingDate} meetingTime={data.meetingTime} meetingDuration={data.meetingDuration}></UpcomingEventItem>
            {/* <UpcomingEventItem status={data.status} title={data.title} userName={data.userName} userType={data.userType} message={data.message} meetingDate={data.meetingDate} meetingTime={data.meetingTime} meetingDuration={data.meetingDuration}></UpcomingEventItem> */}
        </UIPanel>
    );
};

UpcomingEventListing.defaultProps = {
    border: false,
};

export default UpcomingEventListing;
