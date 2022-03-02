import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    user: null,
    login: (token) => {},
    logout: () => {}
});

export const AuthContextProvider = (props) => {
    const localToken = localStorage.getItem('token');
    const [token, setToken] = useState(localToken);
    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    };

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        user: null,
        login: loginHandler,
        logout: logoutHandler
    };
    return (
        /* eslint react/prop-types: 0 */
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

// AuthContextProvider.propTypes = {
//     children: any
// };

export default AuthContext;
