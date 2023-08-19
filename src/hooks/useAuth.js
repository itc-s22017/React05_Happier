import { useCallback, useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    const signup = async (data) => {
        try {
            const response = await axios.post('/auth/signup', data);
            const token = response.data.token;
            const refresh_token = response.data.refresh_token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
            localStorage.setItem('refresh_token', refresh_token);
            await getUser();
            navigate('/Happier/login');
        } catch (error) {
            console.log(error);
        }
    };

    const login = async (data) => {
        try {
            const response = await axios.post('/auth/login', data);
            const token = response.data.token;
            const refresh_token = response.data.refresh_token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
            localStorage.setItem('refresh_token', refresh_token);
            await getUser();
            navigate('/Happier');
        } catch (error) {
            console.log(error);
        }
    };

    const logout = useCallback(async () => {
        const token = null;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(null);
        const refresh_token = localStorage.getItem('refresh_token');
        if (refresh_token) {
            await axios.delete('/auth/remove_token', {
                refresh_token,
            });
        }
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');


        navigate('/Happier/login');
        //eslint-disable-next-line
    }, []);


    const getUser = useCallback(async () => {
        try {
            const response = await axios.get('/auth/user');
            const user = response.data.user;
            setUser(user);
            console.log(user)
        } catch (error) {
            console.log("JWTトークンの期限が切れてるよおおおお！");
            logout()
        }
    }, [logout]);

    return { user, signup, login, setUser, getUser, logout };
};

export default useAuth;