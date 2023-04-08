import { Link } from "react-router-dom";
import LoginForm from './LoginFrom'

function NavBar() {
  const renderLoginLogout = () => {
    if (localStorage.getItem("sessionId")) {
      const handleLogout = () => {

        localStorage.removeItem("sessionId");
        window.location.href = "/";
      };
      return (
        <li>
          <a onClick={handleLogout}>
            Logout
          </a>
        </li>
      );
    }
    return (
      <li>
        <LoginForm />
      </li>
    );
  };
  return (
      <div>
        <a href="#">
          Noontoon
        </a>
          <ul>
            <li>
              <Link to="/">
                <a className="nav-link">Home</a>
              </Link>
            </li>
            <li>
              <Link to="/">
                <a className="nav-link">Movies</a>
              </Link>
            </li>
            {renderLoginLogout()}
          </ul>
        
      </div>
  );
}
export default NavBar;




// import React from "react";
// // import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// import { Link } from "react-router-dom";
// import LoginForm from "./LoginFrom";



// function Navbar() {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/movies">Movies</Link>
//         </li>
//         <li>
          
//           {/* USER PROFILE */}
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;
