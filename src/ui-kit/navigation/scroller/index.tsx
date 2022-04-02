/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC } from 'react';

import './styles.css';

import useIntersectionObserver from './hooks/useIntersectionObserver';
import useItemsChanged from './hooks/useItemsChanged';
import useIsMounted from './hooks/useIsMounted';
import createApi, { PublicApiType } from './createApi';
import ItemsMap from './ItemsMap';
import { observerOptions as defaultObserverOptions } from './settings';

import * as constants from './constants';

import { VisibilityContext } from './context';

import type { ItemType, Refs } from './types';
import ScrollContainer from './components/ScrollContainer/ScrollContainer';
import MenuItems from './components';

interface IProps {
    className?: string;
    LeftArrow?: React.FC;
    RightArrow?: React.FC;
    children: ItemType | ItemType[];
    onInit?: (api: PublicApiType) => void;
    onScroll?: (api: PublicApiType, ev: React.UIEvent) => void;
    onWheel?: (api: PublicApiType, ev: React.WheelEvent) => void;
    options?: Partial<typeof defaultObserverOptions>;
    onMouseDown?: (arg0: PublicApiType) => React.MouseEventHandler;
    onMouseUp?: (arg0: PublicApiType) => React.MouseEventHandler;
    onMouseMove?: (arg0: PublicApiType) => React.MouseEventHandler;
    wrapperClassName?: string;
}

const ScrollMenu: FC<IProps> = ({ LeftArrow, RightArrow, children, onInit = (): void => {}, onMouseDown, onMouseUp, onMouseMove, onScroll = (): void => {}, onWheel = (): void => {}, options = defaultObserverOptions, wrapperClassName = '' }) => {
    const scrollContainerRef = React.useRef(null);
    const [menuItemsRefs] = React.useState<Refs>({});

    const observerOptions = React.useMemo(
        () => ({
            ...defaultObserverOptions,
            ...options,
            root: scrollContainerRef.current,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [options, scrollContainerRef.current],
    );

    // NOTE: hack for detect when items added/removed dynamicaly
    const itemsChanged = useItemsChanged(children, menuItemsRefs);

    const items = React.useRef(new ItemsMap()).current;
    const { visibleItems } = useIntersectionObserver({
        items,
        itemsChanged,
        options: observerOptions,
        refs: menuItemsRefs,
    });

    // TODO: it fires before have any visible items
    const initComplete = useIsMounted(() => onInit(publicApi));

    const api = React.useMemo(() => createApi(items, visibleItems), [items, visibleItems]);

    const publicApi: PublicApiType = React.useMemo(
        () => ({
            ...api,
            initComplete,
            items,
            scrollContainer: scrollContainerRef,
            visibleItems,
        }),
        [api, initComplete, items, visibleItems],
    );

    const scrollHandler = React.useCallback((event: React.UIEvent) => onScroll(publicApi, event), [onScroll, publicApi]);

    const onWheelHandler = React.useCallback((event: React.WheelEvent) => onWheel(publicApi, event), [onWheel, publicApi]);

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className={`${constants.wrapperClassName} ${wrapperClassName}`} onWheel={onWheelHandler} onMouseDown={onMouseDown?.(publicApi)} onMouseUp={onMouseUp?.(publicApi)} onMouseMove={onMouseMove?.(publicApi)}>
            <VisibilityContext.Provider value={publicApi}>
                {LeftArrow ? <LeftArrow /> : null}
                <ScrollContainer onScroll={scrollHandler} scrollRef={scrollContainerRef}>
                    <MenuItems refs={menuItemsRefs}>{children}</MenuItems>
                </ScrollContainer>
                {RightArrow ? <RightArrow /> : null}
            </VisibilityContext.Provider>
        </div>
    );
};

export { constants, ScrollMenu, VisibilityContext };
