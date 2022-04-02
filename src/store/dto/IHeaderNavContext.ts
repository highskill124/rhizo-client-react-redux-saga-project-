import { RefObject } from 'react';
import { IMenu } from './IMenu';

export interface IHeaderNavContext {
    isOpen: boolean;
    anchorEl?: RefObject<HTMLAnchorElement> | null;
    menu?: IMenu | null;
}
