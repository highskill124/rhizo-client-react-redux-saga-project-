import { Reducer } from 'redux';
import { AppAction, IAction } from '../core';
import { IUser } from '../dto/user/IUser';

// --- Action Type--- //
export const ProfileActionMap = {
    SET_USER_PROFILE: '@profile/set-user-profile',
    SET_USER_TYPE: '@profile/set-user-type',
    REQUEST_CREATE_USER_PROFILE: '@profile/request-create-user-profile',
    REQUEST_CREATE_USER_PROFILE_SUCCESS: '@profile/request-create-user-profile-success',
    REQUEST_CREATE_USER_PROFILE_ERROR: '@profile/request-create-user-profile-error',

    REQUEST_GET_PROFILE: '@profile/request-get-profile',

    REQUEST_GET_USER_PROFILE: '@profile/request-get-user-profile',
    REQUEST_GET_USER_PROFILE_SUCCESS: '@profile/request-get-user-profile-success',
    REQUEST_GET_USER_PROFILE_ERROR: '@profile/request-get-user-profile-error',

    REQUEST_UPDATE_USER_PROFILE: '@profile/request-update-user-profile',
    REQUEST_UPDATE_USER_PROFILE_SUCCESS: '@profile/request-update-user-profile-success',
    REQUEST_UPDATE_USER_PROFILE_ERROR: '@profile/request-update-user-profile-error',

    REQUEST_CREATE_STUDENT_PROFILE: '@profile/request-create-student-profile',
    REQUEST_CREATE_STUDENT_PROFILE_SUCCESS: '@profile/request-create-student-profile-success',
    REQUEST_CREATE_STUDENT_PROFILE_ERROR: '@profile/request-create-student-profile-error',

    REQUEST_GET_STUDENT_PROFILE: '@profile/request-get-student-profile',
    REQUEST_GET_STUDENT_PROFILE_SUCCESS: '@profile/request-get-student-profile-success',
    REQUEST_GET_STUDENT_PROFILE_ERROR: '@profile/request-get-student-profile-error',

    REQUEST_UPDATE_STUDENT_PROFILE: '@profile/request-update-student-profile',
    REQUEST_UPDATE_STUDENT_PROFILE_SUCCESS: '@profile/request-update-student-profile-success',
    REQUEST_UPDATE_STUDENT_PROFILE_ERROR: '@profile/request-update-student-profile-error',

    REQUEST_CREATE_TUTOR_PROFILE: '@profile/request-create-tutor-profile',
    REQUEST_CREATE_TUTOR_PROFILE_SUCCESS: '@profile/request-create-tutor-profile-success',
    REQUEST_CREATE_TUTOR_PROFILE_ERROR: '@profile/request-create-tutor-profile-error',

    REQUEST_GET_TUTOR_PROFILE: '@profile/request-get-tutor-profile',
    REQUEST_GET_TUTOR_PROFILE_SUCCESS: '@profile/request-get-tutor-profile-success',
    REQUEST_GET_TUTOR_PROFILE_ERROR: '@profile/request-get-tutor-profile-error',

    REQUEST_UPDATE_TUTOR_PROFILE: '@profile/request-update-tutor-profile',
    REQUEST_UPDATE_TUTOR_PROFILE_SUCCESS: '@profile/request-update-tutor-profile-success',
    REQUEST_UPDATE_TUTOR_PROFILE_ERROR: '@profile/request-update-tutor-profile-error',

    RESET: '@profile/reset',
};

export type UserProfileState = Readonly<{
    loading?: boolean;
    error?: any;
    success?: any;
    data?: IUser;
    isTutor?: boolean;
}>;

export type StudentProfileState = Readonly<{
    loading?: boolean;
    error?: any;
    success?: any;
    data?: any;
}>;

export type TutorProfileState = Readonly<{
    loading?: boolean;
    error?: any;
    success?: any;
    data?: any;
}>;

export type ProfileState = Readonly<{
    isUserProfileCompleted?: boolean;
    isStudentProfileCompleted?: boolean;
    isTutorProfileCompleted?: boolean;
    user?: UserProfileState;
    student?: StudentProfileState;
    tutor?: TutorProfileState;
}>;

const initialState: ProfileState = {
    user: null,
    student: null,
    tutor: null,
};

export const setUserProfile = (payload) => AppAction.create(ProfileActionMap.SET_USER_PROFILE, payload);

export const requestGetProfile = () => AppAction.create(ProfileActionMap.REQUEST_GET_PROFILE);

export const requestGetUserProfile = () => AppAction.create(ProfileActionMap.REQUEST_GET_USER_PROFILE);
export const requestGetUserProfileSuccess = (payload) => AppAction.create(ProfileActionMap.REQUEST_GET_USER_PROFILE_SUCCESS, payload);
export const requestGetUserProfileError = (payload) => AppAction.create(ProfileActionMap.REQUEST_GET_USER_PROFILE_ERROR, payload);

