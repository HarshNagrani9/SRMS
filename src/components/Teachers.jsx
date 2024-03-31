import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function Teachers(){

    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate();
    function signOutbutton(){
        const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
          alert("Signout was a success bhai kar liya");
          navigate('/');
          setUser(null)
        }).catch((error) => {
          // An error happened.
          console.log(error);
        });
      }

    return (
        <div className="">
            <div className="">Hello {user.email}</div>
            <button onClick={signOutbutton}>Logout</button>
        </div>
    )
}

export default Teachers;