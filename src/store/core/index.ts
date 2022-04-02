import { CaseUtil } from '../../util/case-util';

export interface IAction<T = any, P = any | null | undefined> {
    type: T;
    payload: P;
}

export const AppAction = {
    create: (type: string, payload?: any) => {
        if (!type) {
            throw new Error('type can not be null..');
        }
        return { type, payload };
    },
};

export class AppError extends Error {
    status: number;

    message: string;

    data: any;

    severity: string;

    constructor(data: any) {
        super();
        this.status = 1;
        this.data = data;
        this.severity = 'error';

        this.extractMessage(data);
    }

    extractMessage(data) {
        const msg = Object.keys(data).reduce((m, x, i) => {
            let str = m;
            str += i > 0 ? '\n' : '';
            str += `[${x}]: ${data[x]}`;

            return str;
        }, '');

        this.message = msg;

        return msg;
    }

    extractFlashMessage() {
        const list = Object.keys(this.data).reduce((l, x, i) => {
            if (Array.isArray(this.data[x])) {
                this.data[x].map((y, j) => {
                    l.push({ status: 1, message: `${CaseUtil.toTitleCase(x)}: ${y}`, severity: 'error', id: `message-${i}-${j}-${new Date().getTime()}` });
                });
            } else {
                l.push({ status: 1, message: this.normalizeMessage(this.data[x]), severity: 'error', id: `message-${i}-${new Date().getTime()}` });
            }
            return l;
        }, []);

        return list;
    }

    normalizeMessage = (m) => {
        const parts = m.split(':');
        if (parts.length > 1) {
            parts[0] = CaseUtil.toTitleCase(parts[0]);
        }

        return parts.join(': ');
    };
}
