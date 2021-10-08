// References to the required packages:
const express = require('express');
const mongoose = require('mongoose');

// References to the routers:
const actors = require('./routers/actor');
const movies = require('./routers/movie');

// Create an app from Expressjs and configure it:
const app = express();
app.listen(8080);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let path = require('path');
app.use("/", express.static(path.join(__dirname, "dist/movieAng"))); // W9 redirect request 


// Ask mongoose to connect to a database named ‘movies’ :
mongoose.connect('mongodb://localhost:27017/W10_moviesDB', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});


// Configuring Endpoints

//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);// If a GET request arrives with pathname =’/actors’, execute actor.getAll
app.post('/actors', actors.createOne);// If a POST request arrives with pathname =’/actors’, execute actor.createOne
app.get('/actors/:id', actors.getOne);// If a GET request arrives with pathname =’/actors/:id’, where id is the ID of the actor,  execute actor.getOne
app.put('/actors/:id', actors.updateOne);// If a PUT request arrives with pathname =’/actors/:id’, where id is the ID of the actor,  execute actor.updateOne
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);// if a DELETE request arrives with pathname =’/actors/:id’, where id is the ID of the actor,  execute actor.deleteOne
app.delete('/actorAndItsMovies/:id', actors.deleteActorAndItsMovies); //2
app.delete('/actors/:aid/:mid', actors.removeMovie);  //3
app.get('/actors/getMovies/:id', actors.getNumberOfMovies);


//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id', movies.deleteOne);//1
app.delete('/movies/:mid/:aid', movies.removeActor);  //4
app.put('/movies/:movieId/:actorId', movies.addActor); //5
app.get('/movies/:year1/:year2', movies.getMoviesByYear); //6
app.delete('/movies', movies.deleteMovieByYear); //9




