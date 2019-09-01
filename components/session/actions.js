import * as dataSource from '../../data-sources/firebase-data';
import * as types from '../../constants/action-types';

export const initialize = (uid: string) => (dispatch: Object => any) => dataSource.initialize(uid, dispatch)
    .then(data => {
        dispatch({type: types.INITIALIZATION_COMPLETED, payload: {data}});
    }).catch(error => {
        dispatch({type: types.INITIALIZATION_FAIL, payload: {error}});
    });

