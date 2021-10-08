//get a reference from Mongoose package
const mongoose = require('mongoose');

//Create a new schema
const actorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { // mandatory field of type string
        type: String,
        required: true
    },
    // bYear: { //the birth year is a mandatory field of type Integer
    //     validate: {
    //         validator: function (newYear) {
    //             if (Number.isInteger(newYear))
    //                 return true;
    //             else return false
    //         },
    //         message: 'Birth year should be integer'
    //     },
    //     type: Number,
    //     required: true
    // },
    //另一个简单的方法
    bYear: {
        validate: {
            validator: Number.isInteger,
            message: 'Birth year should be integer'
        },
        type: Number,
        required: true
    },
    movies: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Movie'
    }],
});


module.exports = mongoose.model('Actor', actorSchema);
//The name of the model is ‘Actor’, 
//therefore, mongoose will create a collection named ‘actors’.