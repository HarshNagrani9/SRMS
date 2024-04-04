import React from "react";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth"
import { db } from "../firebase";
import {doc, setDoc} from "firebase/firestore";

function CreateClass(){

    const[studentName, setStudentName] = useState("");
    const[studentRollNo, setStudentRollNo] = useState("");
    const [ISEMarks, setISEMarks] = useState("");
    const [IAMarks, setIAMarks] = useState("");
    const [ESEMarks, setESEMarks] = useState("");

    const auth = getAuth();
    const user = auth.currentUser;

    function setNameForStudent(e){
        setStudentName(e.target.value)
    }
    function setRollNoForStudent(e){
        setStudentRollNo(e.target.value)
    }
    function setISEMarksForStudent(e){
        setISEMarks(e.target.value)
    }
    function setIAMarksForStudent(e){
        setIAMarks(e.target.value)
    }
    function setESEMarksForStudent(e){
        setESEMarks(e.target.value)
    }

    async function submitStudentInfo(e){
        e.preventDefault();
        await setDoc(doc(db, "Teachers/"+user.uid+'/TACD'+`/${studentRollNo}`), {
            Description :" class created"
          });

    }
    
    useEffect(() =>{},[studentName, ISEMarks, IAMarks])

    return(
        <div className="" style={{display: "flex", flexDirection:"column", maxWidth:"600px", gap:"10px"}}>
            <h1>This is the Create Class section...!</h1>

                <label htmlFor="name">Enter Student Name  </label>
                <input 
                type="text" 
                placeholder="Enter Student Name" 
                id="className"
                name="className"
                onChange={setNameForStudent}
                value={studentName}
                />

                <label htmlFor="name">Enter Student Roll No  </label>
                <input 
                type="text" 
                placeholder="Enter Student Roll No" 
                id="classRollNo"
                name="classRollNo"
                onChange={setRollNoForStudent}
                value={studentRollNo}
                />

               <label htmlFor="name">Enter ISE marks</label>
                <input 
                type="text" 
                placeholder="Enter ISE marks" 
                id="ISEmarks"
                name="ISEmarks"
                onChange={setISEMarksForStudent}
                value={ISEMarks}
                />

                <label htmlFor="name">Enter IA marks</label>
                <input 
                type="text" 
                placeholder="Enter IA marks" 
                id="IAmarks"
                name="IAmarks"
                onChange={setIAMarksForStudent}
                value={IAMarks}
                />

                <label htmlFor="name">Enter ESE marks</label>
                <input 
                type="text" 
                placeholder="Enter ESE marks" 
                id="ESEmarks"
                name="ESEmarks"
                onChange={setESEMarksForStudent}
                value={ESEMarks}
                />
                <button onClick={submitStudentInfo}>Submit Information</button>
        </div>
    )
}

export default CreateClass