/* eslint-disable @typescript-eslint/no-use-before-define */
import * as changeCase from 'change-case';

const toCamelCaseReplacer = (key) => key.replace(/_([a-z])/g, (_, m) => m.toUpperCase());
const toSnakeCaseReplacer = (key) => key.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`);

const camelCaseTransform = (val) => {
    let result = null;
    if (typeof val !== 'object' || val === null) {
        result = val;
    } else if (Array.isArray(val)) {
        result = val.map(camelCaseTransform);
    } else {
        result = toCamelCase(val);
    }

    return result;
};

const toCamelCase = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [toCamelCaseReplacer(k), camelCaseTransform(v)]));

const toSnakeCase = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [toSnakeCaseReplacer(k), snakeCaseTransform(v)]));

const snakeCaseTransform = (val) => {
    let result = null;
    if (typeof val !== 'object' || val === null) {
        result = val;
    } else if (Array.isArray(val)) {
        result = val.map(snakeCaseTransform);
    } else {
        result = toSnakeCase(val, toSnakeCase);
    }

    return result;
};

export const CaseUtil = {
    toCamelCase,
    toSnakeCase,
    toTitleCase: changeCase.capitalCase,
    camelCaseTransform,
    snakeCaseTransform,
};
