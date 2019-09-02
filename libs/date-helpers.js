import moment from 'moment';
import {isValidDate} from './validators';
import * as R from 'ramda';

export const daysTo = (date: typeof Date): string => {
    const findDateString = R.cond([
        [days => days <= -1, days => `${days} days ago`],
        [days => days >= 1, days => `in ${days} days`],
        [R.T, () => 'today']]);
    const dateString = _date => {
        const days = moment(_date).diff(moment(), 'days');
        return findDateString(days);
    };
    return isValidDate(date) ? dateString(date) : '';
};
