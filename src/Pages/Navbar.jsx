import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* <a className="navbar-brand" href="#">Brand Logo</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <img src="logo.png" alt="" />
              <a className="navbar-brand">Noontoon</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current='page' to='/'>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" to='/movies'>Movies</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" to='/anime'>Anime</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;



// import { Link } from "react-router-dom";
// import LoginForm from './LoginFrom'

// function NavBar() {
//   const renderLoginLogout = () => {
//     if (localStorage.getItem("sessionId")) {
//       const handleLogout = () => {

//         localStorage.removeItem("sessionId");
//         window.location.href = "/";
//       };
//       return (
//         <li>
//           <a onClick={handleLogout}>
//             Logout
//           </a>
//         </li>
//       );
//     }
//     return (
//       <li>
//         <LoginForm />
//       </li>
//     );
//   };
//   return (
//       <div>
//         <a href="#">
//           Noontoon
//         </a>
//           <ul>
//             <li>
//               <Link to="/">
//                 <a className="nav-link">Home</a>
//               </Link>
//             </li>
//             <li>
//               <Link to="/">
//                 <a className="nav-link">Movies</a>
//               </Link>
//             </li>
//             <li>
//               <Link to='login'>
//                 <a className="nav-item">Login</a>
//               </Link>
//               {renderLoginLogout()}
//             </li>
            
//           </ul>
        
//       </div>
//   );
// }
// export default NavBar;




// // import React from "react";
// // // import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// // import { Link } from "react-router-dom";
// // import LoginForm from "./LoginFrom";



// // function Navbar() {
// //   return (
// //     <nav>
// //       <ul>
// //         <li>
// //           <Link to="/">Home</Link>
// //         </li>
// //         <li>
// //           <Link to="/movies">Movies</Link>
// //         </li>
// //         <li>
          
// //           {/* USER PROFILE */}
// //         </li>
// //       </ul>
// //     </nav>
// //   );
// // }

// export default Navbar;
