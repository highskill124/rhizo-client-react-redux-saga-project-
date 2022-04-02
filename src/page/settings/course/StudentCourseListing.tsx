import React, { FC, useState } from 'react';
import styled from 'styled-components';
import UIPanel from '../../../ui-kit/core/UIPanel';
import CourseItem from './CourseItem';

const ContentWrapper = styled.div<any>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
`;
const data = {
    status: 'pending',
    title: 'Econ 101 class with Aaron Tomandl',
    profileName: 'Ashley Jane',
    profileType: 'student',
    message: "Hello! I've heard a lot about your excellent course. I like your approach to work and your attention to each student. I'm looking forward to our first class!",
    meetingLocation: 'Steven Bernson, Attorney at Law, 1556 Broadway, suite 416',
    meetingDate: '17.07.2021',
    meetingTime: '14:00',
    meetingDuration: '02:00 hr',
};

const sessionList = Array(5)
    .fill(0)
    .map((x) => data);

interface IProps {
    className?: string;
    id?: string;
}

const StudentCourseListing: FC<IProps> = (props) => {
    const { id } = props;
    const [list] = useState(sessionList);
    return (
        <UIPanel id={id} title="This week at a glance">
            <ContentWrapper>{list && list.length > 0 && list.map((x) => <CourseItem data={x} />)}</ContentWrapper>
        </UIPanel>
    );
};

StudentCourseListing.defaultProps = {};

export default StudentCourseListing;
