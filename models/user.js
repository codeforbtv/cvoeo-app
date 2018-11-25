// @flow

import {isValidEmail, isValidPhone} from '../libs/validators';
import {type} from 'ramda';

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
        this.created = type(args.created) === 'Date'
            ? new Date(args.created)
            : null;
        this.updated = type(args.updated) === 'Date'
            ? new Date(args.updated)
            : null;
    }

    static create(args) {
        return new User(args);
    }
}
