import React, { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Admin from './components/Admin'
import { Routes, Route, Router, BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from './firebase';
import Teachers from './components/Teachers'
import Students from './components/Students'

function App() {

  // const[user, setUser] = useState(null);

  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/auth.user
  //       const uid = user.uid;
  //       console.log(uid);
  //       setUser(user);
  //       // ...
  //     } else {
  //       // User is signed out
  //       // ...
  //       alert("signed out he maa mata jii");
  //       setUser(null);
  //     }
  //   });
  // }, []);

  // function signOutbutton(){
  //   const auth = getAuth();
  //   signOut(auth).then(() => {
  //     // Sign-out successful.
  //     alert("Signout was a success bhai kar liya")
  //     setUser(null)
  //   }).catch((error) => {
  //     // An error happened.
  //     console.log(error);
  //   });
  // }


  return (

     <div className="">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Teachers" element={<Teachers />} />
          <Route path="/Students" element={<Students />} />
        </Routes>
    </div>
  );
}

export default App
