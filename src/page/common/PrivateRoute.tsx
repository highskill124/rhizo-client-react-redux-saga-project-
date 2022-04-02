import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/state/RootReducer';

const PrivateRoute = ({ children, ...rest }) => {
    const authenticated = localStorage.getItem('isAuthenticated') && JSON.parse(localStorage.getItem('isAuthenticated'));

    return (
        <Route
            {...rest}
            render={({ location }) => {
                return authenticated === true ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/sign-in',
                            state: { from: location },
                        }}
                    />
                );
            }}
        />
    );
};

export default PrivateRoute;
