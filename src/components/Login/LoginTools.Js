import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const authInitializeLogIn = () =>{
    firebase.initializeApp(firebaseConfig)
} 

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const isSignedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            setUser(isSignedInUser)
            // console.log(displayName, photoURL, email)
        })
        .catch(err => {
            console.log(err)
            console.log(err.massage)
        })
}