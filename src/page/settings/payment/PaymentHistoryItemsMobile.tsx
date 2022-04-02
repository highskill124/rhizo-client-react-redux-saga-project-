import React, { FC } from 'react';
import styled from 'styled-components';
import UIBox from '../../../ui-kit/layout/UIBox';
import UIButton from '../../../ui-kit/button/UIButton';
import UISpacer from '../../../ui-kit/core/UISpacer';
import { FontSize } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';

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

const Mobile = styled.div`
    border-bottom: 0.5px solid ${ThemeColor.tableBorder};
    padding: 15px 0;
`;

const P = styled.p`
    margin-bottom: 0;
    margin-top: 0;
`;

const Div = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
    align-items: center;
    word-break: break-word;
`;

interface IProps {
    className?: string;
    id?: string;
    date: string;
    name: string;
    avatar?: string;
    course: string;
    methods: string;
    amount: string;
    skills: string;
    style?: any;
}

const PaymentHistoryItemsMobile: FC<IProps> = (props) => {
    const { id, date, avatar, name, course, methods, skills, amount, style } = props;

    return (
        <Mobile>
            <UIBox justifyContent="space-between" alignItems="center" style={{ width: '100%' }}>
                <div>{date}</div>
                <UIBox alignItems="center">
                    <UISpacer width={10}></UISpacer>
                    <div>
                        <UIBox alignItems="center">
                            <img src={require(`../../../media/image/png/${methods}.png`)} alt="payment" />
                            &nbsp;
                            <div>{methods}</div>
                        </UIBox>
                    </div>
                    <UISpacer width={10}></UISpacer>
                    <div>{amount}</div>
                </UIBox>
            </UIBox>
            <UIBox justifyContent="end">{course}</UIBox>
            <UISpacer height={10}></UISpacer>
            <UIBox justifyContent="space-between" alignItems="center">
                <UIBox alignItems="center" style={{ flexShrink: '1' }}>
                    <AvatarContainer style={{ backgroundImage: `url(${avatar})` }}></AvatarContainer>
                    <UISpacer width={10}></UISpacer>
                    <div>
                        <P>
                            {name}&nbsp;<CustomSpan>He/Him/His</CustomSpan>
                        </P>
                        <Div>
                            freshman&nbsp;<CustomDot></CustomDot>&nbsp;{skills}
                        </Div>
                    </div>
                </UIBox>
                <div>
                    <UIButton color="basicline" size="small">
                        View
                    </UIButton>
                </div>
            </UIBox>
        </Mobile>
    );
};

PaymentHistoryItemsMobile.defaultProps = {};

export default PaymentHistoryItemsMobile;
