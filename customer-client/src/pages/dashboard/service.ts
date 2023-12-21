import { AxiosError, AxiosResponse } from 'axios';
import API from '../../utils/api';
import endpoints from './endpoints.json';

const login = async ({ username, password }: { username: string, password: string}) => {
    return await API.post(endpoints.login, { username, password })
    .then(function (response: AxiosResponse) {
    return response?.data;
    })
    .catch(function (error: AxiosError) {
    return error;
    });
};

export const setToken = (token: string) => localStorage.setItem("token", token);

export const setAuthorizationToken = (token: string) => {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

export default {

}