import React, { FC } from 'react';
import styled from 'styled-components';
import CourseItem from '../../page/settings/course/CourseItem';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    background-color: ${ThemeColor.white};
    padding: 25px;
    border-radius: 15px;
    > h4 {
        font-style: normal;
        font-weight: ${FontWeight.medium};
        font-size: ${FontSize.xxl};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.grey45};
        padding: 0px;
        margin: 0px 8px 8px 0px;
    }
`;

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
    profileType: 'tutor',
    message: "Hello! I've heard a lot about your excellent course. I like your approach to work and your attention to each student. I'm looking forward to our first class!",
    meetingLocation: 'Steven Bernson, Attorney at Law, 1556 Broadway, suite 416',
    meetingDate: '17.07.2021',
    meetingTime: '14:00',
    meetingDuration: '02:00 hr',
};

interface IProps {
    className?: string;
    id?: string;
}

const SessionApprovalListing: FC<IProps> = (props) => {
    const { id } = props;
    return (
        <Wrapper id={id}>
            <h4>This week at a glance</h4>
            <ContentWrapper>
                <CourseItem data={data} />
            </ContentWrapper>
        </Wrapper>
    );
};

SessionApprovalListing.defaultProps = {};

export default SessionApprovalListing;
