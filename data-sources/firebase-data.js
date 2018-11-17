// @flow;
import firebase from 'firebase';
import * as actions from './actions';
import User from '../models/user';
import config from './firebase-config';
import 'firebase/firestore';

firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

// Disable deprecated features
db.settings({
    timestampsInSnapshots: true
});


/**
 * Firestore cannot serialize objects created with the new keyword
 * This function removes all custom constructors
 * @param {object} obj - object with custom constructor
 * @returns {object} - POJO
 */
function deconstruct(obj: Object) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * listens for changes in a user's profile
 * @param {string} uid - user id
 * @param {function} dispatch - dispatch function
 * @returns {Promise<void>} - Promise
 */
function setupProfileListener(uid: string, dispatch: any => void) {
    const ref = db.collection('users').doc(uid);
    return ref.onSnapshot(doc => {
        if (doc.exists) {
            const profile = doc.data();
            actions.profileFetchSuccessful(dispatch, profile);
        }
    });
}


/**
 *
 * @param {function} dispatch - dispatch something
 * @returns {Promise<void>}
 */
export function initialize(dispatch): Promise {
    // TODO: Check for cached data here.
    firebase
        .auth()
        .onAuthStateChanged((_user) => {
            if (!!_user) {

                /** Setup Listeners. Async ops should be added to the Promise.all **/
                const profileListener = setupProfileListener(_user.uid, dispatch);
                Promise.all([profileListener])
                    .then(() => actions.userLoggedIn(dispatch)(User.create(_user)));
            } else {
                actions.userLoggedOut(dispatch);
            }
        });

    /** ADD YOUR INIT FUNCTIONS HERE. ASYNC OPS SHOULD BE ADDED TO THE RETURNED PROMISE.ALL **/

    const FOO = new Promise((resolve) => {
        setTimeout(() => resolve(true), 10);
    });
    return Promise.all([FOO]).then(actions.initializationSuccessful(dispatch)).catch(actions.initializationFailed(dispatch));
}

/**
 * Log a user in
 * @param {string} _email - email of user
 * @param {string} password - user's password
 * @returns {Promise<firebase.auth.UserCredential | never>} - login promise
 */
export function loginWithEmailPassword(_email: string, password: string): Promise {
    return firebase
        .auth()
        .signInWithEmailAndPassword(_email, password)
        .then((user) => {
            const {uid, email, displayName, photoURL} = (user || {}).user;
            // Retrieve the user's profile, If there is none, create it.
            const docRef = db.collection('users').doc(uid);
            docRef.get().then( doc => {
                if (!doc.exists) {
                    const newProfile = deconstruct(User.create({uid, email, displayName, photoURL, created: firebase.firestore.FieldValue.serverTimestamp()}));
                    docRef.set(newProfile);
                }
            }).catch((error) => {
                console.log('Error getting document:', error);
            });
        })
        .catch(error => {
            throw error; // Rethrow so we can deal with error later too.
        });
}

/**
 * Resets a user's password
 * @param {string} emailAddress
 * @returns {Promise<void>}
 */
export function resetPassword(emailAddress: string): Promise {
    return firebase.auth().sendPasswordResetEmail(emailAddress);
}

/**
 * Log a user out
 * @returns {Promise<void>}
 */
export function logout() {
    return firebase.auth().signOut();
}

/**
 *
 * @param {User} user - the user
 * @returns {Promise<any>} - Promise
 */
export function updateProfile(user: User): Promise {
    const data = deconstruct(user);
    return db.collection('users').doc(user.uid).update({
        ...data,
        updated: firebase.firestore.FieldValue.serverTimestamp()
    });
}
