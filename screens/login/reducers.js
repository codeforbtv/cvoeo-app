import * as types from '../../constants/action-types';
import initialState from '../../reducers/initial-state';

export function reducers(state = initialState.login, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESSFUL:
            return {
                ...state,
                createUserError: null,
                userIsLoggedIn: true,
                user: action.user,
                initialAuthChecked: true,
                loginError: null,
                creatingUser: false
            };
        case types.LOGIN_FAIL:
            return {
                ...state,
                user: null,
                createUserError: null,
                userIsLoggedIn: false,
                initialAuthChecked: true,
                loginError: action.error,
                creatingUser: false
            };
        case types.LOGOUT_SUCCESSFUL:
            return initialState.login;

        default:
            return state;
    }
}
