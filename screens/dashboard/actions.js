// @flow
import * as dataSource from '../../data-sources/firebase-data';
import {curry} from 'ramda';

export const updateUserProfile = curry((data: any, dispatch: Object => void) => dataSource.updateProfile(data, dispatch));
