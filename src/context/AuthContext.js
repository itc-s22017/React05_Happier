import { createContext, useContext, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import axios from "../utils/axios"

const AuthContext = createContext();

export function useAuthContext() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const { user, login, signup, setUser, getUser, logout } = useAuth();

    useEffect(() => {
        const test = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                await getUser();
            } else {
                setUser(null);
            }
        }
        test()
    }, [getUser, setUser]);


    const value = {
        user,
        setUser,
        login,
        signup,
        logout,

    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}