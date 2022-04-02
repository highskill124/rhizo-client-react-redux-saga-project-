import { css, keyframes } from 'styled-components';

export const TransitionProperty = {
    none: 'transition-property: none;',
    all: 'transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);transition-duration: 150ms; ',
    transition: 'transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;',
    colors: 'transition-property: background-color, border-color, color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;',
    opacity: 'transition-property: opacity; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;',
    shadow: 'transition-property: box-shadow; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;',
    transform: 'transition-property: transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;',
};

export const TransitionDuration = {
    t75: 'transition-duration: 75ms;',
    t100: 'transition-duration: 100ms;',
    t150: 'transition-duration: 150ms;',
    t200: 'transition-duration: 200ms;',
    t300: 'transition-duration: 300ms;',
    t500: 'transition-duration: 500ms;',
    t700: 'transition-duration: 700ms;',
    t1000: 'transition-duration: 1000ms;',
};

export const TransitionTimingFunction = {
    easeLinear: 'transition-timing-function: linear;',
    easeIn: 'transition-timing-function: cubic-bezier(0.4, 0, 1, 1);',
    easeOut: 'transition-timing-function: cubic-bezier(0, 0, 0.2, 1);',
    easeInOut: 'transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);',
};

export const TransitionDelay = {
    delay_75: 'transition-delay: 75ms;',
    delay_100: 'transition-delay: 100ms;',
    delay_150: 'transition-delay: 150ms;',
    delay_200: 'transition-delay: 200ms;',
    delay_300: 'transition-delay: 300ms;',
    delay_500: 'transition-delay: 500ms;',
    delay_700: 'transition-delay: 700ms;',
    delay_1000: 'transition-delay: 1000ms;',
};

const spin = keyframes`
    ${'0%'} {
    transform: rotate(0deg);
  }
  ${'100%'} {
    transform: rotate(360deg);
  }
`;

const ping = keyframes`
    ${`75%, 100%`} {
        transform: scale(2);
        opacity: 0;
    }
`;

const pulse = keyframes`
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: .5;
    }
`;

const bounce = keyframes`
    0%, 100% {
        transform: translateY(-25%);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
        transform: translateY(0);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
`;

export const Animation = {
    none: `animation: none;`,
    spin: () =>
        css`
            animation: ${spin} 1s linear infinite;
        `,
    ping: () =>
        css`
            animation: ${ping} 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        `,
    // ping: `animation: ${ping} 1s cubic-bezier(0, 0, 0.2, 1) infinite;`,
    // pulse: `animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;`,
    // bounce: `animation: ${bounce} 1s infinite;`,
};

export const Tween = {
    transition: TransitionProperty,
    duration: TransitionDuration,
    ease: TransitionTimingFunction,
    delay: TransitionDelay,
    animation: Animation,
};
