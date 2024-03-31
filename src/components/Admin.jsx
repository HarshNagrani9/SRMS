import { getFirestore } from "firebase/firestore";
import { collection, addDoc,setDoc } from "firebase/firestore";
import { app } from "../firebase";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {  createUserWithEmailAndPassword } from "firebase/auth";

function Admin(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[name, setName] = useState("");

    
    function changeEmail(e){
       setEmail(e.target.value)
        //console.log(email)
    }

    function changePassword(e){
        setPassword(e.target.value)
        // console.log(password)
    }
    
    function changeName(e){
        setName(e.target.value);
    }

    useEffect(()=>{
        //console.log(name)
    }, [email, password, name])
    

  function onClickHandler(e){
    e.preventDefault();
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user.email);
    
    try {
      const db = getFirestore(app);
      const docRef = await addDoc(collection(db, "Teachers"), {
        name,
        email
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode);
    // ..
  });
  setEmail("");
  setName("");
  setPassword("");
}

    return (
        <div className="" >
            <form style={{display: 'flex', flexDirection:'column', width:'400px', gap:'10px'}} onSubmit={onClickHandler}>
                
            <label htmlFor="name">Enter Name </label>
                <input 
                type="text" 
                placeholder="Enter Name" 
                id="name"
                name="name"
                onChange={changeName}
                value={name}
                />
                
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

export default Admin;
