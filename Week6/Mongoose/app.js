//referencing Mongoose package
const mongoose = require('mongoose');

//referencing schemas:
const Author = require('./models/author');
const Book = require('./models/book');

//Create a Mongoose URL string 
//syntax: mongodb://ServerAddress: Port//DbName
let url = 'mongodb://localhost:27017/libDB';
//then connect
mongoose.connect(url, function (err) {
    if (err) {
        console.log('Error in Mongoose connection');
        throw err;
    }
    console.log('Successfully connected');

    //1. create a new author:
    let author1 = new Author({
        // _id: new mongoose.Types.ObjectId(), //用了auto不用call这个
        name: {
            firstName: 'Tim',
            lastName: 'John'
        },
        age: 80
    });
    author1.save(function (err) {
        if (err) throw err;
        console.log('Author successfully Added to DB');

        //为什么create new book 在这save function里面？
        //Node.js is asynchrounus and both book1 and book2 required the author1’s ID 
        //Therefore, we have to create them after the save operation of the author is done.

        //2. create a new book
        var book1 = new Book({
            _id: new mongoose.Types.ObjectId(),
            title: 'FIT2095 Book ',
            author: author1._id, //referencing Author Schema 
            isbn: '123456',
        });
        book1.save(function (err) {
            if (err) throw err;
            console.log('Book1 successfully Added to DB');
        });


        //3. create another :book2
        var book2 = new Book({
            _id: new mongoose.Types.ObjectId(),
            title: 'MEAN Stack with FIT2095',
            author: author1._id
        });
        book2.save(function (err) {
            if (err) throw err;
            console.log('Book2 successfully add to DB');
        });
    });



    // Query
    // Model.deleteMany()
    // Model.deleteOne()
    // Model.find()
    // Model.findById()
    // Model.findByIdAndDelete()
    // Model.findByIdAndRemove()
    // Model.findByIdAndUpdate()
    // Model.findOne()
    // Model.findOneAndDelete()
    // Model.findOneAndRemove()
    // Model.findOneAndUpdate()
    // Model.replaceOne()
    // Model.updateMany()
    // Model.updateOne()

    //1.get the age of all documents with first name = ‘Tim’
    // Author.find({ 'name.firstName': 'Tim' }, 'age', function (err, docs) { //
    //     //docs is an array
    //     console.log(docs);
    // });


    //Using the where clause : create complex expressions.

    //1.Find all documents that have firstName starts with the letter ‘T’ and the age >= 25, and age <=35. 
    //Then limit the result to 10 only,and sort by age in ASC:
    // Author.where({ 'name.firstName': /^T/ }).where('age').gte(25).limit(10).sort('age').exec(function (err, docs) {
    //     console.log(docs);
    // });

    Book.find({}).populate('author').exec(function (err, data) {
        console.log('hi');
        console.log(data);
    });

    // Author.updateOne({ 'name.firstName': 'Alex' }, { $set: { 'name.firstName': 'John' } }, function (err, doc) {
    //     console.log(doc);
    // });

    // Author.deleteOne({ 'name.firstName': 'Tim' }, function (err, doc) {
    //     console.log(doc);
    // });
});
