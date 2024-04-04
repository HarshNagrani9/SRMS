import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../firebase";
import {doc, setDoc} from "firebase/firestore";
function Teachers(){

  const[creatClassTrigger, setCreatClassTrigger] = useState(false);
  const[createClass, setCreateClass] = useState("");

    const auth = getAuth();
    const user = auth.currentUser;
    // useEffect(() => {
      
    // })
    console.log("user",user)
    const navigate = useNavigate();
    function signOutbutton(e){
      e.preventDefault();
        const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
          alert("Signout was a success bhai kar liya");
          navigate('/');
        }).catch((error) => {
          // An error happened.
          console.log(error);
        });
      }

      function createNewClass(e){
        e.preventDefault();
        console.log(e);
        setCreateClass(e.target.value);
        console.log(createClass)
      }

      async function crateClassSubmitButton(){
        await setDoc(doc(db, "Teachers/"+user.uid+'/'+createClass+'/Initial'), {
          Description : createClass + " class created"
        });
        setCreateClass("");
      }

    return (
        <div className="">
            <div className="">Hello {user.email}</div>
              <div className="">Your user is {user.uid}</div>
              <button onClick={signOutbutton}>Logout</button>
              <button onClick={() => {navigate('/CreateClass')}}>Go to class</button>
              <button onClick={(e) => {
                e.preventDefault();
                setCreatClassTrigger(!creatClassTrigger)
                }}>Add a class</button>
              {creatClassTrigger 
              ? <div>
                    <form>
                        <label htmlFor="createNewClass">Creat new class</label>
                        <input 
                        type="text" 
                        name="createNewClass" 
                        id="createNewClass"
                        placeholder="Enter class name"
                        onChange={createNewClass}
                        value = {createClass}
                        />
                        <div onClick={crateClassSubmitButton}>Submit</div>
                        {/* <button>Submit</button> */}
                        {/* <button onClick={() => {console.log(createClass)}}>Submit</button> */}
                    </form>
              </div>
              : <div></div>
              }
            </div>
    )
}

export default Teachers;