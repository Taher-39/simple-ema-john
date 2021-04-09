import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

function Login() {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
    });
    
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || {
        from: { pathname: "/" }}

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    
    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider).then(function (result) {
            const { displayName, email } = result.user;
            const signedInUser = { name: displayName, email }
            setLoggedInUser(signedInUser);
            setToken();
            history.replace(from);
            // ...
        }).catch(function (error) {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    const setToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
            sessionStorage.setItem('token', idToken)
        }).catch(function (error) {
            // Handle error
        });
    }
    const handleFbClick = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                var credential = result.credential;
                var user = result.user;
                var accessToken = credential.accessToken;
                setUser(user)
                console.log('Fb User After SignIn', user);
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }
    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(() => {
                const signOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: '',
                    error: '',
                    success: false
                }
                setUser(signOutUser)
            })
            .catch(() => {

            })
    }
    const handleBlur = (event) => {
        // console.log(event.target.name, event.target.value)
        let isValidFrom = true;
        // debugger;
        if (event.target.name === 'email') {
            isValidFrom = /\S+@\S+\.\S+/.test(event.target.value) //regex check email 
        }
        if (event.target.name === 'password') {
            const isValidPassword = event.target.value.length > 4;
            const passwordHasNumber = /\d{1}/.test(event.target.value)//regex check minimum one number
            isValidFrom = isValidPassword && passwordHasNumber
        }
        if (isValidFrom) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;//set value newUserInfo object exact key
            setUser(newUserInfo)
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    // Signed in 
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo)
                    updateUserName(user.name)
                })
                .catch((error) => {
                    //error msg...
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // Signed in
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo)
                    setLoggedInUser(newUserInfo)
                    history.replace(from)
                    console.log('Update user info', res.user)
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }
        e.preventDefault();
    }

    const updateUserName = (name) => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
             // Update successful.
            console.log('Update User Name Successfully')
        }).catch(function (error) {
            // An error happened.
            console.log(error)
        });
    }

    return (
        <div style={{textAlign: 'center'}}>
           
            <button onClick={handleGoogleSignIn}>Google Sign in</button>
            <br />
            <button onClick={handleFbClick}>Sign Up With FaceBook</button>
            
            <h2>Log In Area</h2>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New User Sign Up</label>
            <form onSubmit={handleSubmit}>
                {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="input your name" required />}
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder="input your email" required />
                <br />
                <input type="password" onBlur={handleBlur} name="password" placeholder="password" required />
                <br />
                <input type="submit" value={newUser ? "Sing Up" : "Sign In"} />
            </form>
            <p style={{ color: "red" }}>{user.error}</p>
            { user.success && <p style={{ color: "green" }}>User {newUser ? 'Created' : "LoggedIn"} Successfully</p>}
        </div>
    );
}

export default Login;
