import * as actions from '../../constants/action-types';
import initialState from '../../reducers/initial-state';

export function reducers(state = initialState.loading, action) {
    switch (action.type) {
        case actions.INITIALIZATION_COMPLETED:
            return {
                ...state,
                initialized: true
            };
        case actions.INITIALIZATION_FAIL:
            return {
                ...state,
                initialized: false,
                initError: action.error
            };
        case actions.INITIAL_AUTH_CHECKED:
            return {
                ...state,
                initialAuthChecked: action.initialAuthChecked,
                userIsLoggedIn: action.isLoggedIn
            };
        case actions.LOADING_FAILED:
            return {
                ...state,
                skipLoadingScreen: true,
                loadingError: action.error
            };
        default:
            return state;
    }
}
