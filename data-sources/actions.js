// @flow;
import {curry} from 'ramda';

import * as types from '../constants/action-types';

export const userLoggedIn = curry((dispatch, user) => dispatch({type: types.LOGIN_SUCCESSFUL, user}));

export const userLoggedOut = (dispatch) => dispatch({type: types.LOGOUT_SUCCESSFUL});

export const userFailedLogIn = curry((dispatch, error) => dispatch({type: types.LOGIN_FAIL, error}));

export const profileFetchSuccessful = curry((dispatch, profile: Object) => dispatch({type: types.FETCH_PROFILE_SUCCESS, profile}));

export const initilizationSuccessful = curry((dispatch, profile) => dispatch({
    type: types.INITIALIZATION_COMPLETED,
    profile
}));

export const initializaionFailed = curry((dispatch, error) => dispatch({type: types.INTIALIZATION_FAIL, error}));