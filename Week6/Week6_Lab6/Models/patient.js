const mongoose = require('mongoose'); //get a reference from Mongoose package

//A Mongoose schema defines the structure of the document, default values, validators, etc.
//Create Doctor schema
let patientSchema = mongoose.Schema({
    fullname: {
        type: String,
        reuqired: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor' //indicates the name of the schema, 
    },
    age: { type: Number, min: 0, max: 120 },
    dov: {
        type: Date,
        default: Date.now
    },
    caseDes: {
        type: String,
        minlength: 10
    }
});


//A Mongoose 'model' provides an interface to the database 
//for creating, querying, updating, deleting records, etc. 

//To export a model
//needs invoke the model and pass it a string('Patient') represent
//the name of collection and a reference to the schema.
module.exports = mongoose.model('Patient', patientSchema);