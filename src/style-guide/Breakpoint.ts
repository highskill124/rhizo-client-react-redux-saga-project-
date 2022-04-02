import * as React from 'react';

const breakpoints: any = ['20em', '38em', '64em'];
const mq: any = breakpoints.map((bp: any) => `@media (min-width: ${bp})`);

const [sm, md, lg] = breakpoints;
breakpoints.sm = sm;
mq.sm = sm;
breakpoints.md = md;
mq.md = md;
breakpoints.lg = lg;
mq.lg = lg;

export { mq, breakpoints as default };

export const useBreakpoint = (bp: 'sm' | 'md' | 'lg') => {
    const mql = window.matchMedia(mq[bp].replace('@media ', ''));
    const [matches, setMatches] = React.useState(mql.matches);
    React.useEffect(() => {
        mql.addEventListener('change', (e) => {
            if (e.matches) {
                setMatches(true);
            } else {
                setMatches(false);
            }
        });
    }, [mql]);
    return matches;
};
