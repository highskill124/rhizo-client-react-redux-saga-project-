import { Reducer } from 'redux';
import { IAction, AppAction } from '../core';

// --- Scheduler Type--- //
export const SchedulerActionMap = {
    SET_SCHEDULER: '@scheduler/set-scheduler',

    REQUEST_GET_SCHEDULER: '@scheduler/request-get-scheduler',
    REQUEST_GET_SCHEDULER_SUCCESS: '@scheduler/request-get-scheduler-success',
    REQUEST_GET_SCHEDULER_ERROR: '@scheduler/request-get-scheduler-error',

    RESET: '@scheduler/reset',
};

// --- Action Creator --- //

export const requestGetScheduler = () => AppAction.create(SchedulerActionMap.REQUEST_GET_SCHEDULER);
export const requestGetSchedulerSuccess = (payload) => AppAction.create(SchedulerActionMap.REQUEST_GET_SCHEDULER_SUCCESS, payload);
export const requestGetrequestGetSchedulerError = (payload) => AppAction.create(SchedulerActionMap.REQUEST_GET_SCHEDULER_ERROR, payload);

export const reset = () => AppAction.create(SchedulerActionMap.RESET);

export type SchedulerState = Readonly<{
    loading?: boolean;
    error?: any;
    success?: any;
    data?: any;
}>;

const initialState: SchedulerState = {
    data: [],
};

export const schedulerReducer: Reducer<SchedulerState, IAction> = (state = initialState.data, action) => {
    let newState: SchedulerState = { data: [] };

    switch (action.type) {
        case SchedulerActionMap.REQUEST_GET_SCHEDULER:
            newState = {
                ...state,
                loading: true,
                success: null,
                error: null,
                data: [],
            };
            break;

        case SchedulerActionMap.REQUEST_GET_SCHEDULER_SUCCESS:
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

        case SchedulerActionMap.REQUEST_GET_SCHEDULER_ERROR:
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
