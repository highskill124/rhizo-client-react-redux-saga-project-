import { EducationLevel, Profile, Role } from '../../../settings';

export interface IBasicProfile {
    dateOfBirth: Date;
    educationLevel: string;
    genderPronoun: string;
    profileType: string;
}

export interface IOnboardingStage {
    onboardUser: boolean;
    onboardStudent: boolean;
    onboardMentor: boolean;
}

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    isActive: string;
    isEmailVerified: boolean;

    onboardingStage: IOnboardingStage;
    basicProfile: IBasicProfile;
}

export const extractOnboardingStage = (data) => {
    const dict: IOnboardingStage = {
        onboardUser: data.onboardUser,
        onboardStudent: data.onboardStudent,
        onboardMentor: data.onboardMentor,
    };

    return dict;
};

export const extractBasicProfile = (data) => {
    const dict: IBasicProfile = {
        dateOfBirth: data.dateOfBirth,
        educationLevel: data.educationLevel,
        genderPronoun: data.genderPronoun,
        profileType: data.profileType,
    };

    return dict;
};

export const extractUser = (data) => {
    const user: IUser = {
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        isActive: data.user.isActive,
        isEmailVerified: data.user.isEmailVerified,

        onboardingStage: extractOnboardingStage(data),
        basicProfile: extractBasicProfile(data),
    };

    console.log(user);

    return user;
};
