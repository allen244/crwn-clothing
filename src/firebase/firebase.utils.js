import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCICW6WP8A9HvPo6AR3hX1ihidAanYu0ns",
    authDomain: "crown-db-8f531.firebaseapp.com",
    projectId: "crown-db-8f531",
    storageBucket: "crown-db-8f531.appspot.com",
    messagingSenderId: "917696540657",
    appId: "1:917696540657:web:d788d0d090eee8caa1de50"
};

firebase.initializeApp(firebaseConfig);
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoolge = () => auth.signInWithPopup(provider);

export default firebase;