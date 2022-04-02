import { call, put } from 'redux-saga/effects';
import Axios from 'axios';
import { IMenu } from '../dto/IMenu';
import { NodeUtil } from '../../util/node-util/index';
import { requestMenuListError, requestMenuListSuccess } from '../state/MenuState';

export const refineMenuData = (menuData) => {
    let list: IMenu[] = [];

    if (menuData) {
        const map = NodeUtil.toNodeMap([...menuData]);
        list = NodeUtil.toNodeList(map) || [];
    }

    return list;
};

function* GetMenuWorker(action) {
    try {
        const response = yield call(Axios.get, '/assets/data/menu-data.json');
        if (response.status >= 200 && response.status < 300) {
            const { data } = response;
            const menus = refineMenuData(data);
            yield put(requestMenuListSuccess(menus));
        } else {
            throw response.error;
        }
    } catch (error: any) {
        yield put(requestMenuListError(error));
    }
}

export const MenuSaga = {
    GetMenuWorker,
};
