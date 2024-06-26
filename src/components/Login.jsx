import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../firebase";

const Login = () => {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    
    function changeEmail(e){
       setEmail(e.target.value)
        //console.log(email)
    }
    function changePassword(e){
        setPassword(e.target.value)
        // console.log(password)
    }

    // useEffect(()=>{
    //     console.log(name)
    // }, [email, password])
    

  function onClickHandler(e){
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    alert("SignIn was a success");
    const user = userCredential.user;
    console.log(user.email);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode);
  });   
}

const navigate = useNavigate();


  useEffect(() => {
    const auth = getAuth();
    console.log('Hii');

   onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        //console.log(uid);
        const querySnapshot = await getDocs(collection(db, "Teachers"));
        querySnapshot.forEach((doc) => {
        if(doc.id === user.uid){
          navigate('/Teachers');
        }
        });

        const querySnapshot2 = await getDocs(collection(db, "Students"));
        querySnapshot2.forEach((doc) => {
        if(doc.id === user.uid){
          navigate('/Students');
        }
        });

      } else {
        navigate('/')
      }
    });


  }, []);

    return (
        <div className="">
            <h1>SignIn now !!</h1>

            <form style={{display: 'flex', flexDirection:'column', width:'400px', gap:'10px'}} onSubmit={onClickHandler}>

            <label htmlFor="email">Enter Email-id </label>
                <input 
                type="text" 
                placeholder="Enter Email" 
                id="email"
                name="email"
                onChange={changeEmail}
                value={email}
                />

                <label htmlFor="password">Enter Password </label>
                <input 
                type="password" 
                placeholder="Enter Password" 
                id="password"
                name="password"
                onChange={changePassword}
                value={password}
                />

                <button>Submit</button>

                </form>
        </div>
    )
}

export default Login