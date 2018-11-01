import * as dataSource from '../../data-sources/firebase-data';
import * as types from '../../constants/action-types';


export function getCurrentUser() {
    return (dispatch) => {
        dataSource.getCurrentUser(dispatch);
    };
}

export function loadingFailed(error) {
    return {type: types.LOADING_FAILED, isLoadingComplete: true, error: error};
}

export function loadingCompleted() {
    return {type: types.INITIALIZATION_COMPLETED, isLoadingComplete: true};
}

export const initialize = () => (dispatch: Object => any) => dataSource.initialize(dispatch).then(dispatch({type: types.INITIALIZATION_COMPLETED}));

