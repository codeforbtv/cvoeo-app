import {combineReducers} from 'redux';

/** Add Reducers here **/
import {reducers as login} from '../screens/login/reducers';
import {reducers as loading} from '../components/session/reducers';


const rootReducer = combineReducers({login, loading});

export default rootReducer;
