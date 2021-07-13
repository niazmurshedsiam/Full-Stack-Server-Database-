import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }
function Login() {
  const [newUser,setNewUser] = useState(false);
  const [user,setUser] = useState({
    isSignedIn: false,
    name:'',
    email:'',
    password:'',
    photo:'',
    error:'',
    success: false
  });
  const [loginInUser,setLoginInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleSignIn = ()=>{
    firebase.auth()
  .signInWithPopup(provider)
  .then(res=>{
    const {displayName,photoURL,email} = res.user;
    const signedIn = {
      isSignedIn: true,
      name:displayName,
      email:email,
      photo:photoURL
    } 
    setUser(signedIn);
    setLoginInUser(signedIn);
    console.log(displayName,email,photoURL);

  })
  .catch(err=>{
    console.log(err);
    console.log(err.message);
  })
  
    

}
const handleSignOut = ()=>{
  firebase.auth().signOut()
  .then(res=>{
    const signOut={
      isSignedIn:false,
      name:'',
      photo:'',
      email:''
    }
    setUser(signOut)
  })

  .catch(res=>{
    console.log(res.message)
  })
  console.log('signout');
}

const handleChange = (event) =>{
  let isFieldValid = true;
  // console.log(event.target.name, event.target.value);
  if(event.target.name === 'email'){
    isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
  }
  if(event.target.name === 'password'){
    const isPasswordValid = event.target.value.length > 6;
    const passwordValue = /\d{1}/.test(event.target.value);

    isFieldValid = isPasswordValid && passwordValue;

  }
  if(isFieldValid){
    const newUserInfo = {...user};
    newUserInfo[event.target.name] = event.target.value;
    setUser(newUserInfo);
  }
}
const handleSubmit = (event) =>{
  console.log(user.email,user.password);
  if(newUser && user.email && user.password){
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(res => {
      const newUserInfo = {...user};
      newUserInfo.error = '';
      newUserInfo.success = true;
      setUser(newUserInfo);
    })
    .catch(error => {
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success= false;
      setUser(newUserInfo);
      updateUserName(user.name);
    });

  }
  if(!newUser && user.email && user.password){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then(res => {
    const newUserInfo = {...user};
    newUserInfo.error = '';
    newUserInfo.success = true;
    setUser(newUserInfo);
    setLoginInUser(newUserInfo);
    console.log('sign in user info', res.user);
    
  })
  .catch(error => {
    const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success= false;
      setUser(newUserInfo);
  });
  }
  event.preventDefault();

}

const updateUserName = name =>{
  const user = firebase.auth().currentUser;

user.updateProfile({
  displayName: name,
  
}).then(() => {
  console.log('user name updated successfully');
}).catch((error) => {
  console.log(error);
}); 
}

const handleFbSignIn = ()=>{
  firebase.auth().signInWithPopup(fbProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;
    console.log('Fb Login',user);
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });
}
 
  return (
    <div className="App">
      {
        user.isSignedIn  ? <button onClick={handleSignOut}>Sign Out</button> :
        <button onClick={handleSignIn}>Sign in</button>
      }
      <br />
      <button onClick={handleFbSignIn}>Facebook Sign in</button>
      {
        user.isSignedIn && 
        <div>
          <h1>Welcome, {user.name}</h1>
          <img src={user.photo} alt="" />
          <h1>Email: {user.email}</h1>
        </div>
      }
      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" id="" onBlur={handleChange} placeholder="Enter Your Name"/>}
        <br />
        <input type="text" name="email" onBlur={handleChange} placeholder="Enter Your Email" required/>
        <br />
        <input type="password" name="password" onBlur={handleChange} placeholder="Enter Your Password" required/>
        <br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={{color:'red'}}>{user.error}</p>
      {user.success && <p style={{color:'green'}}>User {newUser ? 'Create' : 'Login'} SuccessFully {user.success}</p>}
    </div>
  );
}

export default Login;