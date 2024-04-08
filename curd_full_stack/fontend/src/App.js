import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Header from "./components/pages/Header";
import SignUp from "./components/pages/SignUp";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import AddBlog from "./components/pages/AddBlog";
import ViewBlog from "./components/pages/ViewBlog"; 
import Updatepass from "./components/pages/Updatepass"; 
import Reset from "./components/pages/Reset"; 
import './App.css';
import Farget from "./components/pages/Farget";
import Fargetpassword from "./components/pages/Fargetpassword";
import Newsubmit from "./components/pages/Newsubmit";
 
function App() {
  return (
    <>
    <div className="">
    <BrowserRouter>
      <Header/>
   
      <Routes>
      {/* <Route path="/" element={<Home/>}/> */}
        <Route path="/sign" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
       <Route path="/addblog" element={<AddBlog/>}/>
        <Route path="/viewblog" element={<ViewBlog/>}/>
        <Route path="/changepass" element={<Updatepass/>}/>       
        <Route path="/farget" element={<Reset/>}/>       
        <Route path="/forgotpassword/:id/:token" element={<Farget/>}/> 
        <Route path="/fargetpassword" element={<Fargetpassword/>}/>        
        <Route path="/otpsend" element={<Newsubmit/>}/>        
      </Routes> 
       </BrowserRouter> 
    </div>
    
    </>
  )
}

export default App;
