import { debounce, takeLatest } from 'redux-saga/effects';
import { MenuActionMap } from '../state/MenuState';
import { MenuSaga } from './MenuSaga';
import { AuthActionMap } from '../state/AuthState';
import { SchedulerActionMap } from '../state/SchedulerState';
import { AuthSaga } from './AuthSaga';
import { SearchActionMap } from '../state/SearchState';
import { SearchSaga } from './SearchSaga';
import { ProfileActionMap } from '../state/ProfileState';
import { ProfileSaga } from './ProfileSaga';
import { SettingsActionMap } from '../state/SettingsState';
import { SettingsSaga } from './SettingsSaga';

import { SchedulerSaga } from './SchedulerSaga';

export function* SagaWatcher() {
    yield takeLatest(SettingsActionMap.REQUEST_EDUCATION_LEVEL_LIST, SettingsSaga.educationLevelListWorker);
    yield takeLatest(SettingsActionMap.REQUEST_GENDER_PRONOUNS_LIST, SettingsSaga.genderPronounsListWorker);

    yield takeLatest(AuthActionMap.REQUEST_LOGIN, AuthSaga.loginWorker);
    yield takeLatest(AuthActionMap.REQUEST_SIGN_UP, AuthSaga.signUpWorker);
    yield takeLatest(AuthActionMap.REQUEST_FORGOT_PASSWORD, AuthSaga.forgotPasswordWorker);

    yield takeLatest(MenuActionMap.REQUEST_MENU_LIST, MenuSaga.GetMenuWorker);

    yield takeLatest(ProfileActionMap.REQUEST_GET_PROFILE, ProfileSaga.getProfileWorker);

    yield takeLatest(ProfileActionMap.REQUEST_UPDATE_USER_PROFILE, ProfileSaga.updateUserWorker);
    yield takeLatest(ProfileActionMap.REQUEST_UPDATE_STUDENT_PROFILE, ProfileSaga.updateStudentWorker);
    yield takeLatest(ProfileActionMap.REQUEST_UPDATE_TUTOR_PROFILE, ProfileSaga.updateTutorWorker);

    yield takeLatest(SchedulerActionMap.REQUEST_GET_SCHEDULER, SchedulerSaga.getScheduler);

    yield debounce(200, SearchActionMap.REQUEST_MAJOR_QUERY, SearchSaga.majorSearchWorker);
    yield debounce(200, SearchActionMap.REQUEST_INSTITUTION_QUERY, SearchSaga.institutionSearchWorker);
    yield debounce(200, SearchActionMap.REQUEST_TAG_QUERY, SearchSaga.tagSearchWorker);
}
