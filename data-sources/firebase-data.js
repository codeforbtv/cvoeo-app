// @flow;
import firebase from 'firebase';
import * as actions from './actions';
import User from '../models/user';

/**
 *
 * @param userId
 * @param dispatch
 */
function setupProfileListener(userId, dispatch) {
    const db = firebase.database();
    const profile = db.ref(`profiles/${userId}`);
    profile.on('value', (snapshot) => {
        const data = snapshot.val() || {};
        dispatch(actions.profileFetchSuccessful(data));
    });
}

/**
 *
 * @param dispatch
 * @returns {Promise<void>}
 */
async function initialize(dispatch): Promise {


    const user = firebase.auth().currentUser;

    if (user) {
        dispatch(actions.userLoggedIn(User.create(user)));
    }

    // TODO: Check for cached data here.

    /** Setup Listeners : Don't return listeners **/
    firebase
        .auth()
        .onAuthStateChanged((user) => {
            if (!!user) {
                dispatch(actions.userLoggedIn(User.create(user)));
                setupProfileListener(user.uid, dispatch);
            } else {
                dispatch(actions.userFailedLogIn());
            }
        });

    /** ADD YOUR INIT FUNCTIONS HERE. ASYNC OPS SHOULD BE ADDED TO THE RETURNED PROMISE.ALL **/

    const FOO = new Promise((resolve) => {
        setTimeout(() => resolve(true), 2000);
    });
    return Promise.all([FOO]);
}

/**
 *
 * @param _email
 * @param password
 * @returns {Promise<firebase.auth.UserCredential | never>}
 */
function loginWithEmailPassword(_email: string, password: string): Promise {
    return firebase
        .auth()
        .signInWithEmailAndPassword(_email, password)
        .then((user) => {
            const {uid, email, displayName, photoURL} = user;
            // Retrieve the user's profile, If there is none, create it.
            firebase.database().ref(`profiles/${uid}`).once('value').then(snapshot => {
                if (!snapshot.val()) {
                    const newProfile = User.create({uid, email, displayName, photoURL});
                    newProfile.created = (new Date()).toString();
                    firebase.database().ref(`profiles/${uid}`).set(newProfile);
                }
            });
        })
        .catch(error => {
            throw error; // Rethrow so we can deal with error later too.
        });
}

/**
 *
 * @param emailAddress
 * @returns {Promise<void>}
 */
function resetPassword(emailAddress: string): Promise {
    return firebase.auth().sendPasswordResetEmail(emailAddress);
}

/**
 *
 * @returns {Promise<void>}
 */
function logout() {
    return firebase.auth().signOut();
}

/**
 *
 * @param profile
 * @param teamMembers
 * @returns {Promise<any>}
 */
function updateProfile(profile: Object, teamMembers: Object): Promise {
    const db = firebase.database();
    return db.ref(`profiles/${profile.uid}`).set(newProfile);
}


export const firebaseData = {
    initialize,
    loginWithEmailPassword,
    logout,
    resetPassword,
    updateProfile
};
