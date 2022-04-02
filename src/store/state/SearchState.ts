import { Reducer } from 'redux';
import { IAction, AppAction } from '../core';

// --- Action Type--- //
export const SearchActionMap = {
    REQUEST_MAJOR_QUERY: '@search/request-major-query',
    REQUEST_MAJOR_QUERY_SUCCESS: '@search/request-major-query-success',
    REQUEST_MAJOR_QUERY_ERROR: '@search/request-major-query-error',
    REQUEST_INSTITUTION_QUERY: '@search/request-institution-query',
    REQUEST_INSTITUTION_QUERY_SUCCESS: '@search/request-institution-query-success',
    REQUEST_INSTITUTION_QUERY_ERROR: '@search/request-institution-query-error',
    REQUEST_TAG_QUERY: '@search/request-tag-query',
    REQUEST_TAG_QUERY_SUCCESS: '@search/request-tag-query-success',
    REQUEST_TAG_QUERY_ERROR: '@search/request-tag-query-error',
};

export type SearchMajorState = Readonly<{
    loading?: boolean;
    error?: any;
    success?: any;
    data?: any;
}>;

export type SearchInstitutionState = Readonly<{
    loading?: boolean;
    error?: any;
    success?: any;
    data?: any;
}>;

export type SearchTagState = Readonly<{
    loading?: boolean;
    error?: any;
    success?: any;
    data?: any;
}>;

// --- Action Creator --- //
export const requestMajorQuery = (payload) => AppAction.create(SearchActionMap.REQUEST_MAJOR_QUERY, payload);
export const requestMajorQuerySuccess = (payload) => AppAction.create(SearchActionMap.REQUEST_MAJOR_QUERY_SUCCESS, payload);
export const requestMajorQueryError = (payload) => AppAction.create(SearchActionMap.REQUEST_MAJOR_QUERY_ERROR, payload);

export const requestInstitutionQuery = (payload) => AppAction.create(SearchActionMap.REQUEST_INSTITUTION_QUERY, payload);
export const requestInstitutionQuerySuccess = (payload) => AppAction.create(SearchActionMap.REQUEST_INSTITUTION_QUERY_SUCCESS, payload);
export const requestInstitutionQueryError = (payload) => AppAction.create(SearchActionMap.REQUEST_INSTITUTION_QUERY_ERROR, payload);

export const requestTagQuery = (payload) => AppAction.create(SearchActionMap.REQUEST_TAG_QUERY, payload);
export const requestTagQuerySuccess = (payload) => AppAction.create(SearchActionMap.REQUEST_TAG_QUERY_SUCCESS, payload);
export const requestTagQueryError = (payload) => AppAction.create(SearchActionMap.REQUEST_TAG_QUERY_ERROR, payload);

export type SearchState = Readonly<{
    major?: SearchMajorState;
    institution?: SearchInstitutionState;
    tag?: SearchTagState;
}>;

const initialState: SearchState = {
    major: {
        loading: false,
        error: null,
        success: null,
        data: [],
    },
    institution: {
        loading: false,
        error: null,
        success: null,
        data: [],
    },
    tag: {
        loading: false,
        error: null,
        success: null,
        data: [],
    },
};

const searchMagorReducer: Reducer<SearchMajorState, IAction> = (state = initialState.major, action) => {
    let newState: SearchMajorState = { ...initialState.major };

    switch (action.type) {
        case SearchActionMap.REQUEST_MAJOR_QUERY:
            newState = {
                loading: true,
                success: null,
                error: null,
            };
            break;

        case SearchActionMap.REQUEST_MAJOR_QUERY_SUCCESS:
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

        case SearchActionMap.REQUEST_MAJOR_QUERY_ERROR:
            newState = {
                ...state,
                data: action.payload,
                loading: false,
                success: null,
                error: null,
            };
            break;

        default:
            newState = { ...state };
            break;
    }

    return newState;
};

const searchInstitutionReducer: Reducer<SearchInstitutionState, IAction> = (state = initialState.institution, action) => {
    let newState: SearchInstitutionState = { ...initialState.institution };

    switch (action.type) {
        case SearchActionMap.REQUEST_INSTITUTION_QUERY:
            newState = {
                loading: true,
                success: null,
                error: null,
            };
            break;

        case SearchActionMap.REQUEST_INSTITUTION_QUERY_SUCCESS:
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

        case SearchActionMap.REQUEST_INSTITUTION_QUERY_ERROR:
            newState = {
                ...state,
                data: action.payload,
                loading: false,
                success: null,
                error: null,
            };
            break;

        default:
            newState = { ...state };
            break;
    }

    return newState;
};

const searchTagReducer: Reducer<SearchTagState, IAction> = (state = initialState.tag, action) => {
    let newState: SearchTagState = { ...initialState.tag };

    switch (action.type) {
        case SearchActionMap.REQUEST_TAG_QUERY:
            newState = {
                loading: true,
                success: null,
                error: null,
            };
            break;

        case SearchActionMap.REQUEST_TAG_QUERY_SUCCESS:
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

        case SearchActionMap.REQUEST_TAG_QUERY_ERROR:
            newState = {
                ...state,
                data: action.payload,
                loading: false,
                success: null,
                error: null,
            };
            break;

        default:
            newState = { ...state };
            break;
    }

    return newState;
};

export const searchReducer: Reducer<SearchState, IAction> = (state = initialState, action) => {
    return {
        ...state,
        major: searchMagorReducer(state.major, action),
        institution: searchInstitutionReducer(state.institution, action),
        tag: searchTagReducer(state.tag, action),
    };
};
