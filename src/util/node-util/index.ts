/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
const addNodeKey = (input: Array<any>, prefix?) => {
    let k = 0;
    const list = input.map((x) => {
        const nx = { ...x };
        nx.nodeKey = prefix ? `${prefix}|${k}` : `node-${k}`;
        nx.id = nx.nodeKey;
        nx.parentKey = prefix || 'root';

        const level = nx.nodeKey.split('-')[1].split('|').length - 1;
        nx.level = level;

        if (nx.nodes) {
            nx.nodes = addNodeKey(nx.nodes, nx.nodeKey);
        }

        k++;

        return nx;
    });

    return list;
};

const createNodeMap = (input: Array<any>, initial = {}): any => {
    const list = [...input];

    const map = list.reduce((flat, x) => {
        if (x.nodes) {
            const nList = createNodeMap(x.nodes, flat);
            flat[x.nodeKey] = flat[x.nodeKey] ? flat[x.nodeKey] : x;
            delete flat[x.nodeKey].nodes;
        } else {
            flat[x.nodeKey] = x;
        }

        return flat;
    }, initial);

    return map;
};

const clearNodeKey = (input: Array<any>) => {
    const list = [...input];
    return list.map((x) => {
        delete x.nodeKey;
        if (x.nodes && x.nodes.length) {
            clearNodeKey(x.nodes);
        }
        return x;
    });
};

const toNodeMap = (input: Array<any>) => {
    const list = clearNodeKey(input);
    const keyList = addNodeKey(list);
    const map = createNodeMap(keyList);

    return map;
};

const toNodeList = (input: any, parent = 'root') => {
    const map = { ...input };
    const list: Array<any> = [];
    Object.keys(map).map((key) => {
        const obj = map[key];
        if (obj.parentKey === parent) {
            delete map[key];
            obj.nodes = toNodeList(map, obj.nodeKey);
            list.push(obj);
        }
    });

    return list;
};

const sortByProperty = (property, order) => {
    const sortOrder = order || 1;

    return (a, b) => {
        let result = 0;
        if (a[property] < b[property]) {
            result = -1;
        } else if (a[property] > b[property]) {
            result = 1;
        } else {
            result = 0;
        }

        return result * sortOrder;
    };
};

const SortByProperty = (property, order) => {
    const sortOrder = order || 1;

    return (a, b) => {
        let result = 0;
        if (a[property] < b[property]) {
            result = -1;
        } else if (a[property] > b[property]) {
            result = 1;
        } else {
            result = 0;
        }

        return result * sortOrder;
    };
};

export const NodeUtil = {
    toNodeMap,
    toNodeList,
    sortByProperty,
};
