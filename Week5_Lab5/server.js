//Import packages
const express = require("express");
const mongodb = require("mongodb"); // get an instance of MongoDB:
const morgan = require("morgan");
const ejs = require("ejs");

//Configure Express
const app = express();
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"));
app.listen(8080);

// we have some static assets such as images in this project
app.use(express.static("public/css"));//folder name

//Configure MongoDB
const MongoClient = mongodb.MongoClient; //reference MongoDB client:

// Connection URL
const url = "mongodb://localhost:27017/";

//reference to the database (i.e. collection)
let db;

//Connect to mongoDB server
MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    // parameters:
    // url: server’s URL, which is a local server listening at port 27017 (default )
    // { useNewUrlParser: true },  an object that is required for the latest version of MongoDB (version > 4/0)
    // function (err, client):  a callback function that will get executed after the connect operation finishes. 
    //     err: object that gets value if an error occurs 
    //     client: is used later to access the database as shown in line 6 that connects to a database named
    if (err) {
        console.log("Err  ", err);
    } else {
        console.log("Connected successfully to server");
        db = client.db("FIT2095_lab_db");
    }
});

//Routes Handlers
//Insert new Book
//GET request: send the page to the client
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html"); //__dirname is the  directory name of the current module (i.e file/project).
});

//POST request: receive the details from the client and insert new document (i.e. object) to the collection (i.e. table)
app.post("/addnewbook", function (req, res) {
    let bookDetails = req.body;
    console.log(bookDetails);
    db.collection("books").insertOne({
        title: bookDetails.bookTitle,
        author: bookDetails.bookAuthor,
        topic: bookDetails.bookTopic,
        dop: bookDetails.bookDop,
        summary: bookDetails.bookSummary
    });
    res.redirect("/getbooks"); // redirect the client to list books page
});


//List all books
//GET request: send the page to the client. Get the list of documents form the collections and send it to the rendering engine
app.get("/getbooks", function (req, res) {
    db.collection("books")
        .find({})
        .toArray(function (err, data) {
            res.render("list_Books", { bookDb: data });
        });
});

//List books between 27/08/2020 and 27/08/2021  --> extra task
app.get("/getbooksbydate", function (req, res) {
    db.collection("books")
        .find({
            dop: {
                $gte: "2020-08-27",
                $lte: "2021-08-27"
            }
        })
        .toArray(function (err, data) {
            res.render("list_Books_bydate", { bookDb: data });
        });
});

//Update book:
//GET request: send the page to the client
app.get("/updatebook", function (req, res) {
    res.sendFile(__dirname + "/views/update_Book.html");
});

//POST request: receive the details from the client and do the update
app.post("/updatebookdata", function (req, res) {
    let bookDetails = req.body;
    let filter = { title: bookDetails.bookTitle_old };
    let theUpdate = {
        $set: {
            title: bookDetails.bookTitle_new,
            author: bookDetails.bookAuthor_new,
            topic: bookDetails.bookTopic_new,
            dop: bookDetails.bookDop_new,
            summary: bookDetails.bookSummary_new
        },
    };
    //// -->>> syntax: db.collection.updateOne( <filter>, <update>, <option> ), updates a single document based on the filter.
    // filter: the selection criteria for the update. Example: {name:’Tim’}
    // update: the modifications to apply by using a set of operators Example: {$set:{age:31}}
    db.collection("books").updateOne(filter, theUpdate);
    res.redirect("/getbooks"); // redirect the client to list books page
});

//delete book:
//GET request: send the page to the client to enter the book's name
app.get("/deletebook", function (req, res) {
    res.sendFile(__dirname + "/views/deletebook.html");
});

//POST request: receive the book's name and do the delete operation
app.post("/deletebooksdata", function (req, res) {
    let bookDetails = req.body;
    let filter = { topic: bookDetails.bookTopic };
    db.collection("books").deleteMany(filter);
    res.redirect("/getbooks"); // redirect the client to list books page
});