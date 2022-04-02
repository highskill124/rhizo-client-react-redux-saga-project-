import { combineReducers, ReducersMapObject } from 'redux';
import { AuthState, authReducer } from './AuthState';
import { menuReducer, MenuState } from './MenuState';
import { PageState, pageReducer } from './PageState';
import { profileReducer, ProfileState } from './ProfileState';
import { searchReducer, SearchState } from './SearchState';
import { settingsReducer, SettingsState } from './SettingsState';

import { schedulerReducer, SchedulerState } from './SchedulerState';

export type RootState = {
    menuState: MenuState;
    pageState: PageState;
    authState: AuthState;
    profileState: ProfileState;
    searchState: SearchState;
    settingsState: SettingsState;

    schedulerState: SchedulerState;
};

const reducerMap: ReducersMapObject<any, any> = {
    menuState: menuReducer,
    pageState: pageReducer,
    authState: authReducer,
    profileState: profileReducer,
    searchState: searchReducer,
    settingsState: settingsReducer,

    schedulerState: schedulerReducer,
};

export const RootReducer = () => {
    return combineReducers<RootState>(reducerMap);
};
