import axios, { CancelTokenSource } from 'axios';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import { Api } from '../../../settings/Api';
import { CaseUtil } from '../../../util/case-util';
// import { debounce } from '../../../util/service-util/debounce';

const { CancelToken } = axios;

const AUTOCOMPLETE_URL_INSTITUTION = Api.baseUrl + Api.searchInstitution;
const AUTOCOMPLETE_URL_MAJOR = Api.baseUrl + Api.searchMajor;
const AUTOCOMPLETE_URL_COURSE = Api.baseUrl + Api.searchCourse;
const AUTOCOMPLETE_URL_TUTOR = Api.baseUrl + Api.searchTutor;
const AUTOCOMPLETE_URL_TAG = Api.baseUrl + Api.searchTag;

export interface IInstituteSearchParams {
    search?: string;
    page?: string;
    page_size?: string;
}

export interface IMajorSearchParams {
    institution?: string;
    search?: string;
    title?: string;
    abbreviation?: string;
    page?: string;
    page_size?: string;
}

export interface ICourseSearchParams {
    institution?: string;
    search?: string;
    subject?: string;
    abbreviation?: string;
    course_code?: string;
    page?: string;
    page_size?: string;
}

export interface ITagSearchParams {
    institution?: string;
    search?: string;
    ordering?: string;
    limit?: number;
    offset?: number;
}

export interface ITutorSearchParams {
    institution?: string;
    search?: string;
    abbreviation?: string;
    page?: string;
    page_size?: string;
}

export class AutoCompleteService {
    debounce = 100;

    authToken: string;

    constructor() {
        this.authToken = localStorage.getItem('authToken');
    }

    search = async (url: string, params?: any) => {
        const headers: any = {};
        headers['Content-Type'] = 'application/json';
        headers.Accept = 'application/json';

        if (this.authToken) {
            headers.Authorization = `Bearer ${this.authToken}`;
        }

        return axios.get(url, {
            params,
            headers,
        });
    };

    searchInstitution = async (params: IInstituteSearchParams) => {
        const searchDebounced = AwesomeDebouncePromise(this.search, this.debounce);
        try {
            const response = await searchDebounced(AUTOCOMPLETE_URL_INSTITUTION, params);
            return CaseUtil.snakeCaseTransform(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    searchMajor = async (params: IMajorSearchParams) => {
        const searchDebounced = AwesomeDebouncePromise(this.search, this.debounce);
        try {
            const response = await searchDebounced(AUTOCOMPLETE_URL_MAJOR, params);
            return CaseUtil.snakeCaseTransform(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    searchTag = async (params: ITagSearchParams) => {
        const searchDebounced = AwesomeDebouncePromise(this.search, this.debounce);
        try {
            const response = await searchDebounced(AUTOCOMPLETE_URL_TAG, params);
            return CaseUtil.snakeCaseTransform(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    searchCourse = async (params: ICourseSearchParams) => {
        const searchDebounced = AwesomeDebouncePromise(this.search, this.debounce);
        try {
            const response = await searchDebounced(AUTOCOMPLETE_URL_COURSE, params);
            return CaseUtil.snakeCaseTransform(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    searchTutor = async (params: ITutorSearchParams) => {
        const searchDebounced = AwesomeDebouncePromise(this.search, this.debounce);

        try {
            const response = await searchDebounced(AUTOCOMPLETE_URL_TUTOR, params);
            return CaseUtil.snakeCaseTransform(response.data);
        } catch (error) {
            console.log(error);
        }
    };
}
