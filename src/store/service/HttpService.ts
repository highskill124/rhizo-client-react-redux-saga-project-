/* eslint-disable no-console */
import Axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';

import { Api } from '../../settings/Api';
import { CaseUtil } from '../../util/case-util';
import { AppError } from '../core';

const httpClient: AxiosInstance = Axios.create({
    baseURL: Api.baseUrl,
});

httpClient.defaults.timeout = 10000;
httpClient.defaults.headers.common['Content-Type'] = 'application/json';
httpClient.defaults.headers.common.Accept = 'application/json';

httpClient.interceptors.request.use(
    async (cnf) => {
        const config: AxiosRequestConfig = { ...cnf };
        const authToken = await localStorage.getItem('authToken');
        if (authToken) {
            // config.headers.Authorization = `token ${authToken}`;
            // config.headers.Authorization = `bearer ${authToken}`;
            config.headers.Authorization = `JWT ${authToken}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

httpClient.interceptors.response.use(
    (response) => {
        // return response.data;
        return CaseUtil.camelCaseTransform(response.data);
    },
    (error) => {
        if (error.response.status === 500) {
            // TODO
        } else if (error.response.status === 403) {
            // TODO
        } else if (error.response.status === 404) {
            // TODO
        } else if (error.response.status === 400) {
            // return Promise.reject(new Error(error.response.data));
        } else if (error.response.status === 409) {
            // TODO
        } else if (error.response.status === 401) {
            localStorage.clear();
            // window.location.href = '/';
        }
        console.log('error');
        console.log(error);
        console.log(error.response);
        const { data } = error.response;

        // return Promise.reject(error);
        return Promise.reject(new AppError(data));
    },
);

const request = async (url: string, method: Method, data?: any) => {
    // const response = await httpClient({ url, method, data });
    const response = await httpClient({ url, method, data: CaseUtil.snakeCaseTransform(data) });

    return response;
};

export const HttpService = {
    request,
    get: (url) => request(url, 'GET'),
    post: (url, data) => request(url, 'POST', data),
    put: (url, data) => request(url, 'PUT', data),
    delete: (url, data) => request(url, 'DELETE', data),
};
