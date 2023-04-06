import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// import { useState } from 'react'
import Home from './Pages/Home'
import About from './Pages/About';
import Login from './Pages/Login';
import MovieList from './Components/MovieList';


function App(props) {
  return (
    <Router>
      <Routes>
        
        {/* <Route path='/' element={<MovieList />}></Route> */}
        <Route path='/' element={<Home />}></Route>
        {/* <Route path='/about' element={<About />}></Route>
        <Route path='/login' element={<Login />}></Route> */}
      </Routes>
    </Router>
    
  );
}

export default App;




