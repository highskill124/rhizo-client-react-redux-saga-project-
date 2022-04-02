import React, { FC } from 'react';
import styled from 'styled-components';
import UIBox from '../../../ui-kit/layout/UIBox';
import UIButton from '../../../ui-kit/button/UIButton';
import UISpacer from '../../../ui-kit/core/UISpacer';
import { FontSize, FontWeight } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';

const Wrapper = styled.tr<Partial<IProps>>`
    color: ${ThemeColor.subtitle};
    font-weight: ${FontWeight.regular};

    > td:nth-child(6) {
        > div {
            width: 80px;
            margin: 0 auto;
            height: 30px;
            > button {
                width: 80px;
                span {
                    font-weight: ${FontWeight.regular} !important;
                    font-size: ${FontSize.xxs}!important;
                }
            }
        }
    }

    >td: nth-child(1) {
        width: 15%;
    }
    >td: nth-child(2) {
        width: 15%;
    }
    >td: nth-child(3) {
        min-width: 170px;
        width: 26.6%;
    }
    >td: nth-child(4) {
        width: 26.5%;
    }
    >td: nth-child(5) {
        width: 16.66%;
    }
`;

const AvatarContainer = styled.div`
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 50%;
    width: 40px;
    height: 40px;
`;

const CustomSpan = styled.span`
    background-color: ${ThemeColor.second};
    padding: 2px;
    border-radius: 12px;
    color: ${ThemeColor.secondDark};
    font-size: ${FontSize.xxs};
`;

const CustomDot = styled.div`
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: ${ThemeColor.content};
`;

const CustomDiv = styled.div`
    font-size: ${FontSize.xxs};
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 3px;
    p {
        margin: 0;
    }
`;

const P = styled.p`
    margin-bottom: 0;
    margin-top: 0;
`;

const Div = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
`;
interface IProps {
    className?: string;
    id?: string;
    date: string;
    name: string;
    avatar?: string;
    course: string;
    duration: number;
    amount: string;
    skills: string;
    style?: any;
}

const EarningItems: FC<IProps> = (props) => {
    const { id, date, avatar, name, course, duration, skills, amount, style } = props;

    return (
        <Wrapper>
            <td>{date}</td>
            <td>${amount}</td>
            <td>
                <UIBox alignItems="center">
                    <AvatarContainer style={{ backgroundImage: `url(${avatar})` }}></AvatarContainer>
                    <UISpacer width={10}></UISpacer>
                    <div>
                        <Div>
                            <P>{name}</P>
                            <CustomSpan>He/Him/His</CustomSpan>
                        </Div>
                        <CustomDiv>
                            <p>freshman</p>
                            <CustomDot></CustomDot>
                            <p>{skills}</p>
                        </CustomDiv>
                    </div>
                </UIBox>
            </td>
            <td>{course}</td>
            <td>{duration}&nbsp;MIN</td>
            <td>
                <UIButton color="basicline" size="small">
                    View
                </UIButton>
            </td>
        </Wrapper>
    );
};

EarningItems.defaultProps = {};

export default EarningItems;
