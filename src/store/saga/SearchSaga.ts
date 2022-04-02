import { call, put } from 'redux-saga/effects';
import { HttpService } from '../service/HttpService';
import { Api } from '../../settings/Api';
import { IAction } from '../core';
import { requestMajorQueryError, requestMajorQuerySuccess, requestInstitutionQuerySuccess, requestInstitutionQueryError, requestTagQuerySuccess, requestTagQueryError } from '../state/SearchState';
// import majourData from '../../util/mock-api/data/search-major';
// import { MockApi } from '../../util/mock-api/MockApi';

function* majorSearchWorker(action: IAction) {
    try {
        const url = `${Api.searchMajor}?search=${action.payload.query ? action.payload.query : ''}&limit=100`;
        const data = yield call(HttpService.get, url);
        // const data = yield call(MockApi.request, { data: majourData });
        yield put(requestMajorQuerySuccess(data));
    } catch (error: any) {
        yield put(requestMajorQueryError(error.message));
    }
}
function* institutionSearchWorker(action: IAction) {
    try {
        const url = `${Api.searchInstitution}?search=${action.payload.query ? action.payload.query : ''}&limit=100`;
        const data = yield call(HttpService.get, url);
        // const data = yield call(MockApi.request, { data: majourData });
        yield put(requestInstitutionQuerySuccess(data));
    } catch (error: any) {
        yield put(requestInstitutionQueryError(error.message));
    }
}
function* tagSearchWorker(action: IAction) {
    try {
        const url = `${Api.searchTag}?search=${action.payload.query ? action.payload.query : ''}&limit=100`;
        const data = yield call(HttpService.get, url);
        // const data = yield call(MockApi.request, { data: majourData });
        yield put(requestTagQuerySuccess(data));
    } catch (error: any) {
        yield put(requestTagQueryError(error.message));
    }
}

export const SearchSaga = {
    majorSearchWorker,
    institutionSearchWorker,
    tagSearchWorker,
};
