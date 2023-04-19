import MovieList from "../Components/MovieList";
import LoginFrom from "./LoginFrom";
import NavBar from "./Navbar";

const Home = () => {
  return (
    

    <div className="App">
      <NavBar />
      <LoginFrom />
      <MovieList />
    </div>
  ) 
}

export default Home;