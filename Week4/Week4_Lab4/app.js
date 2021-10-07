let express = require("express");
let app = express();
let url = require("url");
//List of customers
let db = [];

// viewPath is required for the response.sendFile function
//__dirname is the  directory name of the current module (i.e file/project).
let viewsPath = __dirname + "/views/";


//allow Express to understand the url_encoded format
app.use(express.urlencoded({ extended: true }));

// Express should be able to render ejs templates,ejs lets you generate HTML markup with plain JavaScript.
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// we have some static assets such as images in this project
app.use(express.static("public/images")); //folder name
app.use(express.static("public/css"));


//   GET Requests:get data from the server such as html files. Express.js


//if a request to the home page (i.e. '/') arrives
app.get("/", function (req, res) {
    console.log("Homepage request");
    // generate the relative path
    let fileName = viewsPath + "homepage.html";
    // send index.html back to the client
    res.sendFile(fileName); //sendfile():Transfers the file at the given path
});

// a request to add a new book
app.get("/getaddbook", function (req, res) {
    //Generate the relative path
    let fileName = viewsPath + "addnewBook.html";
    //send addcusotmer.html page back to the client
    res.sendFile(fileName);
});

//a request to get all books
app.get("/getallbooks", function (req, res) {
    // the content of the page should be generated dynamically.
    // a copy of the array (db) will be send to the rendering engine.
    res.render("listBooks", {
        books: db,
    });
});

app.get("/getallbookstitle", function (req, res) {
    // the content of the page should be generated dynamically.
    // a copy of the array (db) will be send to the rendering engine.
    res.render("listOnlyTitles", {
        books: db,
    });
});



// POST Requests: send data from the client to the server such as username and passwoord fields. 


// when the user clicks on the submit button
app.post("/postnewbook", function (req, res) {
    let book = {
        title: req.body.title,
        author: req.body.author,
        topic: req.body.topic,
        cost: req.body.cost,

    }
    console.log(req.body);

    if (book.title.length >= 3 & book.author.length >= 3 & book.topic.length >= 3 & book.cost > 0) { //handling when accept a title, topic or author name more than 3 character, cost > 0
        //bodyParser is responsible for generating the body object
        db.push(req.body);
        // after pushing the new customer to the database, redirect the client to allcustomer.html
        res.render("listBooks", {
            books: db,
        });
    } else { // not accpet
        res.render('invalidPage.html');
    }
});

app.get('/*', function (req, res) {
    if (req.url !== "/" || req.url !== "/getaddbook" || req.url !== "/getallbooks" || req.url !== "/getallbookstitle") {
        res.render('404.html');
    }
})

app.listen(8080);
