// @flow;
import firebase from 'firebase';
import * as actions from './actions';
import User from '../models/user';
import Goal from '../models/goal';
import config from './firebase-config';
import 'firebase/firestore';

firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

// Disable deprecated features
db.settings({});

// cache for tracking listeners
let myListeners = {};

const removeListener = (key: string): void => {
    if (myListeners[key]) {
        myListeners[key]();
        delete myListeners[key];
    }
};

const addListener = (key: string, listener: any => any): void => {
    if (!key) {
        throw Error('Cannot add listener. Invalid listener key');
    }
    removeListener(key);
    myListeners[key] = listener;
    return listener;
};

const removeAllListeners = () => (
    new Promise((resolve, reject) => {
        try {
            Object.values(myListeners).forEach(listener => listener());
            myListeners = {};
            resolve(true);
        } catch (e) {
            reject(e);
        }
    })
);

function returnType(entry) {
    switch (true) {
        case (entry instanceof Date):
            return entry.toString();
        case Array.isArray(entry):
            return entry.map(x => returnType(x));
        case entry !== null && typeof entry === 'object' :
            return stringifyDates(entry); // eslint-disable-line
        default:
            return entry;
    }
}

function stringifyDates(obj) {
    return Object.entries(obj).reduce((returnObj, entry) => Object.assign({}, returnObj, {
        [entry[0]]: returnType(entry[1])
    }), {});
}

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
 * listens for changes in a user's goals
 * @param {string} uid - user id
 * @param {function} dispatch - dispatch function
 * @returns {Promise<void>} - Promise
 */
const setupGoalsListener = async (uid: string, dispatch: any => void) => {
    const ref = db.collection(`/users/${uid}/goals`);
    addListener('goals',
        ref.onSnapshot(
            querySnapshot => {
                const goals = [];
                querySnapshot.forEach(doc => {
                    goals.push(Goal.create(doc.data(), doc.id));
                });
                actions.goalsFetchSuccessful(dispatch, goals);
            },
            ((error) => {
                // eslint-disable-next-line no-console
                console.error('setupGoalsListener Error', error);
                // TODO : Handle the error
            })
        ));
};

/**
 *
 * @param {string} uid - id of current user
 * @param {function} dispatch - dispatch something
 * @returns {Promise<void>} - initialize results
 */
export function initialize(uid: string, dispatch: any => void): Promise {
    // TODO: Check for cached data here.
    firebase
        .auth()
        .onAuthStateChanged((_user) => {
            if (!!_user) {

                /** Setup Listeners. Async ops should be added to the Promise.all **/
                const profileListener = setupProfileListener(_user.uid, dispatch);
                const goalsListener = setupGoalsListener(_user.uid, dispatch);
                Promise.all([profileListener, goalsListener])
                    .then(() => actions.userLoggedIn(dispatch)(User.create(_user)));
            } else {
                actions.userLoggedOut(dispatch);
            }
        });

    /** ADD YOUR INIT FUNCTIONS HERE. ASYNC OPS SHOULD BE ADDED TO THE RETURNED PROMISE.ALL **/

    const Foo = new Promise((resolve) => {
        setTimeout(() => resolve(true), 10);
    });

    const appInits = [Foo];

    return Promise.all(appInits);
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
            docRef.get().then(doc => {
                if (!doc.exists) {
                    const newProfile = deconstruct(User.create({
                        uid,
                        email,
                        displayName,
                        photoURL,
                        created: firebase.firestore.FieldValue.serverTimestamp()
                    }));
                    docRef.set(newProfile);
                }
            }).catch((error) => {
                // TODO Handle this error
                // eslint-disable-next-line no-console
                console.log('Error getting document:', error);
            });
        })
        .catch(error => {
            throw error; // Rethrow so we can deal with error later too.
        });
}

/**
 * Resets a user's password
 * @param {string} emailAddress - users's email
 * @returns {Promise<void>}- reset password promise
 */
export function resetPassword(emailAddress: string): Promise {
    return firebase.auth().sendPasswordResetEmail(emailAddress);
}

/**
 * Log a user out
 * @returns {Promise<void>} - signout results
 */
export function logout() {
    removeAllListeners();
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

/**
 *
 * @param {string} uid - user id
 * @param {object} goal - new goal
 * @returns {Promise<firebase.firestore.DocumentReference>}
 */
export const updateGoal = (uid, goal) => db
    .collection(`messages/${uid}/goals`)
    .set(stringifyDates(Goal.create(goal)));
