import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import MovieList from './Components/MovieList';


function App(props) {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/movie' element={<MovieList />}></Route>
        
      </Routes>
    </Router>
    
  );
}

export default App;




