// @flow;

import * as types from '../constants/action-types';


export function userLoggedIn(user) {
    return {type: types.LOGIN_SUCCESSFUL, user};
}


export function userLoggedOut() {
    return {type: types.LOGOUT_SUCCESSFUL};
}

export function userFailedLogIn(error) {
    return {type: types.LOGIN_FAIL, error};
}


export function profileFetchSuccessful(profile: Object) {
    return {type: types.FETCH_PROFILE_SUCCESS, profile};
}

export function initilizationSuccessful(){
    return {type: types.INITIAL, profile};
}
