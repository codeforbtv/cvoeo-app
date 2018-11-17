// @flow
import * as dataSource from '../../data-sources/firebase-data';
import * as types from '../../constants/action-types';

export function getCurrentUser() {
    return (dispatch: Object => *) => {
        dataSource.getCurrentUser(dispatch);
    };
}


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


export function loginWithEmailPassword(email: string, password: string) {
    return (dispatch: Object => *) => {
        dataSource.loginWithEmailPassword(email, password).catch(error => {
            dispatch({type: types.LOGIN_FAIL, error});
        });
    };
}


export function resetPassword(emailAddress: string) {
    return (dispatch) => {
        dataSource.resetPassword(emailAddress)
            .then(() => dispatch({type: types.RESET_PASSSWORD_SUCCESS}))
            .catch(error => {
                dispatch(
                    {
                        type: types.RESET_PASSWORD_FAIL,
                        error
                    }
                );
            });
    };
}


