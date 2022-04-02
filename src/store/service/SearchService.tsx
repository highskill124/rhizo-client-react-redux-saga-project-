import axios, { CancelTokenSource } from 'axios';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { Api } from '../../settings/Api';
import { debounce } from '../../util/service-util/debounce';

const { CancelToken } = axios;

export class SearchService {
    debounceDuration = 100;

    source: CancelTokenSource;

    request: (url, params) => Promise<any>;

    constructor() {
        // this.request = debounce(this.fetchData, this.debounceDuration, this);
        this.request = AwesomeDebouncePromise(this.fetchData, this.debounceDuration);
    }

    abortRequest = () => {
        if (this.source) {
            this.source.cancel('Operation canceled by the user.');
        }
    };

    fetchData = async (url: string, params?: any) => {
        await this.abortRequest();

        this.source = CancelToken.source();

        const headers: any = {};

        headers['Content-Type'] = 'application/json';
        headers.Accept = 'application/json';
        headers['Key-Inflection'] = 'camel';

        const authToken = await localStorage.getItem('authToken');
        if (authToken) {
            headers.Authorization = `JWT ${authToken}`;
        }

        return axios
            .get(`${Api.baseUrl}${url}`, {
                cancelToken: this.source.token,
                params,
                headers,
            })
            .then(
                (res) => {
                    return res.data;
                },
                (error) => {
                    if (error.response && error.response.status === 401) {
                        localStorage.clear();
                        window.location.href = '/';
                    } else {
                        console.log('error');
                        console.log(error);
                    }
                },
            );
    };

    search = async (url, params) => {
        return this.request(url, params);

        // return AwesomeDebouncePromise(() => this.fetchData(url, params), 300);
    };
}
