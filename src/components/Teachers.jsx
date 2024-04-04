import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import {doc, setDoc, updateDoc, arrayUnion, collection, getDocs} from "firebase/firestore";

function Teachers(){

  const[creatClassTrigger, setCreatClassTrigger] = useState(false);
  const[createClass, setCreateClass] = useState("");

    const auth = getAuth();
    const user = auth.currentUser;

    var CurrTeacherClasses = []
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const querySnapshot = await getDocs(collection(db, "Teachers"));
        querySnapshot.forEach((doc) => {
        if(doc.id === user.uid){
        let TeacherClasses = doc.data().Classes;
        TeacherClasses.map((element) =>{
          CurrTeacherClasses.push(element);
        })
        //console.log(CurrTeacherClasses)  
          }
        });
      } else {
        navigate('/')
        alert('Not Signed In')
      }
    });

    console.log(CurrTeacherClasses)

     
    // useEffect(async () => {
      
      
    // }, [])
    // const querySnapshot = getDocs(collection(db, "Teachers"));
    //     querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => ${doc.data()}`);
    //     });
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
        const classArray = [];
        await setDoc(doc(db, "Teachers/"+user.uid+'/'+createClass+'/Initial'), {
          Description : createClass + " class created"
        });
        classArray.push(createClass);
        try {
          const docRef = doc(db,"Teachers/"+user.uid);
          await updateDoc(docRef, {
            Classes : arrayUnion(createClass)
          })
          console.log(docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        
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
                {CurrTeacherClasses.map((eachClass) => (
                          <div>{eachClass}</div>
                ))}
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