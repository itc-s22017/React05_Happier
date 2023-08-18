import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalConfig = error.config;
        if (
            error.response.status === 401 &&
            originalConfig.url === '/auth/refresh_token'
        ) {
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            const refresh_token = localStorage.getItem('refresh_token');
            return axios
                .post('/auth/refresh_token', {
                    refresh_token,
                })
                .then((response) => {
                    originalConfig.headers[
                        'Authorization'
                    ] = `Bearer ${response.data.token}`;
                    localStorage.setItem('token', response.data.token);
                    console.log('new token', response.data.token);
                    return axios(originalConfig);
                });
        }
        return Promise.reject(error);
    }
);
export default axios;