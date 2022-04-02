import { Reducer } from 'redux';
import { IAction, AppAction } from '../core';
import { IMenu } from '../dto/IMenu';

// --- Action Type--- //
export const MenuActionMap = {
    SET_MENU_LIST: '@menu/set-menu',
    REQUEST_MENU_LIST: '@menu/request-menu',
    REQUEST_MENU_LIST_SUCCESS: '@menu/request-menu-success',
    REQUEST_MENU_LIST_ERROR: '@menu/request-menu-error',
    RESET: '@menu/reset',
};

// --- Action Creator --- //
export const setMenuList = (payload) => AppAction.create(MenuActionMap.SET_MENU_LIST, payload);

export const requestMenuList = () => AppAction.create(MenuActionMap.REQUEST_MENU_LIST);

export const requestMenuListSuccess = (payload) => AppAction.create(MenuActionMap.REQUEST_MENU_LIST_SUCCESS, payload);

export const requestMenuListError = (payload) => AppAction.create(MenuActionMap.REQUEST_MENU_LIST_ERROR, payload);

export const resetMenuDataAction = () => AppAction.create(MenuActionMap.RESET);

export type MenuState = Readonly<{
    loading?: boolean;
    error?: any;
    success?: any;
    data: IMenu[];
}>;

const initialState: MenuState = {
    loading: false,
    error: null,
    success: null,
    data: [],
};

export const menuReducer: Reducer<MenuState, IAction> = (state = initialState, action) => {
    let newState: MenuState = { data: [] };

    switch (action.type) {
        case MenuActionMap.SET_MENU_LIST:
            newState = {
                ...state,
                data: [],
            };
            break;

        case MenuActionMap.REQUEST_MENU_LIST:
            newState = {
                ...state,
                loading: true,
                success: null,
                error: null,
                data: [],
            };
            break;

        case MenuActionMap.REQUEST_MENU_LIST_SUCCESS:
            newState = {
                ...state,
                data: action.payload,
                loading: false,
                success: {
                    message: `success`,
                },
                error: null,
            };
            break;

        case MenuActionMap.REQUEST_MENU_LIST_ERROR:
            newState = {
                ...state,
                error: action.payload.error,
                loading: false,
                success: null,
                data: [],
            };
            break;

        default:
            newState = { ...state };
            break;
    }
    return newState;
};
