import { SizeVariant, StyleVariant } from './Button';
import { Color } from './Color';
import { IconFillVariant, IconModeVariant, IconSchemeVariant, IconSizeVariant, IconStrokeVariant, IconStyleVariant } from './Icon';
import Shadow from './Shadow';
import { Font, FontSize, FontWeight, LetterSpacing, LineHeight, TextStyle } from './Typography';

export const theme = {
    space: [0, 4, 8, 16, 24, 32, 40, 48, 56, 64],
    radii: [0, 4, 8, 16, 24, 32, 40, 48, 56, 64],
    fonts: Font.roboto,
    fontSizes: {
        ...FontSize,
    },
    fontWeights: {
        ...FontWeight,
    },
    lineHeights: {
        ...LineHeight,
    },

    letterSpacings: {
        ...LetterSpacing,
    },
    shadows: {
        ...Shadow,
    },
    colors: {
        ...Color,
    },
    textStyles: { ...TextStyle },
    buttons: {
        ...StyleVariant,
    },
    buttonSizes: {
        ...SizeVariant,
    },
    iconStyles: {
        ...IconStyleVariant,
    },
    iconSizes: {
        ...IconSizeVariant,
    },
    iconFills: {
        ...IconFillVariant,
    },
    iconStrokes: {
        ...IconStrokeVariant,
    },
    iconModes: {
        ...IconModeVariant,
    },
    iconSchemes: {
        ...IconSchemeVariant,
    },
};
