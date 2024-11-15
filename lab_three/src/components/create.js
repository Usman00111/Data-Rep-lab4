import { useState } from "react";
import axios from "axios";

function Create() {
    //this is useState which allows me to add state variable to the functional/working component
    const [title, setTitle] = useState('');
    const [movieYear, setmovieYear] = useState('');
    const [moviePoster, setmoviePoster] = useState('');

    
    //handleSubmit function receives the form's event object
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title);
        console.log(movieYear);
        console.log(moviePoster);
        const movie = {title, movieYear,moviePoster};
        console.log(movie);

        // uses an object after the request URL to define the properties you want to create for your user
        axios.post('http://localhost:4000/api/movies', movie)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.data));
    }

    //this is basically what it returns so bellow the tittle, year and psoter link are returned.
    return (
        <div>
            <h2>This is my Create Component.</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Add Movie Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />


                    <div className="form-group">
                        <label>Add Movie year: </label>
                        <input type="number"
                            className="form-control"
                            value={movieYear}
                            onChange={(e) => { setmovieYear(e.target.value) }}
                        />

                        <div className="form-group" />
                        <label>Add Movie Poster URL: </label>
                        <input type="text"
                            className="form-control"
                            value={moviePoster}
                            onChange={(e) => { setmoviePoster(e.target.value) }}
                        />


                    </div>
                </div>
                <input type="submit" value="Add Movie" />
            </form>
        </div>
    );
}

export default Create;