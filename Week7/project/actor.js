//Firstly, the router needs access to both models (Actor and Movie) 
//and to the Mongoose library.
const Actor = require('./models/actor');
const Movie = require('./models/movie');
const mongoose = require('mongoose');
const movie = require('./models/movie');



//因为Having more than one function to be exported
//所以export一个object，and each function is an property of this object
module.exports = {
    // Implement your functions

    //retrieves all the documents from the Actor collection 
    //and sends them back as a response.
    getAll: function (req, res) {
        Actor.find({}).populate('movies').exec(function (err, actors) { //7
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors); //sends the response in a JSON format
            }
        });
    },

    //creates a new document based on the parsed data in ‘req.body’ 
    //and saves it in ‘Actor’ collection.
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            console.log('Done');
            res.json(actor);
        });
    },

    //another way to insert a new document into a collection 
    //by using ‘Model.create’ function:
    // createOne: function (req, res) {
    //     let newActorDetails = req.body;
    //     newActorDetails._id = new mongoose.Types.ObjectId();
    //     Actor.create(newActorDetails, function (err, actor) {
    //         if (err)
    //             return res.json(err);
    //         res.json(actor);
    //     });
    // },

    //finds one document by an ID
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.json(err);
                if (!actor) return res.json();
                res.json(actor);
            });
    },

    //finds a document by its ID and sets new content that is retrieved from ‘req.body’
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },

    //deletes the document that matches the criteria.
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },

    //adds a movie ID to the list of movies in an actor’s document.
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {// 1. retrieve the actor’s document 
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) { // 2. retrieve the movie
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) { // save it back to the database.
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },

    //2.Delete an actor by its ID and all its movies from the 'Movie' collection.
    deleteActorAndItsMovies: function (req, res) {
        console.log(`The ${req.params.id}`);
        let actor_id = req.params.id;
        Movie.deleteMany({ 'actors': actor_id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
        Actor.findOneAndRemove({ _id: actor_id }, function (err) {
            if (err) return res.status(400).json(err);

        });
    },

    //3.Remove a movie from the list of movies of an actor
    removeMovie: function (req, res) {
        Actor.findOne({ _id: req.params.aid }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.params.mid }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                console.log(movie);
                // let i = actor.movies.indexOf(req.params.mid);
                // actor.movies.splice(i, 1);
                actor.movies.pull(req.params.mid);
                actor.save(function (err) {
                    res.json(actor);
                })
            });
        })
    },

    getNumberOfMovies: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            let ar = actor.movies;
            res.json(`There are ${ar.length} Movies`);
        })
    }

}
