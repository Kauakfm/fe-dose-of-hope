import React, { createContext, useState } from "react";
import api from "../../../services/api";
import { parseJwt } from "../../../utils/utils";


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const handleLogin = async (email, password) => {
        try {
            const response = await api.post('Login', { email: email, password: password })
            const decodeToken = parseJwt(response.data.accesstoken)
            if (response.status === 200) {
                window.localStorage.setItem('role', decodeToken.role);

                return response;
            }
            return response;

        } catch (error) {

        }
    }

    const handleLogout = () => {
        localStorage.removeItem('usr_token');
        localStorage.removeItem('usr_refreshToken');
        localStorage.removeItem('role');
    };

    return (
        <AuthContext.Provider value={{ handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );

}