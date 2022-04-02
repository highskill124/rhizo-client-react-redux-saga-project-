import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { makeStyles } from '@material-ui/core';
import { FontSize, FontWeight } from '../../settings/Font';
import UIBox from '../layout/UIBox';
import UISpacer from './UISpacer';
import UIDevider from './UIDevider';
import NewUIRating from './NewUIRating';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    width: 100%;
`;

const Name = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.md};
    margin: 0;
    font-weight: 500;
`;

const Content = styled.div``;

const Heading = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.md};
    font-weight: ${FontWeight.bold};
    margin: 0;
`;

const Message = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: 13px;
    margin: 0;
    line-height: 170%;
`;

const Avatar = styled.img`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    flex-shrink: 0;
`;

const P = styled.p`
    color: ${ThemeColor.subtitle};
    opacity: 0.5;
    font-size: ${FontSize.xs};
    margin: 0;
`;

const Date = styled.p`
    color: ${ThemeColor.subtitle};
    opacity: 0.5;
    font-size: ${FontSize.sm};
    margin: 0;
`;

const Showmore = styled.p`
    color: ${ThemeColor.secondDark};
    font-size: ${FontSize.sm};
    &:hover {
        cursor: pointer;
    }
`;

const useStyles = makeStyles((theme) => ({
    container: {
        '@media(max-width: 767px)': {
            flexWrap: 'wrap',
        },
    },
}));

interface IProps {
    className?: string;
    style?: any;
    name: string;
    avatar: string;
    feedback: Array<any>;
    rate?: number;
    sessionNumber: number;
    totalHours: number;
}

const UIFeedback: FC<IProps> = ({ name, style, avatar, rate, sessionNumber, totalHours, feedback }) => {
    const classes = useStyles();
    const [per, setPer] = useState(2);
    const onMore = () => {
        setPer(per + 2);
    };

    const onLess = () => {
        setPer(2);
    };
    return (
        <Wrapper style={style}>
            <UISpacer height={25}></UISpacer>
            <UIBox justifyContent="flex-start" gap={40} className={classes.container}>
                <UIBox gap={10} alignItems="flex-start">
                    <Avatar src={avatar} alt="avatar" />
                    <div>
                        <Name>{name}</Name>
                        <NewUIRating value={rate}></NewUIRating>
                        <P>
                            {sessionNumber}Sessions&nbsp;•&nbsp;{totalHours}h Taked
                        </P>
                    </div>
                </UIBox>
                <Content>
                    {feedback
                        .map((item, index) => (
                            <div key={index}>
                                <UIBox alignItems="center" justifyContent="space-between">
                                    <Heading>{item.header}</Heading>
                                    <Date>{item.date}</Date>
                                </UIBox>
                                <UISpacer height={10}></UISpacer>
                                {item.content ? <Message>{item.content}</Message> : <Message>No Feedback</Message>}
                                <UISpacer height={20}></UISpacer>
                            </div>
                        ))
                        .slice(0, per)}
                    {feedback.length > 2 && per < feedback.length ? <Showmore onClick={onMore}>Show More</Showmore> : feedback.length > 2 ? <Showmore onClick={onLess}>Less</Showmore> : ''}
                </Content>
            </UIBox>
            <UIDevider></UIDevider>
        </Wrapper>
    );
};

UIFeedback.defaultProps = {};
export default UIFeedback;
