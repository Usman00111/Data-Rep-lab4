
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Edit(props) {
    //useParams is used to get the id of the movie from the URL, 
    //allowing us to retrieve the specific movie data from the database. This allows to load and edit details for a single, specific movie.
  let { id } = useParams();
  const [title, setTitle] = useState("");
  const [movieYear, setYear] = useState("");
  const [moviePoster, setPoster] = useState("");
  const navigate = useNavigate(); //here it is used to after the user submit the changes and once saved is updtaed then
  //useNavigate is called to redirect the user back to the "read" page where they can view all movies, including the one they just edited.

  //Used  useEffect to manage component state and perform data fetching and updating.
useEffect(() => {
    //Employed axios for HTTP requests to retrieve and update movie data.
    axios.get('http://localhost:4000/api/movie/' + id)
        .then((response) => {
            setTitle(response.data.title);
            setYear(response.data.movieYear);
            setPoster(response.data.moviePoster);
        })
        .catch((error) => {
            console.log(error);
        });
},[id]);

//once submitted new info then the info is saved and available to read page for view
const handleSubmit = (event) => {
    event.preventDefault();
    const newMovie = { id, title, movieYear, moviePoster }; //allows you to submit new movie title, movie year and movie poster
    axios.put('http://localhost:4000/api/movie/' + id, newMovie)// Employed axios for HTTP requests to retrieve and update movie data.
        .then((res) => {
            console.log(res.data);
            navigate('/read'); //navigates to new page
        });
}

return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Movie Title: </label>
                <input type="text" 
                className="form-control" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} />
                {/*set title to new */}
            </div>
            <div className="form-group">
                <label>Release Year: </label>
                <input type="text" 
                className="form-control" 
                value={movieYear} 
                onChange={(e) => setYear(e.target.value)} />
                {/* set movie year*/}
            </div>
            <div className="form-group">
                <label>Poster URL: </label>
                <input type="text" 
                className="form-control" 
                value={moviePoster} 
                onChange={(e) => setPoster(e.target.value)} />
                {/* set movie poster */}
            </div>
            <div className="form-group">
                <input type="submit" value="Edit Movie" className="btn btn-primary" />
            </div>
        </form>
    </div>
);
}