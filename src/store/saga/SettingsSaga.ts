import { call, put } from 'redux-saga/effects';
import { HttpService } from '../service/HttpService';
import { Api } from '../../settings/Api';
import { IAction } from '../core';
import { requestEducationLevelListSuccess, requestEducationLevelListError, requestGenderPronounsListSuccess, requestGenderPronounsListError } from '../state/SettingsState';
import { openFlashMessage } from '../state/PageState';

const extractEducationLevelList = (data) => {
    return data.results.map((x) => ({ label: x.title, value: x.id }));
};

const extractGenderPronounsList = (data) => {
    return data.results.map((x) => ({ label: x.title, value: x.id }));
};

function* educationLevelListWorker(action: IAction) {
    try {
        const data = yield call(HttpService.get, Api.educationLevelList);
        yield put(requestEducationLevelListSuccess(extractEducationLevelList(data)));
    } catch (error: any) {
        yield put(requestEducationLevelListError(error.message));
        yield put(openFlashMessage(error.extractFlashMessage()));
    }
}

function* genderPronounsListWorker(action: IAction) {
    try {
        const data = yield call(HttpService.get, Api.genderPronounsList);
        yield put(requestGenderPronounsListSuccess(extractGenderPronounsList(data)));
    } catch (error: any) {
        yield put(requestGenderPronounsListError(error.message));
        yield put(openFlashMessage(error.extractFlashMessage()));
    }
}

export const SettingsSaga = {
    educationLevelListWorker,
    genderPronounsListWorker,
};
