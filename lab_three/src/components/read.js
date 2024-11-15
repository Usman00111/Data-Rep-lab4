import Movies from "./movies";
import { useEffect, useState } from "react";
import axios from "axios";

const Read = () => {

  const [movies, setMovies] = useState([]) // this is useState which allows me to add state variable to the functional/working component. this also store and manage state as well. 

  useEffect(() => { // you tell React that your component needs to do something after render

    // axios used to communicate with the backend and it 
    axios.get('http://localhost:4000/api/movies')
      .then((response) => { //then() whole block handles the response returned by the server after the POST request is successfully processed
        console.log(response.data);
        setMovies(response.data);
      })
      .catch((error) => { // handles errors 
        console.log(error);
      });
    });

    return (
      <div>
        <h3>Hello from read component!</h3>
        <Movies myMovies={movies} />
      </div>
    );
  }

export default Read;