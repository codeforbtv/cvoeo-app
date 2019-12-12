import moment from 'moment';
import { isValidDate } from './validators';
import * as R from 'ramda';

export const daysTo = (date: typeof Date): string => {
    const findDateString = R.cond([
        [days => days <= -1, days => `${days} days ago`],
        [days => days > 1, days => `in ${days} days`],
        [days => days === 1, () => 'tomorrow'],
        [R.T, () => 'today']]);
    const dateString = _date => {
        const isoDate = moment(moment(_date).format('YYYY-MM-DD'));
        const isoNow = moment(moment().format('YYYY-MM-DD'));
        const days = isoDate.diff(isoNow, 'days');
        return findDateString(days);
    };
    return isValidDate(date) ? dateString(date) : '';
};
