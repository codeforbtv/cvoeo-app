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
    return {type: types.INIT_COMPLETED, isLoadingComplete: true};
}

export const initialize = () => (dispatch: Object => any) => firebaseData.initialize(dispatch).then(dispatch({type: types.INIT_COMPLETED}));

// export function initialize() {
//     return (dispatch: Object => any) => firebaseData.initialize(dispatch);
// }
