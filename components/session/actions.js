import * as dataSource from '../../data-sources/firebase-data';
import * as types from '../../constants/action-types';

export const initialize = () => (dispatch: Object => any) => dataSource.initialize(dispatch).then(dispatch({type: types.INITIALIZATION_COMPLETED}));

