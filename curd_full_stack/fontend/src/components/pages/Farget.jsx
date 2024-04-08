// import React from 'react'

// export default function Fargetpass() {
//   return (
//     <div>
//       <i>Reset password</i>
//     </div>
//   )
// }



 import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom';
 import { ToastContainer, toast } from 'react-toastify';
// import Box from '@mui/material/Box';
// import CircularProgress from '@mui/material/CircularProgress';

const Fargetpass = () => {
//  const prams =useParams();
//  console.log(prams)
     const { id, token } = useParams();

      const history = useNavigate();

    // const [data2, setData] = useState(false);

     const [password, setPassword] = useState("");

     const [message, setMessage] = useState("");

     const userValid = async () => {
         const res = await fetch(`http://localhost:8000/api/forgotpassword/${id}/${token}`, {
             method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
       });

         const data = await res.json()

        if (data.status == 201) {
             console.log("user valid")
         } else {
             history("*")
         }
    }


     const setval = (e) => {
         setPassword(e.target.value)
     }

     const sendpassword = async (e) => {
          e.preventDefault();

          const res = await fetch(`http://localhost:8000/api/${id}/${token}`, {
            method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body:JSON.stringify({password})
      });

      const data = await res.json()

      if (data.status == 201) {
          setPassword("")
          setMessage(true)
       } else {
          toast.error("! Token Expired generate new Link")
       }

     }

    useEffect(() => {
        userValid()
        // setTimeout(() => {
        //     setData(true)
        // }, 3000)
    }, [])

    return (
        <>
           
                        <section>
                            <div className="form_data">
                                <div className="form_heading">
                                    <h1>Enter Your NEW Password</h1>
                                </div>

                                <form>
                                {message ? <p style={{ color: "green", fontWeight: "bold" }}>Password Succesfulyy Update </p> : ""}
                                    <div className="form_input">
                                        <label htmlFor="password">New password</label>
                                        <input type="password" value={password} onChange={setval} name="password" id="password" placeholder='Enter Your new password' />
                                    </div>

                                    <button className='btn' onClick={sendpassword}>Send</button>
                                </form>
                                <p><NavLink to="/">Home</NavLink></p>
                                <ToastContainer />
                            </div>
                        </section>
                    </>
          
    )
}

export default Fargetpass