const express = require('express');
const app = express();
const port = 4000;

//enables cors server
const cors = require('cors');
app.use(cors());

app.use(function (req, res, next) { 
    // they are added cors headers to endbales cors cross origin requests 
    //the below are headers for cors
    res.header("Access-Control-Allow-Origin", "*"); // header
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); 

//enables cors 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//conneting to mongodb by replacing the code with connection string which we got from mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@admin1.zr6za.mongodb.net/DB14');

//how it will look like 
const movieSchema = new mongoose.Schema({
    title:String,
    movieYear:String,
    moviePoster:String

});

const movieModel = mongoose.model('myMovies',movieSchema);

// sending a get req to get the response from the server.
//fetches all the data of the movies 
app.get('/api/movies', async (req, res) => {
    const movies = await movieModel.find({});
    console.log(movies)
    res.status(200).json(movies);
  });

  //get data by id
  app.get('/api/movie/:id', async (req, res) => {
    const movie = await movieModel.findById(req.params.id);
    res.send(movie);
  });
 
//this is a post request to submit the data to the server 
app.post('/api/movies', async (req, res) => {
    console.log(req.body.title);
    const {title, movieYear, moviePoster} = req.body; 

    //saving to database
    const newMovie = new movieModel({title,movieYear,moviePoster});
    //async and await waits for this to run before it saves so there are no errors
    await newMovie.save();

    res.status(201).json({"Message": "Movie Added", movie: newMovie});
})

//start a web server and listen to the connections on the specified host and port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});