export const requestCreateUserProfile = () => AppAction.create(ProfileActionMap.REQUEST_CREATE_USER_PROFILE);
export const requestCreateUserProfileSuccess = (payload) => AppAction.create(ProfileActionMap.REQUEST_CREATE_USER_PROFILE_SUCCESS, payload);
export const requestCreateUserProfileError = (payload) => AppAction.create(ProfileActionMap.REQUEST_CREATE_USER_PROFILE_ERROR, payload);

export const requestUpdateUserProfile = (payload) => AppAction.create(ProfileActionMap.REQUEST_UPDATE_USER_PROFILE, payload);
export const requestUpdateUserProfileSuccess = (payload) => AppAction.create(ProfileActionMap.REQUEST_UPDATE_USER_PROFILE_SUCCESS, payload);
export const requestUpdateUserProfileError = (payload) => AppAction.create(ProfileActionMap.REQUEST_UPDATE_USER_PROFILE_ERROR, payload);

export const requestGetStudentProfile = () => AppAction.create(ProfileActionMap.REQUEST_GET_STUDENT_PROFILE);
export const requestGetStudentProfileSuccess = (payload) => AppAction.create(ProfileActionMap.REQUEST_GET_STUDENT_PROFILE_SUCCESS, payload);
export const requestGetStudentProfileError = (payload) => AppAction.create(ProfileActionMap.REQUEST_GET_STUDENT_PROFILE_ERROR, payload);

export const requestCreateStudentProfile = () => AppAction.create(ProfileActionMap.REQUEST_CREATE_STUDENT_PROFILE);
export const requestCreateStudentProfileSuccess = (payload) => AppAction.create(ProfileActionMap.REQUEST_CREATE_STUDENT_PROFILE_SUCCESS, payload);
export const requestCreateStudentProfileError = (payload) => AppAction.create(ProfileActionMap.REQUEST_CREATE_STUDENT_PROFILE_ERROR, payload);

export const requestUpdateStudentProfile = (payload) => AppAction.create(ProfileActionMap.REQUEST_UPDATE_STUDENT_PROFILE, payload);
export const requestUpdateStudentProfileSuccess = (payload) => AppAction.create(ProfileActionMap.REQUEST_UPDATE_STUDENT_PROFILE_SUCCESS, payload);
export const requestUpdateStudentProfileError = (payload) => AppAction.create(ProfileActionMap.REQUEST_UPDATE_STUDENT_PROFILE_ERROR, payload);

export const requestGetTutorProfile = () => AppAction.create(ProfileActionMap.REQUEST_GET_TUTOR_PROFILE);
export const requestGetTutorProfileSuccess = (payload) => AppAction.create(ProfileActionMap.REQUEST_GET_TUTOR_PROFILE_SUCCESS, payload);
export const requestGetTutorProfileError = (payload) => AppAction.create(ProfileActionMap.REQUEST_GET_TUTOR_PROFILE_ERROR, payload);

export const requestCreateTutorProfile = () => AppAction.create(ProfileActionMap.REQUEST_CREATE_TUTOR_PROFILE);
export const requestCreateTutorProfileSuccess = (payload) => AppAction.create(ProfileActionMap.REQUEST_CREATE_TUTOR_PROFILE_SUCCESS, payload);
export const requestCreateTutorProfileError = (payload) => AppAction.create(ProfileActionMap.REQUEST_CREATE_TUTOR_PROFILE_ERROR, payload);

export const requestUpdateTutorProfile = (payload) => AppAction.create(ProfileActionMap.REQUEST_UPDATE_TUTOR_PROFILE, payload);
export const requestUpdateTutorProfileSuccess = (payload) => AppAction.create(ProfileActionMap.REQUEST_UPDATE_TUTOR_PROFILE_SUCCESS, payload);
export const requestUpdateTutorProfileError = (payload) => AppAction.create(ProfileActionMap.REQUEST_UPDATE_TUTOR_PROFILE_ERROR, payload);

export const setUserType = (payload) => AppAction.create(ProfileActionMap.SET_USER_TYPE, payload);

