export type VisibleItems = string[];

export interface IOItem {
    index: string;
    key: string;
    entry: IntersectionObserverEntry;
    visible: boolean;
}
export type Item = [string, IOItem];

export interface Refs {
    [key: string]: React.MutableRefObject<HTMLElement | null>;
}

type ItemProps = {
    itemId: string;
};
export type ItemType = React.ReactElement<ItemProps>;
