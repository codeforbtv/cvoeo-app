// @flow
import { isValidPhone } from '../libs/validators';
import { type } from 'ramda';

const nonDigit = /[^\d]/g;

export default class Reminder {
    uid: string;
    displayName: string;
    email: string;
    phone: string;
    created: Date;

    constructor(args = {}) {
        this.id = typeof args.id === 'string'
            ? args.id
            : null;
        this.name = typeof args.name === 'string'
            ? args.name.trim()
            : null;
        this.description = typeof args.description === 'string'
            ? args.displayName.trim()
            : null;
        this.phone = isValidPhone(args.phone)
            ? args.phone.replace(nonDigit, '')
            : null;
        this.created = type(args.created) === 'Date'
            ? new Date(args.created)
            : null;
    }

    static create(args: ?Object = {}, id?: string) {
        const _args = { ...args };
        if (Boolean(id)) {
            _args.id = id;
        }
        // Remove inheritance.  POJO's only
        return JSON.parse(JSON.stringify(new Reminder(_args)));
    }
}