const userProfileReducer: Reducer<UserProfileState, IAction> = (state = initialState.user, action) => {
    let newState: UserProfileState = {};
    switch (action.type) {
        case ProfileActionMap.SET_USER_PROFILE:
            newState = {
                ...state,
                loading: true,
                success: null,
                error: null,
                data: { ...action.payload },
            };
            break;

        case ProfileActionMap.SET_USER_TYPE:
            newState = {
                ...state,
                isTutor: action.payload,
            };
            break;

        case ProfileActionMap.REQUEST_CREATE_USER_PROFILE:
            newState = {
                ...state,
                loading: true,
                success: null,
                error: null,
                data: null,
            };
            break;

        case ProfileActionMap.REQUEST_CREATE_USER_PROFILE_SUCCESS:
            newState = {
                ...state,
                loading: false,
                success: {
                    message: `success`,
                },
                error: null,
                data: { ...action.payload },
            };
            break;

        case ProfileActionMap.REQUEST_CREATE_USER_PROFILE_ERROR:
            newState = {
                ...state,
                error: action.payload.error,
                loading: false,
                success: null,
                data: null,
            };
            break;
        case ProfileActionMap.REQUEST_GET_USER_PROFILE:
            newState = {
                ...state,
                loading: true,
                success: null,
                error: null,
                data: null,
            };
            break;

        case ProfileActionMap.REQUEST_GET_USER_PROFILE_SUCCESS:
            newState = {
                ...state,
                loading: false,
                success: {
                    message: `success`,
                },
                error: null,
                data: { ...action.payload },
            };
            break;

        case ProfileActionMap.REQUEST_GET_USER_PROFILE_ERROR:
            newState = {
                ...state,
                error: action.payload.error,
                loading: false,
                success: null,
                data: null,
            };
            break;
        case ProfileActionMap.REQUEST_UPDATE_USER_PROFILE:
            newState = {
                ...state,
                loading: true,
                success: null,
                error: null,
            };
            break;

        case ProfileActionMap.REQUEST_UPDATE_USER_PROFILE_SUCCESS:
            newState = {
                ...state,
                // data: { ...state.data, user: action.payload },
                loading: false,
                success: {
                    message: `success`,
                },
                error: null,
            };
            break;

        case ProfileActionMap.REQUEST_UPDATE_USER_PROFILE_ERROR:
            newState = {
                ...state,
                error: action.payload.error,
                loading: false,
                success: null,
            };
            break;

        default:
            newState = { ...state };
            break;
    }
    return newState;
};

const studentProfileReducer: Reducer<StudentProfileState, IAction> = (state = initialState.student, action) => {
    let newState: StudentProfileState = {};
    switch (action.type) {
        case ProfileActionMap.REQUEST_CREATE_STUDENT_PROFILE:
            newState = {
                ...state,
                loading: true,
                success: null,
                error: null,
                data: [],
            };
            break;

        case ProfileActionMap.REQUEST_CREATE_STUDENT_PROFILE_SUCCESS:
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

        case ProfileActionMap.REQUEST_CREATE_STUDENT_PROFILE_ERROR:
            newState = {
                ...state,
                error: action.payload.error,
                loading: false,
                success: null,
                data: [],
            };
            break;
        case ProfileActionMap.REQUEST_GET_STUDENT_PROFILE:
            newState = {
                ...state,
                loading: true,
                success: null,
                error: null,
                data: [],
            };
            break;

        case ProfileActionMap.REQUEST_GET_STUDENT_PROFILE_SUCCESS:
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

        case ProfileActionMap.REQUEST_GET_STUDENT_PROFILE_ERROR:
            newState = {
                ...state,
                error: action.payload.error,
                loading: false,
                success: null,
                data: [],
            };
            break;
        case ProfileActionMap.REQUEST_UPDATE_STUDENT_PROFILE:
            newState = {
                ...state,
                loading: true,
                success: null,
                error: null,
                data: [],
            };
            break;

        case ProfileActionMap.REQUEST_UPDATE_STUDENT_PROFILE_SUCCESS:
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

        case ProfileActionMap.REQUEST_UPDATE_STUDENT_PROFILE_ERROR:
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

const tutorProfileReducer: Reducer<TutorProfileState, IAction> = (state = initialState.tutor, action) => {
    let newState: TutorProfileState = {};
    switch (action.type) {
        case ProfileActionMap.REQUEST_CREATE_TUTOR_PROFILE:
            newState = {
                ...state,
                loading: true,
                success: null,
                error: null,
                data: [],
            };
            break;

        case ProfileActionMap.REQUEST_CREATE_TUTOR_PROFILE_SUCCESS:
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

        case ProfileActionMap.REQUEST_CREATE_TUTOR_PROFILE_ERROR:
            newState = {
                ...state,
                error: action.payload.error,
                loading: false,
                success: null,
                data: [],
            };
            break;
        case ProfileActionMap.REQUEST_GET_TUTOR_PROFILE:
            newState = {
                ...state,
                loading: true,
                success: null,
                error: null,
                data: [],
            };
            break;

        case ProfileActionMap.REQUEST_GET_TUTOR_PROFILE_SUCCESS:
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

        case ProfileActionMap.REQUEST_GET_TUTOR_PROFILE_ERROR:
            newState = {
                ...state,
                error: action.payload.error,
                loading: false,
                success: null,
                data: [],
            };
            break;
        case ProfileActionMap.REQUEST_UPDATE_TUTOR_PROFILE:
            newState = {
                ...state,
                loading: true,
                success: null,
                error: null,
                data: [],
            };
            break;

        case ProfileActionMap.REQUEST_UPDATE_TUTOR_PROFILE_SUCCESS:
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

        case ProfileActionMap.REQUEST_UPDATE_TUTOR_PROFILE_ERROR:
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

export const profileReducer: Reducer<ProfileState, IAction> = (state = initialState, action) => {
    return {
        ...state,
        user: userProfileReducer(state.user, action),
        student: studentProfileReducer(state.student, action),
        tutor: tutorProfileReducer(state.tutor, action),
    };
};
