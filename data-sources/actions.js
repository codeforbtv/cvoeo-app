// @flow;
import {curry} from 'ramda';

import * as types from '../constants/action-types';

export const userLoggedIn = curry((dispatch: any => void, user: Object) => dispatch({
    type: types.LOGIN_SUCCESSFUL,
    user
}));

export const userLoggedOut = (dispatch) => dispatch({type: types.LOGOUT_SUCCESSFUL});

export const profileFetchSuccessful = curry((dispatch: any => void, profile: Object) => dispatch({
    type: types.FETCH_PROFILE_SUCCESS,
    profile
}));

export const initializationSuccessful = curry((dispatch, profile) => dispatch({
    type: types.INITIALIZATION_COMPLETED,
    profile
}));

export const initializationFailed = curry((dispatch, error) => dispatch({type: types.INITIALIZATION_FAIL, error}));
