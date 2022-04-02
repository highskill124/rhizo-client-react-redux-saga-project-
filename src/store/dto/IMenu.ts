export interface IMenu {
    id: string;
    open: boolean;
    selected: boolean;
    label: string;
    icon: string;
    variant: string;
    url?: string;
    nodeKey?: string;
    parentKey?: string;
    level?: number;
    path?: any;
    nodes?: Array<IMenu>;
}
