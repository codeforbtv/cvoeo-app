// @flow;
import {curry} from 'ramda';

import * as types from '../constants/action-types';

export const userLoggedIn = curry((dispatch: any => void, user: Object) => dispatch({
    type: types.LOGIN_SUCCESSFUL,
    user
}));

export const userLoggedOut = (dispatch) => dispatch({type: types.LOGOUT_SUCCESSFUL});

export const goalsFetchFail = curry((dispatch: any => void, error: any) => dispatch({
    type: types.FETCH_GOALS_FAIL,
    error
}));

export const goalsFetchSuccessful = curry((dispatch: any => void, goals: Array<Object>) => dispatch({
    type: types.FETCH_GOALS_SUCCESS,
    data: goals
}));

export const profileFetchSuccessful = curry((dispatch: any => void, profile: Object) => dispatch({
    type: types.FETCH_PROFILE_SUCCESS,
    data: profile
}));
