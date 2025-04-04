import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Hoc = (WrappedComponent) => (props) => {
    const { login, user } = useSelector((state) => state.authReducer);
    const storedUserId = localStorage.getItem("userId");

    if (!login && !storedUserId) {
        return <Navigate to='/login' replace />;
    }

    return <WrappedComponent {...props} />;
};

export default Hoc;
