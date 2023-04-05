import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState } from 'react'
// import './App.css'
import Home from './Pages/Home'
import About from './Pages/About'
import Navbar from './Components/Navbar'

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route exact path='/' element={<Home/>} />
//         <Route path='/about' element={<About/>} />
//         <Route path='/navbar' element={<Navbar/>}/>
//       </Routes>
//     </Router>
//   )
// }

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/navbar' element={<Navbar/>}/>
      </Routes>
    </Router>
  );
}

export default App

