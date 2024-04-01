import { getFirestore } from "firebase/firestore";
import { collection, addDoc,setDoc, doc } from "firebase/firestore";
import { app } from "../firebase";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {  createUserWithEmailAndPassword } from "firebase/auth";

function Admin(){
    const[Teacheremail, setTeacherEmail] = useState("");
    const[Teacherpassword, setTeacherPassword] = useState("");
    const[Teachername, setTeacherName] = useState("");

    //Creation of Use states for Teachers information

    const[Studentemail, setStudentEmail] = useState("");
    const[Studentpassword, setStudentPassword] = useState("");
    const[Studentname, setStudentName] = useState("");
    const[StudentRollNo, setStudentRollNo] = useState("");

    //Creation of Use states for student information


    function changeTeacherEmail(e){
       setTeacherEmail(e.target.value)
        //console.log(email)
    }

    function changeTeacherPassword(e){
        setTeacherPassword(e.target.value)
        // console.log(password)
    }
    
    function changeTeacherName(e){
        setTeacherName(e.target.value);
    }

    useEffect(()=>{
        //console.log(name)
    }, [Teacheremail, Teacherpassword, Teachername])
    

  function onClickTeacherHandler(e){
    e.preventDefault();
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, Teacheremail, Teacherpassword)
  .then(async (userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user.email);
    
    try {
      const db = getFirestore(app);
      const docRef = doc(db,"Teachers/"+user.uid);
      await setDoc(docRef, {
        Name : Teachername, 
        Email : Teacheremail
      })
      console.log(docRef.id);
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
  setTeacherEmail("");
  setTeacherName("");
  setTeacherPassword("");
}

//Signup for teacher and their info addtion to database is DONE !!!



function changeStudentEmail(e){
  setStudentEmail(e.target.value)
   //console.log(email)
}

function changeStudentPassword(e){
   setStudentPassword(e.target.value)
   // console.log(password)
}

function changeStudentName(e){
   setStudentName(e.target.value);
}

function changeStudentRollNo(e){
  setStudentRollNo(e.target.value);
}

useEffect(()=>{
   //console.log(name)
}, [Studentemail, Studentpassword, Studentname])


function onClickStudentHandler(e){
e.preventDefault();
const auth = getAuth(app);
createUserWithEmailAndPassword(auth, Studentemail, Studentpassword)
.then(async (userCredential) => {
// Signed up 
const user = userCredential.user;
console.log(user.email);

try {
 const db = getFirestore(app);
 console.log(db);
 const docRef = doc(db,"Students/"+user.uid);
 await setDoc(docRef, {
   Name : Studentname, 
   Email : Studentemail,
   RollNo : StudentRollNo
 })
 console.log(docRef.id);
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
setStudentEmail("");
setStudentName("");
setStudentPassword("");
}

//Signup for Student and their info addtion to database is DONE !!!

    return (
        <div className="" >
            <form style={{display: 'flex', flexDirection:'column', width:'400px', gap:'10px'}} onSubmit={onClickTeacherHandler}>
                <h1>Enter Teacher Details</h1>
               <label htmlFor="name">Enter Name </label>
                <input 
                type="text" 
                placeholder="Enter Name" 
                id="name"
                name="name"
                onChange={changeTeacherName}
                value={Teachername}
                />
                
                <label htmlFor="email">Enter Email-id </label>
                <input 
                type="text" 
                placeholder="Enter Email" 
                id="email"
                name="email"
                onChange={changeTeacherEmail}
                value={Teacheremail}
                />

                <label htmlFor="password">Enter Password </label>
                <input 
                type="password" 
                placeholder="Enter Password" 
                id="password"
                name="password"
                onChange={changeTeacherPassword}
                value={Teacherpassword}
                />

                <button>Submit</button>
            </form>


                      {/* Teacher input fields are DONE !! */}


            <form style={{display: 'flex', flexDirection:'column', width:'400px', gap:'10px'}} onSubmit={onClickStudentHandler}>
                <h1>Enter Student Details</h1>
                <label htmlFor="name">Enter Name </label>
                <input 
                type="text" 
                placeholder="Enter Name" 
                id="name"
                name="name"
                onChange={changeStudentName}
                value={Studentname}
                />

                <label htmlFor="RollNo">Enter Roll No of the Student</label>
                <input 
                type="text" 
                placeholder="Enter Roll No" 
                id="RollNo"
                name="RollNo"
                onChange={changeStudentRollNo}
                value={StudentRollNo}
                />
                
                <label htmlFor="email">Enter Email-id </label>
                <input 
                type="text" 
                placeholder="Enter Email" 
                id="email"
                name="email"
                onChange={changeStudentEmail}
                value={Studentemail}
                />

                <label htmlFor="password">Enter Password </label>
                <input 
                type="password" 
                placeholder="Enter Password" 
                id="password"
                name="password"
                onChange={changeStudentPassword}
                value={Studentpassword}
                />

                <button>Submit</button>
            </form>
            {/* Students input fields are DONE !! */}
        </div>
    )
}

export default Admin;
