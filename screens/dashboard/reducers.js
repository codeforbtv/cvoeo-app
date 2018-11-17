import * as types from '../../constants/action-types';
import initialState from '../../reducers/initial-state';

export function reducers(state = initialState.login, action) {
    switch (action.type) {
        case types.ACTION_SUCCESS:
            return {
                ...state,
                successMessage: action.data,
                error: null
            };
        case types.ACTION_FAIL:
            return {
                ...state,
                successMessage: null,
                error: action.error
            };

        default:
            return state;
    }
}
