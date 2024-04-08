





import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import "../styles/Reset.css"
export default function Changepass(){
  let navigate=useNavigate()
    const [email,setEmail]=useState('')
    const[oldpass,setOldpass]=useState('')
    const[newpass,setNewpass]=useState('')
    const[cpass,setCpass]=useState('')

    // useEffect(()=>{
    //     const email1=JSON.parse(window.localStorage.getItem("userid"))
    //     setEmail(email1)
    // },[])
  function Change(){
    let val={email,oldpass,newpass,cpass}
    console.log(val)
  //  fetch('http://localhost:8000/api/updatepass',{
  //   method:'POST',
  //   headers:{
  //     "Content-Type":"application/json"
  //   },
  //   body:JSON.stringify(val)
  //  }).then((res) => {
  //   return res.json();
  // })
  // .then(() => {
  //   alert("Content Added Successfully");
  //   navigate("/login")
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
  // }
  fetch('http://localhost:8000/api/updatepass', {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body:JSON.stringify(val)
  })
    .then((res) => {
      return res.json();
    })
    .then(() => {
      alert("Content Added Successfully");
      navigate("/login")
    })
    .catch((err) => {
      console.log(err);
    });

} 


  return (
    <>
    <div className='container-fluid '>
    <div className='row'>
      <div className='col-sm-4 col-md-6 col-xl-4'>
        <center className='py-3'><h3 style={{color:'black'}}>Change<u style={{color:'orange'}}>Password</u></h3></center>
      <input type="text"  className='form-control w-100 ' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email' /><br/>
      <input type="password"  className='form-control w-100 ' value={oldpass} onChange={(e)=>setOldpass(e.target.value)} placeholder='Enter Your OldPassword' /><br/>
      <input type="password"  className='form-control w-100 ' value={newpass} onChange={(e)=>setNewpass(e.target.value)} placeholder='Enter Your NewPassword' /><br/>
      <input type="password"  className='form-control w-100 ' value={cpass} onChange={(e)=>setCpass(e.target.value)} placeholder='Enter Your ConfirmPassword' /><br/>
      <div className='row'>
        <div>
        <button onClick={Change} className='form-control  w-100' style={{background:'orange'}}>UpdatePassword</button>
        </div>
        </div>
      </div>
      <div className='col-sm-4 col-md-6 col-xl-4'>
      <img
              src="https://www.shutterstock.com/image-vector/creative-sign-change-password-design-260nw-1948051327.jpg"
              width="100%"
              height="500"
            />
      </div>
      <div className='col-sm-4 col-md-6 col-xl-4'></div>
    </div>
    </div>
    </>
  )
}


