import axios from 'axios';

const api = axios.create({
    //baseURL: 'https://api.varsolutions.com.br/webApiEsperanca/'
      baseURL: 'https://www.webapiesperanca.online/webApiNet8/api/'
    //baseURL: 'http://localhost:5026/'
    //baseURL: 'https://localhost:7277/api/'
});


api.interceptors.request.use(
    async (config) => {
        var token = localStorage.getItem("usr_token");

        api.defaults.headers.authorization = `Bearer ${token}`;
        config.headers = {
            Authorization: `Bearer ${token}`,
        };

        if (config.url.includes('Usuario'))
            return config;
        if (config.url.includes('Autenticacao'))
            return config;
        if (!token) {
            //window.location.href = '/login';
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

api.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("usr_refreshToken");

                if (refreshToken) {
                    const refreshResponse = await fetch('https://localhost:7277/api/Login/refresh-login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${refreshToken}`
                        }
                    });

                    if (refreshResponse.status === 200) {
                        const data = await refreshResponse.json();
                        localStorage.setItem('usr_token', data.accesstoken);
                        localStorage.setItem('usr_refreshToken', data.refreshToken);

                        api.defaults.headers.Authorization = `Bearer ${data.accesstoken}`;

                        originalRequest.headers.Authorization = `Bearer ${data.accesstoken}`;
                        return api(originalRequest);
                    }

                    if (refreshResponse.status === 401)
                        window.location.href = '/login';
                }
            } catch (fetchError) {
                window.location.href = '/login';
            }
        }
        if (error.response && error.response.status === 403) {
            //window.location.href = '/login';
        }

        return error.response;
    }
);
export default api;