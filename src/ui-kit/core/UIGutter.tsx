import React, { FC } from 'react';
import styled from 'styled-components';
import { Device } from '../../settings/Device';
import { Gutter } from '../../settings/Gutter';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    flex: none;
    width: ${Gutter.sm}px;
    height: ${Gutter.sm}px;

    @media (max-width: ${Device.mobileMedium - 1}px) {
        width: ${Gutter.sm}px;
        height: ${Gutter.sm}px;
        display: ${({ mobileSmall }) => (mobileSmall ? 'flex' : 'none')};
    }
    @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.mobileLarge - 1}px) {
        width: ${Gutter.sm}px;
        height: ${Gutter.sm}px;
        display: ${({ mobileMedium }) => (mobileMedium ? 'flex' : 'none')};
    }
    @media (min-width: ${Device.mobileLarge}px) and (max-width: ${Device.tablet - 1}px) {
        width: ${Gutter.sm}px;
        height: ${Gutter.sm}px;
        display: ${({ mobileLarge }) => (mobileLarge ? 'flex' : 'none')};
    }
    @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
        width: ${Gutter.md}px;
        height: ${Gutter.md}px;
        display: ${({ tablet }) => (tablet ? 'flex' : 'none')};
    }
    @media (min-width: ${Device.laptop}px) and (max-width: ${Device.laptopLarge - 1}px) {
        width: ${Gutter.md}px;
        height: ${Gutter.md}px;
        display: ${({ laptop }) => (laptop ? 'flex' : 'none')};
    }
    @media (min-width: ${Device.laptopLarge}px) and (max-width: ${Device.desktop - 1}px) {
        width: ${Gutter.lg}px;
        height: ${Gutter.lg}px;
        display: ${({ laptopLarge }) => (laptopLarge ? 'flex' : 'none')};
    }
    @media (min-width: ${Device.desktop}px) {
        width: ${Gutter.xl}px;
        height: ${Gutter.xl}px;
        display: ${({ desktop }) => (desktop ? 'flex' : 'none')};
    }
`;

interface IProps {
    mobileSmall?: boolean;
    mobileMedium?: boolean;
    mobileLarge?: boolean;
    tablet?: boolean;
    laptop?: boolean;
    laptopLarge?: boolean;
    desktop?: boolean;
}

const UIGutter: FC<IProps> = (props) => {
    return <Wrapper {...props} />;
};

UIGutter.defaultProps = {
    mobileSmall: true,
    mobileMedium: true,
    mobileLarge: true,
    tablet: true,
    laptop: true,
    laptopLarge: true,
    desktop: true,
};

export default UIGutter;
