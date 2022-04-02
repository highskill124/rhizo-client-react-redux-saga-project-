/* eslint-disable no-param-reassign */
import React, { FC } from 'react';

import { itemClassName } from '../../constants';
import type { Refs } from '../../types';

interface IProps {
    className?: string;
    id: string;
    index: number;
    refs: Refs;
    children?: React.ReactNode;
}

const Item: FC<IProps> = ({ children, id, index, refs }) => {
    const ref = React.useRef(null);
    refs[index] = ref;

    return (
        <div className={itemClassName} data-key={id} data-index={index} ref={ref}>
            {children}
        </div>
    );
};

export default React.memo(Item);
