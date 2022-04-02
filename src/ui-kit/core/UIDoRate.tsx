import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import ReactStars from 'react-rating-stars-component';
import { StarEmptyIcon, StarFilledIcon } from '../icon/UIIconAssets';

const Div = styled.div`
    .stars {
        display: flex;
        gap: 5px;
    }
`;

interface IProps {
    index: number;
    onChangs: (x, y) => void;
}

const UIDoRate: FC<IProps> = (props) => {
    const { onChangs, index } = props;
    const DoRate = {
        count: 5,
        classNames: 'stars',
        value: 0,
        a11y: true,
        isHalf: false,
        emptyIcon: <StarEmptyIcon />,
        filledIcon: <StarFilledIcon />,
        onChange: (x, y) => onChangs(x, index),
    };

    return (
        <Div>
            <ReactStars {...DoRate} />
        </Div>
    );
};

UIDoRate.defaultProps = {};

export default UIDoRate;
