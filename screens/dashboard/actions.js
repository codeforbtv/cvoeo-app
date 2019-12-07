// @flow
import * as dataSource from '../../data-sources/firebase-data';
import * as types from '../../constants/action-types';
import {curry} from 'ramda';

export function updateUserProfile(updatedUser){
    return (dispatch: Object => *) => {
        dataSource.updateProfile(updatedUser)
            .then(() => {
                dispatch({
                    type: type.UPDATE_USER_SUCCESS,
                    payload: {data: updatedUser}
                })
            })
            .catch(error => {
                dispatch({type: types.UPDATE_USER_FAIL, payload: {error, goal: updatedUser}});
            })
    }
}

export function logout() {
    return (dispatch: Object => *) => {
        dataSource.logout()
            .then((results) => {
                dispatch({
                    type: types.LOGOUT_SUCCESSFUL,
                    results
                });
            })
            .catch(err => {
                dispatch({type: types.LOGOUT_FAIL, err});
            });
    };
}

/**
 * @param {string} uid - user's id
 * @param {object} goal - old goal
 * @param {object} changes - just the new parts
 * @returns {Function} - dispatch func
 */
export function updateGoal(uid, goal, changes) {
    return (dispatch: Object => *) => {
        const updatedGoal = {...goal, ...changes, id: goal.id, goalId: goal.goalId};
        dataSource.updateGoal(uid, newGoal)
            .then(() => {
                dispatch({
                    type: types.UPDATE_GOAL_SUCCESS,
                    payload: {data: updatedGoal}
                });
            })
            .catch(error => {
                dispatch({type: types.UPDATE_GOAL_FAIL, payload: {error, goal: updatedGoal}});
            });
    };
}