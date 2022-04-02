import React from 'react';

import './App.scss';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import FourNotFourPage from './page/404/FourNotFourPage';
import SignInPage from './page/auth/SignInPage';
import SignUpPage from './page/auth/SignUpPage';
import SelectUserType from './page/profile/SelectUserType';
import DashboardPage from './page/dashboard/DashboardPage';
import PrivateRoute from './page/common/PrivateRoute';
import ForgotPasswordPage from './page/auth/ForgotPassowrdPage';
import PlayGroundPage from './page/playground/PlayGroundPage';
import ExploreTutorPage from './page/explore/ExploreTutorPage';
import Settings from './page/settings/Settings';
import StudentLandingPage from './page/landing/StudentLandingPage';
import TutorLandingPage from './page/landing/TutorLandingPage';
import MySession from './page/mysession/MySession';
import ProfileCompletion from './page/profile/ProfileCompletion';
import StudentProfile from './page/profile/steps/StudentProfile';
import PreRegistration from './page/profile/preregistration/PreRegistration';
import TutorProfile from './page/profile/TutorProfile';
import Scheduler from './page/scheduler/Scheduler';
import UIFlashMessage, { UIFlashMessageProvider } from './page/common/UIFlashMessage';
import UserProfilePage from './page/profile/onboarding/UserProfilePage';
import StudentProfilePage from './page/profile/onboarding/StudentProfilePage';

const App = () => {
    return (
        <UIFlashMessageProvider>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/sign-in" />
                    </Route>

                    <Route exact path="/sign-in">
                        <SignInPage />
                    </Route>

                    <Route path="/forgot-password">
                        <ForgotPasswordPage />
                    </Route>

                    <Route path="/registration">
                        <SignUpPage />
                    </Route>

                    <Route path="/profile/student">
                        <StudentProfile />
                    </Route>

                    <PrivateRoute path="/profile/tutor">
                        <TutorProfile />
                    </PrivateRoute>

                    <Route path="/onboard">
                        <SelectUserType />
                    </Route>

                    <Route path="/onboard-user">
                        <UserProfilePage />
                    </Route>

                    <Route path="/onboard-student">
                        <StudentProfilePage />
                    </Route>

                    <PrivateRoute path="/registration/complete-profile">
                        <ProfileCompletion />
                    </PrivateRoute>

                    <Route path="/scheduler">
                        <Scheduler />
                    </Route>

                    <PrivateRoute path="/explore">
                        <ExploreTutorPage />
                    </PrivateRoute>

                    <PrivateRoute path="/settings">
                        <Settings />
                    </PrivateRoute>

                    <PrivateRoute path="/sessions">
                        <MySession />
                    </PrivateRoute>

                    <PrivateRoute path="/landing/student">
                        <StudentLandingPage />
                    </PrivateRoute>

                    <PrivateRoute path="/landing/tutor">
                        <TutorLandingPage />
                    </PrivateRoute>

                    <Route path="*">
                        <FourNotFourPage />
                    </Route>
                </Switch>
            </Router>
            <UIFlashMessage />
        </UIFlashMessageProvider>
    );
};

export default App;
