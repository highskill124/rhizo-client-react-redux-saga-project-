import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { border, BorderProps, color, ColorProps, flexbox, FlexboxProps, grid, GridProps, layout, LayoutProps, TypographyProps, position, PositionProps, ResponsiveValue, shadow, ShadowProps, space, SpaceProps, system, ThemeValue, background, BackgroundProps, typography } from 'styled-system';

interface ContainerProp {
    maxWidth: string;
    minPadding: string;
}

const isContainerPropBoolean = (cp: ContainerProp | boolean): cp is boolean => typeof cp === 'boolean';

const Wrapper = styled.div<IUIBoxProps>(
    {
        display: 'flex',
        flexDirection: 'row',
        boxSizing: 'border-box',
        // width: '100%',
        alignSelf: 'stretch',
        minWidth: 0,
    },

    system({
        container: {
            properties: ['paddingLeft', 'paddingRight'],
            transform: (value: ContainerProp | boolean, scale) => {
                if (value) {
                    const maxWidth = isContainerPropBoolean(value) ? '1280px' : value.maxWidth;
                    const minPadding = isContainerPropBoolean(value) ? '16px' : value.minPadding;
                    return `max(calc((100vw - ${maxWidth}) / 2), ${minPadding})`;
                }
            },
        },
        placeSelf: {
            property: 'placeSelf',
        },
        justifySelf: {
            property: 'justifySelf',
        },
        transform: {
            property: 'transform',
        },
        cursor: {
            property: 'cursor',
        },
        textAlign: {
            property: 'textAlign',
        },
    }),
    space,
    position,
    color,
    border,
    layout,
    flexbox,
    grid,
    shadow,
    background,
    typography,
);

export interface IUIBoxProps extends SpaceProps, PositionProps, ColorProps, BorderProps, LayoutProps, FlexboxProps, GridProps, ShadowProps, BackgroundProps, TypographyProps {
    id?: string;
    as?: string;
    children?: ReactNode;
    ref?: any;
    container?: ResponsiveValue<ThemeValue<'container', any>>;
    placeself?: ResponsiveValue<ThemeValue<'placeSelf', any>>;
    justifyself?: ResponsiveValue<ThemeValue<'justifySelf', any>>;
    transform?: ResponsiveValue<ThemeValue<'transform', any>>;
    cursor?: ResponsiveValue<ThemeValue<'cursor', any>>;
    textalign?: ResponsiveValue<ThemeValue<'textAlign', any>>;
}

const UIBox: FC<IUIBoxProps> = (props) => {
    const { children, ...rest } = props;
    const other: any = rest;
    return <Wrapper {...other}>{children}</Wrapper>;
};

UIBox.defaultProps = {};

export default UIBox;
