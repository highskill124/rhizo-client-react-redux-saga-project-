import * as polished from 'polished';
import { variant, lineHeight, borderRadius } from 'styled-system';
import { Color } from './Color';
import { Font, FontWeight, FontSize, LineHeight } from './Typography';

export const BaseIconStyle = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    appearance: 'none',
    border: 'none',
    outline: 'none',
    margin: 0,
    '&:disabled': {
        cursor: 'not-allowed',
    },
} as const;

const buttonTransition = ['background-color', 'border-color', 'box-shadow', 'outline'].map((prop) => `0.3s ease ${prop}`).join(', ');

const generateColorVariant = (rootColor: string) => ({
    borderWidth: '0px',
    borderStyle: 'solid',
    backgroundColor: rootColor,
    borderColor: rootColor,
    transition: buttonTransition,
    '> svg': {
        fill: Color.white,
        '*': {
            fill: Color.white,
        },
    },

    '&:hover': {
        // backgroundColor: (props) => (props.buttonMode ? polished.lighten(0.05, rootColor) : rootColor),
        backgroundColor: polished.lighten(0.05, rootColor),
        borderColor: polished.lighten(0.05, rootColor),
    },
    '&:active': {
        backgroundColor: polished.lighten(0.1, rootColor),
        borderColor: polished.lighten(0.1, rootColor),
    },
    '&:focus': {
        // boxShadow: `0 0 4px 0 ${polished.lighten(0.1, rootColor)}`,
        boxShadow: 'none',
        outline: 'none',
    },
    '&:disabled': {
        backgroundColor: '#DFE5EC',
        color: Color.disabledBlue,
        borderColor: '#DFE5EC',
    },
});

export const iconStyle = variant({
    prop: 'variant',
    key: 'iconStyles',
});

export const IconStyleVariant: Record<string, any> = {
    primary: generateColorVariant(Color.primary),
    secondary: generateColorVariant(Color.secondary),
    ternary: generateColorVariant(Color.ternary),
    basic: {
        borderWidth: '0px',
        borderStyle: 'solid',
        backgroundColor: Color.basic,
        borderColor: Color.basic,
        transition: buttonTransition,
        '> svg': {
            fill: Color.doveGray,
            '*': {
                fill: Color.doveGray,
            },
        },
        '&:hover': {
            backgroundColor: Color.basicHover,
            borderColor: Color.basicHover,
        },
        '&:active': {
            backgroundColor: Color.basicHover,
            borderColor: Color.basicHover,
        },
        '&:focus': {
            // boxShadow: `0 0 4px 0 ${Color.basic}`,
            boxShadow: 'none',
            outline: 'none',
        },
        '&:disabled': {
            backgroundColor: '#DFE5EC',
            color: polished.rgba(0, 0, 0, 0.5),
            borderColor: '#DFE5EC',
        },
    },
    info: generateColorVariant(Color.info),
    warn: generateColorVariant(Color.warn),
    danger: generateColorVariant(Color.danger),
    success: generateColorVariant(Color.success),

    plane: {
        borderWidth: '0px',
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        transition: buttonTransition,
    },
} as const;

export const iconSize = variant({
    prop: 'size',
    key: 'iconSizes',
});

export const IconSizeVariant: Record<string, any> = {
    xl3: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '5rem',
        height: '5rem',
        '> svg': {
            maxWidth: '4rem',
            maxHeight: '4rem',
        },
    },
    xl2: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '4rem',
        height: '4rem',
        '> svg': {
            maxWidth: '3rem',
            maxHeight: '3rem',
        },
    },
    xl: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '3rem',
        height: '3rem',
        '> svg': {
            maxWidth: '2rem',
            maxHeight: '2rem',
        },
    },
    lg: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '2.625rem',
        height: '2.625rem',
        '> svg': {
            maxWidth: '1.625rem',
            maxHeight: '1.625rem',
        },
    },
    md: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '2rem',
        height: '2rem',
        '> svg': {
            maxWidth: '1.5rem',
            maxHeight: '1.5rem',
        },
    },
    sm: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '1.5rem',
        height: '1.5rem',
        '> svg': {
            maxWidth: '1rem',
            maxHeight: '1rem',
        },
    },
    xs: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '1.25rem',
        height: '1.25rem',
        '> svg': {
            maxWidth: '0.75rem',
            maxHeight: '0.75rem',
        },
    },
} as const;

