import { useNavigate } from "react-router-dom";
import MovieList from "./MovieList";


const Rumah = () => {
    const Navigate = useNavigate ()

   return (
    <>
    <h3>HOME PAGE </h3>
    <MovieList />
    <button onClick={ () => Navigate ('/about')}>Click About</button>
    <br />
    <button onClick={ () => Navigate ('/login')}>Click Login</button>
    </>
   )
}

export default Rumah;