/* eslint-disable no-param-reassign */
import React, { FC } from 'react';

import { separatorClassName } from '../../constants';
import type { Refs } from '../../types';

interface IProps {
    className?: string;
    id: string;
    index: number;
    refs: Refs;
}

const Separator: FC<IProps> = ({ id, index, refs }) => {
    const ref = React.useRef(null);
    refs[index] = ref;

    return <div className={separatorClassName} data-key={id} data-index={index} ref={ref} />;
};

export default React.memo(Separator);
