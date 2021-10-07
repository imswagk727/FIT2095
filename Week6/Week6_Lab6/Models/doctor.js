const mongoose = require('mongoose'); //get a reference from Mongoose package

//A Mongoose schema defines the structure of the document, default values, validators, etc.
//Create Doctor schema
let doctorSchema = mongoose.Schema({
    //each document will get four items
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    fullname: {
        firstname: {  // 1.to make a field required, 需要两个properties，type和required(boolean)
            type: String,
            required: true,
        },
        lastname: String,
    },
    dob: Date,
    address: {
        state: {
            type: String, //2.validate condition也是需要两个properties, type和validate
            validate: { //
                validator: function (stateCount) {
                    return stateCount.length >= 2 && stateCount.length <= 3;
                },
                message: 'State should between 2 and 3 characters'
            }
            // state: { type: String, min: 2, max: 3 }, //另一种方法
        },
        suburb: String,
        street: String,
        unit: Number,
    },
    numPatients: { type: Number, min: 0 }
});


//A Mongoose 'model' provides an interface to the database 
//for creating, querying, updating, deleting records, etc. 

//To export a model
//needs invoke the model and pass it a string('Author') represent
//the name of collection and a reference to the schema.
module.exports = mongoose.model('Doctor', doctorSchema);