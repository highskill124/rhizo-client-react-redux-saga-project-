import { Color } from './Color';

export const Font = {
    roboto: 'Roboto, Helvetica, sans-serif',
};

export const FontSize = {
    xs: '.625rem',
    sm: '.75rem',
    md: '.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xl2: '1.375rem',
    xl3: '1.5rem',
    xl4: '1.625rem',
    xl5: '1.75rem',
    xl6: '1.875rem',
    xl7: '2rem',
    xl8: '2.125rem',
    xl9: '2.25rem',
};

export const FontWeight = {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
};

export const LineHeight = {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
};

export const LetterSpacing = {
    tightest: '-.075em',
    tighter: '-.05em',
    tight: '-.025em',
    normal: '0',
    wide: '.025em',
    wider: '.05em',
    widest: '.1em',
};

export const BaseTextStyle = {
    margin: 0,
    fontFamily: Font.roboto,
    letterSpacing: LetterSpacing.wide,
};

export const TextStyle: Record<string, any> = {
    // <h* />
    h1: {
        marginBottom: 1,
        fontSize: [FontSize.xl6, FontSize.xl6, FontSize.xl6, FontSize.xl6],
        fontWeight: FontWeight.medium,
        letterSpacing: LetterSpacing.wide,
        lineHeight: LineHeight.snug,
        color: Color.mineShaft,
    },
    h2: {
        marginBottom: 1,
        fontSize: [FontSize.xl, FontSize.xl, FontSize.xl, FontSize.xl],
        fontWeight: FontWeight.medium,
        letterSpacing: LetterSpacing.wide,
        lineHeight: LineHeight.snug,
        color: Color.mineShaft,
    },
    h3: {
        marginBottom: 1,
        fontSize: [FontSize.base, FontSize.base, FontSize.base, FontSize.base],
        fontWeight: FontWeight.medium,
        letterSpacing: LetterSpacing.wide,
        lineHeight: LineHeight.normal,
        color: Color.mineShaft,
    },
    h4: {
        marginBottom: 1,
        fontSize: [FontSize.md, FontSize.md, FontSize.md, FontSize.md],
        fontWeight: FontWeight.bold,
        letterSpacing: LetterSpacing.wide,
        lineHeight: LineHeight.snug,
        color: Color.mineShaft,
    },
    h5: {
        marginBottom: 1,
        fontSize: [FontSize.md, FontSize.md, FontSize.md, FontSize.md],
        fontWeight: FontWeight.medium,
        letterSpacing: LetterSpacing.wide,
        lineHeight: LineHeight.snug,
        color: Color.mineShaft,
    },
    h6: {
        marginBottom: 1,
        fontSize: [FontSize.sm, FontSize.sm, FontSize.sm, FontSize.sm],
        fontWeight: FontWeight.medium,
        letterSpacing: LetterSpacing.wide,
        lineHeight: LineHeight.snug,
        color: Color.doveGray,
    },

    // <p />
    body: {
        fontSize: [FontSize.sm, FontSize.sm, FontSize.sm, FontSize.sm],
        fontWeight: FontWeight.normal,
        letterSpacing: LetterSpacing.wide,
        lineHeight: LineHeight.normal,
        color: Color.doveGray,
    },
    body2: {
        fontSize: [FontSize.md, FontSize.md, FontSize.md, FontSize.md],
        fontWeight: FontWeight.medium,
        letterSpacing: LetterSpacing.wide,
        lineHeight: LineHeight.normal,
        color: Color.doveGray,
    },
    body3: {
        fontSize: [FontSize.sm, FontSize.sm, FontSize.sm, FontSize.sm],
        fontWeight: FontWeight.medium,
        letterSpacing: LetterSpacing.wide,
        lineHeight: LineHeight.normal,
        color: Color.mineShaft,
    },

    // Other
    label: {
        ...BaseTextStyle,
        marginBottom: 1,
        fontSize: [FontSize.md, FontSize.md, FontSize.md, FontSize.md],
        fontWeight: FontWeight.medium,
        letterSpacing: LetterSpacing.wide,
        lineHeight: LineHeight.normal,
        color: Color.mineShaft,
        // textTransform: 'uppercase',
    },

    input: {
        ...BaseTextStyle,
        fontSize: [FontSize.md, FontSize.md, FontSize.md, FontSize.md],
        fontWeight: FontWeight.medium,
        letterSpacing: LetterSpacing.wider,
        lineHeight: LineHeight.relaxed,
        color: Color.doveGray,
    },

    placeholder: {
        ...BaseTextStyle,
        fontSize: [FontSize.md, FontSize.md, FontSize.md, FontSize.md],
        fontWeight: FontWeight.medium,
        letterSpacing: LetterSpacing.wide,
        lineHeight: LineHeight.relaxed,
        color: Color.silverChalice,
    },

    fixed: {
        ...BaseTextStyle,
        fontSize: [FontSize.md, FontSize.md, FontSize.md, FontSize.md],
        fontWeight: FontWeight.medium,
        letterSpacing: LetterSpacing.wide,
        lineHeight: LineHeight.relaxed,
        color: Color.silverChalice,
        backgroundColor: Color.basic,
        minHeight: '1.375rem',
    },
};
