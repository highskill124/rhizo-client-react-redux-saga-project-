const rhizoApiConfig = {
    baseUrl: 'https://api.rhizo.us',
    login: '/auth/',
    signUp: '/register/',

    forgotPassword: '/rest-auth/password/reset/',

    searchInstitution: '/institutions/',
    searchMajor: '/major/',
    searchCourse: '/courses/',
    searchTag: '/search/api/v1/tags/',
    searchTutor: '/search/api/v1/tutors/',

    updateUser: '/onboard-user/',
    updateStudent: '/onboard-student/',
    updateTutor: '/onboard-mentor/',

    getProfile: '/profile/',

    genderPronounsList: '/gender-pronouns/',
    educationLevelList: '/education-levels/',

    schedulerList: '/mentor-availability/',
};

// const rhizoMockApiConfig = {
//     baseUrl: 'http://127.0.0.1:4000',
//     login: '/api/auth/login',
//     signUp: '/api/auth/sign-up',
//     forgotPassword: '/rest-auth/password/reset/',

//     searchMajor: '/search/api/v1/majors/',
//     searchInstitution: '/search/api/v1/institutes/',
//     searchTag: '/search/api/v1/tags/',
//     searchTutor: '/search/api/v1/tutors/',
//     searchCourse: '/search/api/v1/course-search/',

//     updateUser: '/rest-auth/user/',
//     updateStudent: '/student/api/v1/student-profile-details/',
//     updateTutor: '/tutor/api/v1/tutor-profile-details/',
// };

// export const Api = rhizoMockApiConfig;
export const Api = rhizoApiConfig;
