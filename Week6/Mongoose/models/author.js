const mongoose = require('mongoose'); //get a reference from Mongoose package

//A Mongoose schema defines the structure of the document, default values, validators, etc.
//Create Author schema
let authorSchema = mongoose.Schema({
    //each document will get four items
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    name: {
        firstName: {  // 1.to make a field required, 需要两个properties，type和required(boolean)
            type: String,
            required: true,
            set: function (fName) {
                return "Dear. " + fName;
            },
            get: function (lName) {

            }
        },
        lastName: String,
    },
    age: { //age should be a number between 10 and 110
        type: Number, //2.validate condition也是需要两个properties, type和validate
        validate: { //
            validator: function (ageValue) {
                return ageValue >= 10 && ageValue <= 110;
            },
            message: 'Age should be a number between 10 and 110'
        }
    },
    // age: { type: Number, min: 5, max: 20 }, //另一种方法
    created: {
        type: Date,
        default: Date.now //3.设置default
    }
});


//A Mongoose 'model' provides an interface to the database 
//for creating, querying, updating, deleting records, etc. 

//To export a model
//needs invoke the model and pass it a string('Author') represent
//the name of collection and a reference to the schema.
module.exports = mongoose.model('Author', authorSchema);




