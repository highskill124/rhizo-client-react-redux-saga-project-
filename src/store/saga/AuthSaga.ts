import { call, put } from 'redux-saga/effects';
import { HttpService } from '../service/HttpService';
import { Api } from '../../settings/Api';
import { IAction, AppError } from '../core';
import { requestLoginSuccess, requestLoginError, requestSignUpSuccess, requestSignUpError, requestForgotPasswordSuccess, requestForgotPasswordError } from '../state/AuthState';
import { setUserProfile } from '../state/ProfileState';
import { openFlashMessage } from '../state/PageState';
import { extractUser } from '../dto/user/IUser';

function* loginWorker(action: IAction) {
    try {
        const data = yield call(HttpService.post, Api.login, action.payload);
        console.log(data);
        yield localStorage.setItem('authToken', data.access);
        yield localStorage.setItem('isAuthenticated', 'true');
        yield put(requestLoginSuccess(data));
        yield put(setUserProfile(extractUser(data)));
        // yield localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error: any) {
        yield put(requestLoginError(error.message));
        yield put(openFlashMessage(error.extractFlashMessage()));
    }
}

function* signUpWorker(action: IAction) {
    console.log('>>>>> ==');
    try {
        const data = yield call(HttpService.post, Api.signUp, action.payload);
        yield localStorage.setItem('authToken', data.token);
        yield localStorage.setItem('isAuthenticated', 'true');
        yield put(requestSignUpSuccess(data));
        yield put(setUserProfile(data.user));
        // yield localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error: any) {
        yield put(requestSignUpError(error.message));
        yield put(openFlashMessage(error.extractFlashMessage()));
    }
}

function* forgotPasswordWorker(action: IAction) {
    try {
        const data = yield call(HttpService.post, Api.forgotPassword, action.payload);
        yield put(requestForgotPasswordSuccess(data));
    } catch (error: any) {
        yield put(requestForgotPasswordError(error));
        yield put(openFlashMessage({ open: true, message: error.message, severity: 'error' }));
    }
}

export const AuthSaga = {
    loginWorker,
    signUpWorker,
    forgotPasswordWorker,
};
