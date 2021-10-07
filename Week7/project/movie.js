var Actor = require('./models/actor');
var Movie = require('./models/movie');
const mongoose = require('mongoose');


module.exports = {

    //uses the Movie model to retrieve all the documents
    getAll: function (req, res) {
        Movie.find({}).populate('actors').exec(function (err, movies) { //8
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },

    // creates a new movie document
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },

    //uses Movie model to retrieve a document (a movie) using its _id
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },

    //1.Delete a movie by its ID
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },

    //4.Remove an actor from the list of actors in a movie
    removeActor: function (req, res) {
        Movie.findOne({ _id: req.params.mid }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ _id: req.params.aid }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                console.log(actor);
                // let i = actor.movies.indexOf(req.params.mid);
                // actor.movies.splice(i, 1);
                movie.actors.pull(req.params.aid);
                movie.save(function (err) {
                    res.json(movie);
                })
            });
        })
    },

    //5.
    addActor: function (req, res) {
        Movie.findOne({ _id: req.params.movieId }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ _id: req.params.actorId }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },

    getMoviesByYear: function (req, res) {
        let year1 = req.params.year1;
        let year2 = req.params.year2;

        if (year1 > year2) {
            Movie.where('year').gte(year2).lte(year1).populate('actors').exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json("Movie not found");
                res.json(movie)
            });
        }
        else {
            res.status(400).send("Year1 should be greater than Year2");
        }


    },
    deleteMovieByYear: function (req, res) {
        if (req.body.year1 >= req.body.year2) {
            Movie.find(function (err, movies) {
                if (err) return res.status(400).json(err);
                let deleted = 0;
                for (let i = 0; i < movies.length; i++) {
                    if (req.body.year2 <= movies[i].year && req.body.year1 >= movies[i].year) {
                        deleted += 1;
                        Movie.findOneAndRemove({ _id: movies[i]._id }, function (err, actor) {
                            if (err) return res.status(400).json(err);
                        });
                    }
                }
                res.json("Document Deleted: " + deleted);
            });
        } else {
            res.json("Year1 should be greater than Year2");
        }
    }
    

};