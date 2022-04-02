import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { FontSize, FontWeight } from '../../settings/Font';
import UIBox from '../../ui-kit/layout/UIBox';
import UISpacer from '../../ui-kit/core/UISpacer';
import UIDevider from '../../ui-kit/core/UIDevider';
import { ThemeColor } from '../../settings/ThemeColor';
import { Device } from '../../settings/Device';
import UIButton from '../../ui-kit/button/UIButton';

import { EmptyAll } from '../../ui-kit/image/UIImageAssets';
import { EmptyUpcoming } from '../../ui-kit/image/UIImageAssets';
import { EmptyDispute } from '../../ui-kit/image/UIImageAssets';
import { EmptySchedule } from '../../ui-kit/image/UIImageAssets';
import { EmptyAwaiting } from '../../ui-kit/image/UIImageAssets';

const Wrapper = styled.div<Partial<IProps>>`
    max-width: 400px;
    text-align: center;
    button{
        margin: 0 auto;
    }
`;

const Description = styled.div`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.xl};
    font-weight: ${FontWeight.regular};
`

const imageType = {
    all: { image: EmptyAll, description: "You don't have any sessions yet."},
    approved: { image: EmptyUpcoming, description: "You don't have any sessions yet. Add courses to attract more students!" },
    pending: { image: EmptyAwaiting, description: "You don't have any sessions yet. Add courses to attract more students!" },
    schedule: { image: EmptySchedule, description: "Your schedule is free today" },
    dispute: { image: EmptyDispute, description: "Good News! You don't have any dispute." }
}

interface IProps {
    className?: string;
    children?: ReactNode;
    style?: any;
    type: string;
}

const UIEmptyPage: FC<IProps> = (props) => {
    const { className, children, style, type } = props;
    const EmptyImage = imageType[type].image;

    return (
        <Wrapper style={style}>
            <UISpacer height={50}></UISpacer>
            {<EmptyImage />}
            <UISpacer height={30}></UISpacer>
            <Description>{imageType[type].description}</Description>
            <UISpacer height={30}></UISpacer>
            {type === 'pending' && <UIButton color="second" style={{display: 'block'}}>AddCourses</UIButton>}
        </Wrapper>
    )
};

UIEmptyPage.defaultProps = {};
export default UIEmptyPage;
