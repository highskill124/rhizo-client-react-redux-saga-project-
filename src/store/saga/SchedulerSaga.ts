import { call, put } from 'redux-saga/effects';
import { HttpService } from '../service/HttpService';
import { Api } from '../../settings/Api';
import { IAction, AppError } from '../core';
import { requestGetrequestGetSchedulerError, requestGetSchedulerSuccess } from '../state/SchedulerState';
import { openFlashMessage } from '../state/PageState';
import { extractUser } from '../dto/user/IUser';

function* getScheduler(action: IAction) {
    try {
        const url = `${Api.schedulerList}`;
        const data = yield call(HttpService.get, url);
        console.log("data", data)
        yield put(requestGetSchedulerSuccess(data));
    } catch (error: any) {
        console.log("error", error)
        // yield put(requestGetrequestGetSchedulerError(error.message));
        // yield put(openFlashMessage(error.extractFlashMessage()));
    }
}

export const SchedulerSaga = {
    getScheduler,
};
