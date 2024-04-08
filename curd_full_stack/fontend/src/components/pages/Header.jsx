 
import React, { useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import '../styles/Header.css'

function Header() {
  let token=JSON.parse(window.localStorage.getItem("token"))
  let navigate=useNavigate()
  function logout(){
    window.localStorage.removeItem('token');
    console.log('token')
    navigate('/login')
    window.location.reload()
  }
  return (
   <div className="navbars ">
   {token?<> 
   <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
     <b  style={{"color":"red"}}>TASK</b>
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" float-end id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to='/addblog'>
            AddBlog
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to='/viewblog'>
          ViewBlog
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link active"  aria-current="page" to='/changepass'>
        Updatepass
          </Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link active" onClick={logout} aria-current="page" to='/login'>
         LogOut 
          </Link>
        </li>
      

      </ul>
       
    </div>
  </div>
</nav>

  </> :
  <>
   <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
     <b  style={{"color":"red"}}>TASK</b>
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        

         
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to='/'>
         Home
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to='/login'>
           SignIn
          </Link>
        </li>
        

        
      </ul>
     
    </div>
  </div>
</nav>
  </>
  }
   </div>
  );
}

export default Header;





// import React, { useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../styles/Header.css';

// function Header() {
//   const token = JSON.parse(window.localStorage.getItem('token'));
//   const navigate = useNavigate();

//   useEffect(() => {
//     const isTokenExpired = false;
  
//     if (!token || isTokenExpired) {
//       window.localStorage.removeItem('token');
//       navigate('/login');
//     } 
//   }, [token, navigate]);

//   function logout() {
//     window.localStorage.removeItem('token');
 
//     navigate('/login');
  
//     window.location.reload();
//   }

//   return (
//     <div className="navbars">
//       {token ? (
//         <>
//           <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <div className="container-fluid">
//               <a className="navbar-brand" href="#">
//                 <b style={{ color: 'red' }}>TASK</b>
//               </a>
//               <button
//                 className="navbar-toggler"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#navbarSupportedContent"
//                 aria-controls="navbarSupportedContent"
//                 aria-expanded="false"
//                 aria-label="Toggle navigation"
//               >
//                 <span className="navbar-toggler-icon" />
//               </button>
//               <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
//                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">

//                 <li className="nav-item">
//                     <Link className="nav-link" to="/">
//                       Home
//                     </Link>
//                   </li>

//                   <li className="nav-item">
//                     <Link className="nav-link" to="/addblog">
//                       AddBlog
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/viewblog">
//                       ViewBlog
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/changepass">
//                       Updatepass
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" onClick={logout} to="/login">
//                       LogOut
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </nav>
//         </>
//       ) : (
//         <>
//           <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <div className="container-fluid">
//               <a className="navbar-brand" href="#">
//                 <b style={{ color: 'red' }}>TASK</b>
//               </a>
//               <button
//                 className="navbar-toggler"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#navbarSupportedContent"
//                 aria-controls="navbarSupportedContent"
//                 aria-expanded="false"
//                 aria-label="Toggle navigation"
//               >
//                 <span className="navbar-toggler-icon" />
//               </button>
//               <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/login">
//                       SignIn
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </nav>
//         </>
//       )}
//     </div>
//   );
// }

// export default Header;



