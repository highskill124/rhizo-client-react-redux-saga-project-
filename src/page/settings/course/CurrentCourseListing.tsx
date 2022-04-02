import React, { FC, ReactNode } from 'react';
import UIPanel from '../../../ui-kit/core/UIPanel';
import CurrentCourseItem from './CurrentCourseItem';
import { majorList } from '../../../util/mock-api/data/major-list';

const data = {
    title: 'Auto Mechanics',
    totalSessions: 56,
    hoursTaught: 45,
};

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    title: string;
}

const CurrentCourseListing: FC<IProps> = (props) => {
    const { id, title } = props;

    return (
        <UIPanel id={id} title={title}>
            <CurrentCourseItem title={data.title} totalSessions={data.totalSessions} hoursTaught={data.hoursTaught} tags={majorList} />
            <CurrentCourseItem title={data.title} totalSessions={data.totalSessions} hoursTaught={data.hoursTaught} tags={majorList} />
            <CurrentCourseItem title={data.title} totalSessions={data.totalSessions} hoursTaught={data.hoursTaught} tags={majorList} />
        </UIPanel>
    );
};

CurrentCourseListing.defaultProps = {};

export default CurrentCourseListing;