export const iconFill = variant({
    prop: 'fill',
    key: 'iconFills',
});

export const IconFillVariant: Record<string, any> = {
    primary: {
        '> svg': {
            fill: Color.primary,
            '*': {
                fill: Color.primary,
            },
        },
    },
    secondary: {
        '> svg': {
            fill: Color.secondary,
            '*': {
                fill: Color.secondary,
            },
        },
    },
    ternary: {
        '> svg': {
            fill: Color.ternary,
            '*': {
                fill: Color.ternary,
            },
        },
    },
    basic: {
        '> svg': {
            fill: Color.basic,
            '*': {
                fill: Color.basic,
            },
        },
    },
    info: {
        '> svg': {
            fill: Color.info,
            '*': {
                fill: Color.info,
            },
        },
    },
    warn: {
        '> svg': {
            fill: Color.warn,
            '*': {
                fill: Color.warn,
            },
        },
    },
    danger: {
        '> svg': {
            fill: Color.danger,
            '*': {
                fill: Color.danger,
            },
        },
    },
    success: {
        '> svg': {
            fill: Color.success,
            '*': {
                fill: Color.success,
            },
        },
    },
    plain: {
        '> svg': {
            fill: Color.icon,
            '*': {
                fill: Color.icon,
            },
        },
    },
} as const;

export const iconMode = variant({
    prop: 'mode',
    key: 'iconModes',
});

export const IconModeVariant: Record<string, any> = {
    static: {
        cursor: 'auto',
        pointerEvents: 'none',
    },
    button: {
        cursor: 'pointer',
        pointerEvents: 'all',
    },
};

export const iconScheme = variant({
    prop: 'scheme',
    key: 'iconSchemes',
});

export const IconSchemeVariant: Record<string, any> = {
    light: {
        '> svg': {
            fill: Color.icon,
            '*': {
                fill: Color.icon,
            },
        },
    },
    dark: {
        '> svg': {
            fill: Color.white,
            '*': {
                fill: Color.white,
            },
        },
    },
};

export const iconStroke = variant({
    prop: 'stroke',
    key: 'iconStrokes',
});

export const IconStrokeVariant: Record<string, any> = {
    primary: {
        '> svg': {
            stroke: Color.primary,
            '*': {
                stroke: Color.primary,
            },
        },
    },
    secondary: {
        '> svg': {
            stroke: Color.secondary,
            '*': {
                stroke: Color.secondary,
            },
        },
    },
    ternary: {
        '> svg': {
            stroke: Color.ternary,
            '*': {
                stroke: Color.ternary,
            },
        },
    },
    basic: {
        '> svg': {
            stroke: Color.basic,
            '*': {
                stroke: Color.basic,
            },
        },
    },
    info: {
        '> svg': {
            stroke: Color.info,
            '*': {
                stroke: Color.info,
            },
        },
    },
    warn: {
        '> svg': {
            stroke: Color.warn,
            '*': {
                stroke: Color.warn,
            },
        },
    },
    danger: {
        '> svg': {
            stroke: Color.danger,
            '*': {
                stroke: Color.danger,
            },
        },
    },
    success: {
        '> svg': {
            stroke: Color.success,
            '*': {
                stroke: Color.success,
            },
        },
    },
    plain: {
        '> svg': {
            stroke: Color.icon,
            '*': {
                stroke: Color.icon,
            },
        },
    },
} as const;
