import { AxiosError, AxiosResponse } from 'axios';
import API from '../../utils/api';
import endpoints from './endpoints.json';

const login = async ({ email, password }: { email: string, password: string}) => {
    return await API.post(endpoints.login, { email, password })
    .then(function (response: AxiosResponse) {
    return response?.data;
    })
    .catch(function (error: AxiosError) {
    return error;
    });
};

const refreshToken = async () => {
    return await API.post(endpoints.refresh_token)
    .then(function (response: AxiosResponse) {
    return response?.data;
    })
    .catch(function (error: AxiosError) {
    return error;
    });
};

const getMe = async () => {
    return await API.post(endpoints.getMe)
    .then(function (response: AxiosResponse) {
    return response?.data;
    })
    .catch(function (error: AxiosError) {
    return error;
    });
};

const setToken = (token: string) => localStorage.setItem("token", token);

const setRefreshToken = (token: string) => localStorage.setItem("refresh_token", token);

const setAuthorizationToken = (token: string) => {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default {
    login,
    refreshToken,
    getMe,
    setToken,
    setRefreshToken,
    setAuthorizationToken
}