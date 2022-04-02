import { Reducer } from 'redux';
import { AppAction, IAction } from '../core';
import { IHeaderNavContext } from '../dto/IHeaderNavContext';
import { IFlashMessageContext } from '../dto/IFlashMessageContext';

// --- Action Type--- //
export const PageActionMap = {
    OPEN_DRAWER: '@@page/open-drawer',
    CLOSE_DRAWER: '@@page/close-drawer',
    OPEN_FLASH_MESSAGE: '@@page/open-flash-message',
    CLOSE_FLASH_MESSAGE: '@@page/close-flash-message',
    UPDATE_FLASH_MESSAGE_STATUS: '@@page/update-flash-message-status',
};

// --- Action Creator --- //
export const createOpenDrawerAction = () => AppAction.create(PageActionMap.OPEN_DRAWER);
export const createCloseDrawerAction = () => AppAction.create(PageActionMap.CLOSE_DRAWER);

export const openFlashMessage = (payload: any) => AppAction.create(PageActionMap.OPEN_FLASH_MESSAGE, payload);
export const closeFlashMessage = (payload: any) => AppAction.create(PageActionMap.CLOSE_FLASH_MESSAGE, payload);
export const updateFlashMessageStatus = (payload: any) => AppAction.create(PageActionMap.UPDATE_FLASH_MESSAGE_STATUS, payload);

export type PageState = Readonly<{
    isOpen: boolean;
    drawerWidth: number;
    headerNavMenu: IHeaderNavContext;
    flashMessageList: Array<any>;
}>;

const initialState: PageState = {
    isOpen: true,
    drawerWidth: 208,
    headerNavMenu: {
        isOpen: false,
        anchorEl: null,
        menu: null,
    },
    flashMessageList: [],
};

const removeItem = (list, id) => {
    const nList = [...list];
    nList.splice(
        list.findIndex((x) => x.id === id),
        1,
    );
    return nList;
};

const setStatus = (list, id, status = 10) => {
    const nList = [...list];
    const index = list.findIndex((x) => x.id === id);
    nList[index].status = status;

    return nList;
};

export const pageReducer: Reducer<PageState, IAction> = (state = initialState, action) => {
    let newState: PageState = { ...state };
    switch (action.type) {
        case PageActionMap.OPEN_DRAWER:
            newState = {
                ...state,
                isOpen: true,
            };
            break;
        case PageActionMap.CLOSE_DRAWER:
            newState = {
                ...state,
                isOpen: false,
            };
            break;
        case PageActionMap.OPEN_FLASH_MESSAGE:
            newState = {
                ...state,
                flashMessageList: action.payload.map((x) => ({ ...x })),
            };
            break;
        case PageActionMap.CLOSE_FLASH_MESSAGE:
            newState = {
                ...state,
                flashMessageList: removeItem(state.flashMessageList, action.payload.id),
            };
            break;
        case PageActionMap.UPDATE_FLASH_MESSAGE_STATUS:
            newState = {
                ...state,
                flashMessageList: setStatus(state.flashMessageList, action.payload.id, action.payload.status),
            };
            break;
        default:
            newState = { ...state };
            break;
    }

    return newState;
};
