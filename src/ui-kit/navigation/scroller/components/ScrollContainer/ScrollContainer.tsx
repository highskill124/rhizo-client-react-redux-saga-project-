import React, { FC } from 'react';

import { scrollContainerClassName } from '../../constants';

interface IProps {
    className?: string;
    children?: React.ReactNode;
    onScroll?: (event: React.UIEvent) => void;
    scrollRef: React.Ref<HTMLDivElement>;
}

const ScrollContainer: FC<IProps> = ({ children, onScroll, scrollRef }) => {
    return (
        <div className={scrollContainerClassName} onScroll={onScroll} ref={scrollRef}>
            {children}
        </div>
    );
};

ScrollContainer.defaultProps = {
    onScroll: (e) => {},
};

export default ScrollContainer;
