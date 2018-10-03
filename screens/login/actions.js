import {firebaseData} from '../../data-sources/firebase-data';
import * as types from '../../constants/action-types';


export function getCurrentUser() {
    return (dispatch) => {
        firebaseData.getCurrentUser(dispatch);
    };
}

export function loadingFailed(error) {
    return {type: types.LOADING_FAILED, isLoadingComplete: true, error: error};
}

export function loadingCompleted() {
    return {type: types.LOADING_COMPLETED, isLoadingComplete: true};
}

export function initialize() {
    return (dispatch: Object => any) => firebaseData.initialize(dispatch);
}
