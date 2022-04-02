import { call, put } from 'redux-saga/effects';
import jwt from 'jsonwebtoken';
import { HttpService } from '../service/HttpService';
import { Api } from '../../settings/Api';
import { IAction } from '../core';
import { requestGetUserProfileError, requestGetUserProfileSuccess, requestUpdateStudentProfileError, requestUpdateStudentProfileSuccess, requestUpdateTutorProfileError, requestUpdateTutorProfileSuccess, requestUpdateUserProfileError, requestUpdateUserProfileSuccess } from '../state/ProfileState';
import { openFlashMessage } from '../state/PageState';
import { extractUser } from '../dto/user/IUser';

function* getProfileWorker(action: IAction) {
    try {
        const authToken = yield localStorage.getItem('authToken');
        const decoded = jwt.decode(authToken);
        const userId = decoded.rhizo_user_id;
        const url = `${Api.getProfile}${userId}/`;
        const data = yield call(HttpService.get, url);
        console.log(data);
        yield put(requestGetUserProfileSuccess(extractUser(data)));
    } catch (error: any) {
        yield put(requestGetUserProfileError(error.message));
        yield put(openFlashMessage(error.extractFlashMessage()));
    }
}

function* updateUserWorker(action: IAction) {
    try {
        const url = `${Api.updateUser}`;
        const data = yield call(HttpService.post, url, action.payload);
        console.log(data);
        yield put(requestUpdateUserProfileSuccess(extractUser(data)));
    } catch (error: any) {
        yield put(requestUpdateUserProfileError(error.message));
        yield put(openFlashMessage(error.extractFlashMessage()));
    }
}

function* updateStudentWorker(action: IAction) {
    try {
        const url = `${Api.updateStudent}`;
        const data = yield call(HttpService.post, url, action.payload);
        yield put(requestUpdateStudentProfileSuccess(data));
    } catch (error: any) {
        yield put(requestUpdateStudentProfileError(error.message));
        yield put(openFlashMessage(error.extractFlashMessage()));
    }
}

function* updateTutorWorker(action: IAction) {
    try {
        const url = `${Api.updateTutor}`;
        const data = yield call(HttpService.put, url, action.payload);
        yield put(requestUpdateTutorProfileSuccess(data));
    } catch (error: any) {
        yield put(requestUpdateTutorProfileError(error.message));
        yield put(openFlashMessage(error.extractFlashMessage()));
    }
}

export const ProfileSaga = {
    updateUserWorker,
    updateStudentWorker,
    updateTutorWorker,
    getProfileWorker,
};
