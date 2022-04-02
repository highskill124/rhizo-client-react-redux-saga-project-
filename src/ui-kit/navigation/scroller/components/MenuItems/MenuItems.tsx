import React, { FC } from 'react';

import { id as itemId } from '../../constants';
import type { ItemType, Refs } from '../../types';
import Item from '../Item/Item';
import Separator from '../Separator/Separator';

interface IProps {
    className?: string;
    children?: ItemType | ItemType[];
    refs: Refs;
}

const MenuItems: FC<IProps> = ({ children, refs }) => {
    const childArray = React.Children.toArray(children).filter(Boolean);
    const itemsCount = childArray.length;

    return (
        <>
            {childArray.map((child, index: number) => {
                const id = (child as JSX.Element)?.props?.[itemId];
                const separatorId = `${id}-separator`;
                const isLastItem = index + 1 === itemsCount;

                return [
                    <Item id={id} key={`menuItem__${id}`} refs={refs} index={index}>
                        {child}
                    </Item>,
                    !isLastItem && <Separator id={separatorId} refs={refs} key={separatorId} index={index + 0.1} />,
                ];
            })}
        </>
    );
};

export default MenuItems;
