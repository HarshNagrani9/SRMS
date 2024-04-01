import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function Students() {

    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate();
    function signOutbutton(){
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

    return (
        <div className="">
            <h1>This is student</h1>
            <button onClick={signOutbutton}>Logout</button>
        </div>
    )
}

export default Students;