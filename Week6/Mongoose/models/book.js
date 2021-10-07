const mongoose = require('mongoose');

//Create Book schema
let bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    isdn: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author' //indicates the name of the schema, 
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Book', bookSchema);
