import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './Pages/Home';
import MovieList from './Components/MovieList';
import Movie from './Pages/Movie';
import LoginForm from './Pages/LoginFrom';
import Navbar from './Pages/Navbar';

function App() {
  return (
    <div className="App">
        <Router>
          <Navbar />
            <Routes>
                <Route index element={<Home />}></Route>
                <Route path="movie/:id" element={<Movie />}></Route>
                <Route path="movies/:type" element={<MovieList />}></Route>
                <Route path="login/login" element={<LoginForm />}></Route>
                <Route path="/*" element={<h1>Error Page</h1>}></Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
