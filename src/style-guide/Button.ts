import * as polished from 'polished';
import { variant, lineHeight } from 'styled-system';
import { Color } from './Color';
import { Font, FontWeight, FontSize, LineHeight } from './Typography';

export const BaseButtonStyle = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    appearance: 'none',
    fontFamily: Font.roboto,
    letterSpacing: '0.02em',
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none',
    textAlign: 'center',
    outline: 'none',
    margin: 0,
    '&:disabled': {
        cursor: 'not-allowed',
    },
} as const;

const buttonTransition = ['color', 'background-color', 'border-color', 'box-shadow', 'outline'].map((prop) => `0.3s ease ${prop}`).join(', ');

const generateColorVariant = (rootColor: string, textColor: string) => ({
    borderWidth: '0px',
    borderStyle: 'solid',
    backgroundColor: rootColor,
    borderColor: rootColor,
    color: textColor,
    transition: buttonTransition,
    '&:hover': {
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

export const StyleVariant: Record<string, any> = {
    primary: {
        borderWidth: '0px',
        borderStyle: 'solid',
        backgroundColor: Color.primary,
        borderColor: Color.primary,
        color: '#ffffff',
        transition: buttonTransition,
        '&:hover': {
            backgroundColor: Color.primaryHover,
            borderColor: Color.primaryHover,
        },
        '&:active': {
            backgroundColor: Color.primaryHover,
            borderColor: Color.primaryHover,
        },
        '&:focus': {
            // boxShadow: `0 0 4px 0 ${Color.primary}`,
            boxShadow: 'none',
            outline: 'none',
        },
        '&:disabled': {
            backgroundColor: '#DFE5EC',
            color: polished.rgba(0, 0, 0, 0.5),
            borderColor: '#DFE5EC',
        },
    },

    secondary: generateColorVariant(Color.secondary, '#ffffff'),
    ternary: generateColorVariant(Color.ternary, '#ffffff'),
    success: generateColorVariant(Color.success, '#ffffff'),

    basic: {
        borderWidth: '0px',
        borderStyle: 'solid',
        backgroundColor: Color.basic,
        borderColor: Color.basic,
        color: Color.doveGray,
        transition: buttonTransition,
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

    info: {
        borderWidth: '0px',
        borderStyle: 'solid',
        backgroundColor: Color.info,
        borderColor: Color.info,
        color: '#ffffff',
        transition: buttonTransition,
        '&:hover': {
            backgroundColor: Color.infoHover,
            borderColor: Color.infoHover,
        },
        '&:active': {
            backgroundColor: Color.infoHover,
            borderColor: Color.infoHover,
        },
        '&:focus': {
            // boxShadow: `0 0 4px 0 ${Color.info}`,
            boxShadow: 'none',
            outline: 'none',
        },
        '&:disabled': {
            backgroundColor: '#DFE5EC',
            color: polished.rgba(0, 0, 0, 0.5),
            borderColor: '#DFE5EC',
        },
    },

    warn: {
        borderWidth: '0px',
        borderStyle: 'solid',
        backgroundColor: Color.warn,
        borderColor: Color.warn,
        color: '#ffffff',
        transition: buttonTransition,
        '&:hover': {
            backgroundColor: Color.warnHover,
            borderColor: Color.warnHover,
        },
        '&:active': {
            backgroundColor: Color.warnHover,
            borderColor: Color.warnHover,
        },
        '&:focus': {
            // boxShadow: `0 0 4px 0 ${Color.warn}`,
            boxShadow: 'none',
            outline: 'none',
        },
        '&:disabled': {
            backgroundColor: '#DFE5EC',
            color: polished.rgba(0, 0, 0, 0.5),
            borderColor: '#DFE5EC',
        },
    },

    danger: {
        borderWidth: '0px',
        borderStyle: 'solid',
        backgroundColor: Color.danger,
        borderColor: Color.danger,
        color: '#ffffff',
        transition: buttonTransition,
        '&:hover': {
            backgroundColor: Color.dangerHover,
            borderColor: Color.dangerHover,
        },
        '&:active': {
            backgroundColor: Color.dangerHover,
            borderColor: Color.dangerHover,
        },
        '&:focus': {
            // boxShadow: `0 0 4px 0 ${Color.danger}`,
            boxShadow: 'none',
            outline: 'none',
        },
        '&:disabled': {
            backgroundColor: '#DFE5EC',
            color: polished.rgba(0, 0, 0, 0.5),
            borderColor: '#DFE5EC',
        },
    },

    unstyled: {},
} as const;

export const buttonSize = variant({
    prop: 'size',
    key: 'buttonSizes',
});

export const SizeVariant: Record<string, any> = {
    lg: {
        paddingTop: ['0.5rem'],
        paddingBottom: ['0.5rem'],
        fontSize: [FontSize.lg],
        fontWeight: [FontWeight.medium],
        lineHeight: [LineHeight.relaxed],
        borderRadius: ['0.75rem'],
        paddingLeft: ['1.5rem'],
        paddingRight: ['1.5rem'],
        minWidth: '2.625rem',

        '> span': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '1.625rem',
            '> svg': {
                maxWidth: '1.625rem',
                maxHeight: '1.625rem',
            },
        },
    },
    md: {
        paddingTop: ['0.375rem'],
        paddingBottom: ['0.375rem'],
        fontSize: [FontSize.md],
        fontWeight: [FontWeight.medium],
        lineHeight: [LineHeight.relaxed],
        borderRadius: ['0.5rem'],
        paddingLeft: ['1rem'],
        paddingRight: ['1rem'],
        minWidth: '2rem',

        '> span': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '1.5rem',
            '> svg': {
                maxWidth: '1.5rem',
                maxHeight: '1.5rem',
            },
        },
    },
    sm: {
        paddingTop: ['0.25rem'],
        paddingBottom: ['0.25rem'],
        fontSize: [FontSize.sm],
        fontWeight: [FontWeight.medium],
        lineHeight: [LineHeight.relaxed],
        borderRadius: ['0.375rem'],
        paddingLeft: ['0.5rem'],
        paddingRight: ['0.5rem'],
        minWidth: '1.5rem',

        '> span': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '1rem',
            '> svg': {
                maxWidth: '1rem',
                maxHeight: '1rem',
            },
        },
    },
} as const;
