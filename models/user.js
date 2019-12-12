// @flow

import { isValidDate, isValidEmail, isValidPhone } from '../libs/validators';

const nonDigit = /[^\d]/g;

export default class User {
    uid: string;
    displayName: string;
    email: string;
    phone: string;
    created: Date;
    updated: Date;

    constructor(args = {}) {
        this.uid = typeof args.uid === 'string' || typeof args.id === 'string'
            ? args.uid || args.id
            : null;
        this.displayName = typeof args.displayName === 'string'
            ? args.displayName.trim()
            : null;
        this.email = isValidEmail(args.email)
            ? args.email.trim().toLowerCase()
            : null;
        this.phone = isValidPhone(args.phone)
            ? args.phone.replace(nonDigit, '')
            : null;
        this.created = isValidDate(args.created)
            ? new Date(args.created)
            : null;
        this.updated = isValidDate(args.updated)
            ? new Date(args.updated)
            : null;
    }

    static create(args: ?Object = {}, id?: string) {
        const _args = { ...args };
        if (Boolean(id)) {
            _args.id = id;
        }
        // Remove inheritance.  POJO's only
        return JSON.parse(JSON.stringify(new User(_args)));
    }
}
