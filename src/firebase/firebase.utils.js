import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD0NJ-WLshbQXsF_NErpFFYZNHlUrrHcM8",
    authDomain: "crwn-db-b81b2.firebaseapp.com",
    projectId: "crwn-db-b81b2",
    storageBucket: "crwn-db-b81b2.appspot.com",
    messagingSenderId: "510996957033",
    appId: "1:510996957033:web:2c5ffade76cbadd757dff8",
    measurementId: "G-MNFLGFNQGZ"
};

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
            })
        } catch (error) {
            console.log('Error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;