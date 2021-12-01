import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { },
});

export const AuthContextProvider = (props) => {
    console.log(props.children)
    const [token, setToken] = useState(null);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
    };

    const logoutHandler = () => {
        setToken(null);
    };

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
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