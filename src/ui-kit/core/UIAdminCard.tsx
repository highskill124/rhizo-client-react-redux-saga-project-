import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { makeStyles } from '@material-ui/core';
import { Device } from '../../settings/Device';
import { Margin } from '../../settings/Margin';
import { Padding } from '../../settings/Padding';
import { ThemeColor } from '../../settings/ThemeColor';
import { FontSize } from '../../settings/Font';
import UIDevider from './UIDevider';
import { CalendarIcon, HoursIcon, TextIcon } from '../icon/UIIconAssets';
import UIBox from '../layout/UIBox';
import UIUserProfile from './UIUserProfile';
import UISpacer from './UISpacer';

const Wrapper = styled.div<Partial<IProps>>`
    box-sizing: border-box;
    padding: 0px;
    max-width: 380px;
    min-width: 300px;
    background: ${ThemeColor.white};
    border-radius: 10px;
    border: 1px solid ${ThemeColor.border};
    margin-bottom: 20px;

    @media (max-width: ${Device.tablet}px) and (min-width: ${Device.mobileMedium + 1}px) {
        padding: ${Padding.xl}px;
        margin: ${Margin.md}px;
        max-width: 500px;
    }

    @media (max-width: ${Device.mobileMedium - 1}px) {
        padding: ${Padding.xl}px;
        margin: ${Margin.sm}px;
    }
`;

const Header = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.xs};
    margin: 0;
`;

const Footer = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 20px;
    padding: 0 20px 15px;
`;

const DisputeMark = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ff0000;
`;

const Date = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.xxs};
    margin: 0;
`;

const Content = styled.div`
    padding: 15px;
`;

const Heading = styled.div`
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const DisputeContent = styled.div`
    padding: 10px 0;
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.xxs};
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const LINES_TO_SHOW = 1;

const useStyles = makeStyles((theme) => ({
    devider: {
        color: `${ThemeColor.border} !important`,
        marginTop: '0 !important',
    },
    multiLineEllipsis: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        '-webkit-line-clamp': LINES_TO_SHOW,
        '-webkit-box-orient': 'vertical',
    },
}));

interface IProps {
    className?: string;
    style?: any;
    header?: string;
    date?: string;
    hours?: string | number;
    tutorAvatar?: string;
    tutorProfileName?: string;
    tutorGender?: string;
    tutorRatings?: number;
    tutorSubject?: string;
    tutorDisputeContent?: string;
    studentAvatar?: string;
    studentProfileName?: string;
    studentGender?: string;
    studentRatings?: number;
    studentSubject?: string;
    studentDisputeContent?: string;
    number?: string;
    transcript?: boolean;
}

const UIAdminCard: FC<IProps> = (props) => {
    const { className, style, header, transcript, number, date, hours, tutorAvatar, tutorProfileName, tutorGender, tutorRatings, tutorSubject, tutorDisputeContent, studentProfileName, studentRatings, studentAvatar, studentGender, studentSubject, studentDisputeContent } = props;
    const classes = useStyles();
    return (
        <Wrapper style={style} className={className}>
            <Heading>
                <Header>{header}</Header>
                <DisputeMark></DisputeMark>
            </Heading>
            <UIDevider className={classes.devider} />
            {transcript ? (
                <Content>
                    <UIUserProfile avatar={studentAvatar} ratings={studentRatings} gender={studentGender} subject={studentSubject} profileName={studentProfileName} />
                </Content>
            ) : (
                <Content>
                    <UIUserProfile avatar={tutorAvatar} profileName={tutorProfileName} gender={tutorGender} ratings={tutorRatings} subject={tutorSubject}></UIUserProfile>
                    <DisputeContent className={classes.multiLineEllipsis}>{tutorDisputeContent}</DisputeContent>
                    <UISpacer height={20}></UISpacer>
                    <UIUserProfile avatar={studentAvatar} profileName={studentProfileName} gender={studentGender} ratings={studentRatings} subject={studentSubject}></UIUserProfile>
                    <DisputeContent className={classes.multiLineEllipsis}>{studentDisputeContent}</DisputeContent>
                </Content>
            )}
            <Footer>
                {transcript && (
                    <UIBox gap={5}>
                        <TextIcon />
                        <Date>{number}</Date>
                    </UIBox>
                )}
                <UIBox gap={5}>
                    <CalendarIcon />
                    <Date>{date}</Date>
                </UIBox>
                <UIBox gap={5}>
                    <HoursIcon />
                    <Date>{hours}</Date>
                </UIBox>
            </Footer>
        </Wrapper>
    );
};

UIAdminCard.defaultProps = {};
export default UIAdminCard;
