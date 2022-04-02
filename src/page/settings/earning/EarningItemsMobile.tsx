import React, { FC, useState } from 'react';
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
    flex-shrink: 0;
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
    width: 100%;
    display: block;
    padding: 15px;
    align-items: center;
    p {
        margin: 7px 0;
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
    align-items: center;
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

    const [width, setWidth] = useState<number>(document.body.clientWidth);

    React.useEffect(() => {
        const resizeWidth = (event) => {
            setWidth(document.body.clientWidth);
        };

        window.addEventListener('resize', resizeWidth);

        // cleanup this component
        return () => {
            window.removeEventListener('resize', resizeWidth);
        };
    }, []);

    return (
        <Mobile>
            <UIBox justifyContent="space-between" style={{ width: '100%' }}>
                <div>{date}</div>
                <UIBox>
                    <UISpacer width={10}></UISpacer>
                    <div>{duration}MIN</div>
                    <UISpacer width={10}></UISpacer>
                    <div>${amount}</div>
                </UIBox>
            </UIBox>
            <UIBox justifyContent="end">
                <div>{course}</div>
            </UIBox>
            <UISpacer height={10}></UISpacer>
            <UIBox justifyContent="space-between" alignItems="center">
                <UIBox alignItems="center" flex>
                    <AvatarContainer style={{ backgroundImage: `url(${avatar})` }}></AvatarContainer>
                    <UISpacer width={10}></UISpacer>
                    <div>
                        <p>
                            {name}&nbsp;<CustomSpan>He/Him/His</CustomSpan>
                        </p>
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

EarningItems.defaultProps = {};

export default EarningItems;
