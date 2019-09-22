import * as types from '../../constants/action-types';
import initialState from '../../reducers/initial-state';

export function reducers(state = initialState.login, action) {
    switch (action.type) {
        case types.FETCH_GOALS_FAIL:
            return {
                ...state,
                goals: [],
                error: action.error
            };
        case types.FETCH_GOALS_SUCCESS:
            return {
                ...state,
                goals: action.data,
                error: null
            };
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
        case types.LOGOUT_SUCCESSFUL:
            return initialState.login;
        case types.MODAL_OPENED:
            return {...state,
                isModalVisible: true //action.modalVisible
            };


        default:
            return state;
    }
 }