import React, { FC } from 'react';
import styled from 'styled-components';
import UpcomingClassItem from './UpcomingClassItem';
import { majorList } from '../../util/mock-api/data/major-list';
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
    margin-bottom: 25px;
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
    title: 'Econ 101 class with Aaron Tomandl',
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    month: 'June',
    date: '23',
    time: '07:00am–09:00am',
    tags: [],
};

interface IProps {
    className?: string;
    id?: string;
}

const UpcomingClassListing: FC<IProps> = (props) => {
    const { id } = props;
    return (
        <Wrapper id={id}>
            <h4>Upcoming classes</h4>
            <ContentWrapper>
                <UpcomingClassItem title={data.title} desc={data.desc} date={data.date} month={data.month} time={data.time} tags={majorList}></UpcomingClassItem>
                <UpcomingClassItem title={data.title} desc={data.desc} date={data.date} month={data.month} time={data.time} tags={majorList}></UpcomingClassItem>
                <UpcomingClassItem title={data.title} desc={data.desc} date={data.date} month={data.month} time={data.time} tags={majorList}></UpcomingClassItem>
            </ContentWrapper>
        </Wrapper>
    );
};

UpcomingClassListing.defaultProps = {};

export default UpcomingClassListing;
