import { useState } from "react";

function Create() {
    const [title, setTitle] = useState('');
    const [movieYear, setmovieYear] = useState('');
    const [moviePoster, setmoviePoster] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title);
        console.log(movieYear);
        console.log(moviePoster);
    }

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

                    <label>Add Movie year: </label>
                    <input type="number"
                        className="form-control"
                        value={movieYear}
                        onChange={(e) => { setmovieYear(e.target.value) }}
                    />

                    <label>Add Movie Poster URL: </label>
                    <input type="text"
                        className="form-control"
                        value={moviePoster}
                        onChange={(e) => { setmoviePoster(e.target.value) }}
                    />


                </div>
                <input type="submit" value="Add Movie" />
            </form>
        </div>
    );
}

export default Create;