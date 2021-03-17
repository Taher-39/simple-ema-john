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

// firebase.initializeApp(firebaseConfig)

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
    

    const handleSignIn = () => {
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
    const handleFbClick = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                // The signed-in user info.
                var user = result.user;
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var accessToken = credential.accessToken;
                // ...
                setUser(user)
                console.log('Fb User After SignIn', user);
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
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
                    // console.log(error.message)
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
            {
                user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button>
                    : <button onClick={handleSignIn}>Sign In</button>
            }
            {/* {
                user.isSignedIn && <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <img src={user.photo} width="15%" alt="" />
                </div>
            } */}
            <br />
            <button onClick={handleFbClick}>Sign Up With FaceBook</button>
            {/* {
                user && <div>
                    <p>{user.displayName}</p>
                    <p>{user.email}</p>
                    <img src={user.photoURL} width="15%" alt="" />
                </div>
            } */}
            <h2>Log In Area</h2>
            {/* <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Password: {user.password}</p> */}
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
