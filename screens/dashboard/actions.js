// @flow
import * as dataSource from '../../data-sources/firebase-data';
import * as types from '../../constants/action-types';
import {curry} from 'ramda';

export const updateUserProfile = curry((data: any, dispatch: Object => void) => dataSource.updateProfile(data, dispatch));


export function logout() {
    return (dispatch: Object => *) => {
        dataSource.logout()
            .then((results) => {
                dispatch({
                    type: types.LOGOUT_SUCCESSFUL,
                    results
                });
            })
            .catch(err => {
                dispatch({type: types.LOGOUT_FAIL, err});
            });
    };
}
