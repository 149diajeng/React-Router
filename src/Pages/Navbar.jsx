import React from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"
import LoginForm from "./LoginFrom"

const Navbar = () => {
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/">
                  <img className="logo" src="https://i.pinimg.com/736x/c7/3b/9b/c73b9b74d6f787523433bbc9d0242a5c.jpg" 
                  style={{width: 90, boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)" }} /></Link>
                  <span> <h2>Noonton </h2></span>
                  {/* <Link to="/" style = {{textDecoration: none}}> <span>Noontoon</span> </Link> */}
                <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
                
            </div>
            <LoginForm />
        </div>
    )
}

export default Navbar;
