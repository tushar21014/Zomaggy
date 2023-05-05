import React, { useState } from "react";
import a from "./Create";

const CreateState = (props) => {

    const [alert, setAlert] = useState(null)
    const showAlert = (type, message) => {
        setAlert({
            msg: message,
            type: type
        })
    }

    const [detail, setDetail] = useState([])
    
    const getDetail = async () => {
        const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('auth-Token')
          },
        });
        const json = await response.json();
        setDetail(json);
        console.log(detail);
        
      }

      
    
    return (
        <a.Provider value={{ alert,setAlert, showAlert,getDetail,detail }}>
            {props.children}
        </a.Provider>
    )
}

export default CreateState;