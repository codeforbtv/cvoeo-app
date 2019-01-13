import * as types from '../../constants/action-types';
import initialState from '../../reducers/initial-state';

export function reducers(state = initialState.login, action) {
    switch (action.type) {
        case types.FETCH_PROFILE_FAIL:
            return {
                ...state,
                profile: null,
                error: action.error
            };
        case types.FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.data,
                error: null
            };
 
        default:
            return state;
    }
 }