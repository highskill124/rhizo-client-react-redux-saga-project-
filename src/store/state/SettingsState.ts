import { Reducer } from 'redux';
import { IAction, AppAction } from '../core';
import { ISettings } from '../dto/ISettings';

// --- Action Type--- //
export const SettingsActionMap = {
    REQUEST_EDUCATION_LEVEL_LIST: '@profile/request-education-level-list',
    REQUEST_EDUCATION_LEVEL_LIST_SUCCESS: '@profile/request-education-level-list_success',
    REQUEST_EDUCATION_LEVEL_LIST_ERROR: '@profile/request-education-level-list_error',

    REQUEST_GENDER_PRONOUNS_LIST: '@profile/request-gender-pronouns-list',
    REQUEST_GENDER_PRONOUNS_LIST_SUCCESS: '@profile/request-gender-pronouns-list_success',
    REQUEST_GENDER_PRONOUNS_LIST_ERROR: '@profile/request-gender-pronouns-list_error',
};

// --- Action Creator --- //

export const requestEducationLevelList = () => AppAction.create(SettingsActionMap.REQUEST_EDUCATION_LEVEL_LIST);
export const requestEducationLevelListSuccess = (payload) => AppAction.create(SettingsActionMap.REQUEST_EDUCATION_LEVEL_LIST_SUCCESS, payload);
export const requestEducationLevelListError = (payload) => AppAction.create(SettingsActionMap.REQUEST_EDUCATION_LEVEL_LIST_ERROR, payload);

export const requestGenderPronounsList = () => AppAction.create(SettingsActionMap.REQUEST_GENDER_PRONOUNS_LIST);
export const requestGenderPronounsListSuccess = (payload) => AppAction.create(SettingsActionMap.REQUEST_GENDER_PRONOUNS_LIST_SUCCESS, payload);
export const requestGenderPronounsListError = (payload) => AppAction.create(SettingsActionMap.REQUEST_GENDER_PRONOUNS_LIST_ERROR, payload);

export type SettingsState = Readonly<{
    loading?: boolean;
    error?: any;
    success?: any;
    data: ISettings;
}>;

const initialState: SettingsState = {
    loading: false,
    error: null,
    success: null,
    data: {
        educationLevelList: null,
        genderPronounsList: null,
    },
};

export const settingsReducer: Reducer<SettingsState, IAction> = (state = initialState, action) => {
    let newState: SettingsState;

    switch (action.type) {
        case SettingsActionMap.REQUEST_EDUCATION_LEVEL_LIST:
            newState = {
                ...state,
                loading: true,
                success: null,
                error: null,
            };
            break;
        case SettingsActionMap.REQUEST_EDUCATION_LEVEL_LIST_SUCCESS:
            newState = {
                ...state,
                loading: false,
                success: { message: 'success' },
                error: null,
                data: { ...state.data, educationLevelList: action.payload },
            };
            break;
        case SettingsActionMap.REQUEST_EDUCATION_LEVEL_LIST_ERROR:
            newState = {
                ...state,
                loading: false,
                success: null,
                error: action.payload,
                data: { ...state.data, educationLevelList: [] },
            };
            break;

        case SettingsActionMap.REQUEST_GENDER_PRONOUNS_LIST:
            newState = {
                ...state,
                loading: true,
                success: null,
                error: null,
            };
            break;

        case SettingsActionMap.REQUEST_GENDER_PRONOUNS_LIST_SUCCESS:
            newState = {
                ...state,
                loading: false,
                success: { message: 'success' },
                error: null,
                data: { ...state.data, genderPronounsList: action.payload },
            };
            break;

        case SettingsActionMap.REQUEST_GENDER_PRONOUNS_LIST_ERROR:
            newState = {
                ...state,
                loading: false,
                success: null,
                error: action.payload,
                data: { ...state.data, genderPronounsList: [] },
            };
            break;

        default:
            newState = { ...state };
            break;
    }
    return newState;
};
