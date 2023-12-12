import React, { createContext, useContext, useEffect, useState } from 'react';


const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null)
    const [token, setToken] = useState('')

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
    };

    const setUserDetailsFunctions = (user) => {
        setUserDetails(user)
    }

    const setTokenFunction = (token) => {
        setToken(token)
    }

    useEffect(() => {
        console.log('userDetails', userDetails)
        console.log('token', token)
    }, [userDetails, token])




    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, setUserDetailsFunctions, setTokenFunction }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuth };

