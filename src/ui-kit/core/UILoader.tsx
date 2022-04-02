import React, { FC } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Color from 'color';

const loadingAnimation = keyframes`
 0% { transform: rotate(0deg); }
 100% { transform: rotate(360deg); }
`;

const SLoader = styled.div<Partial<IProps>>`
    animation: ${loadingAnimation} 1s infinite linear;
    border-radius: 50%;
    border-style: solid;

    ${(props) => {
        if (props.size === 'sm') {
            return css`
                width: 16px;
                height: 16px;
                border-width: 2px;
            `;
        } else if (props.size === 'md') {
            return css`
                width: 20px;
                height: 20px;
                border-width: 3px;
            `;
        } else if (props.size === 'lg') {
            return css`
                width: 25px;
                height: 25px;
                border-width: 4px;
            `;
        }
        return null;
    }}

    ${(props) => {
        if (props.color && props.type === 'light') {
            return css`
                border-color: ${Color(props.color).fade(0.8).toString()};
                border-left-color: ${Color(props.color).fade(0.3).toString()};
            `;
        }
        if (props.color && props.type === 'dark') {
            return css`
                border-color: ${Color(props.color).lighten(0.5).toString()};
                border-left-color: ${Color(props.color).darken(0.1).toString()};
            `;
        }
        return null;
    }}
`;

interface IProps {
    className?: string;
    color?: string;
    type?: 'light' | 'dark';
    size?: any;
}

const UILoader: FC<IProps> = (props) => <SLoader {...props} />;

UILoader.defaultProps = {
    color: '#ffffff',
    type: 'light',
    size: 'md',
};

export default React.memo(UILoader);
