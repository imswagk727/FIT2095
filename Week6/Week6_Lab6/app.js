const express = require('express');
const app = express();
const morgan = require("morgan");
const ejs = require("ejs");
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"));

//referencing Mongoose package
const mongoose = require('mongoose');

//referencing schemas:
const Doctor = require('./models/doctor');
const Patient = require('./models/patient');

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html"); //__dirname is the  directory name of the current module (i.e file/project).
});


app.get("/addDoctor", function (req, res) {
    res.sendFile(__dirname + "/views/insertDoctor.html"); //__dirname is the  directory name of the current module (i.e file/project).
});

app.post("/addDoctor", function (req, res) {
    console.log(req.body);
    let myDoctor = new Doctor({
        fullname: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        },
        dob: req.body.dob,
        address: {
            state: req.body.state,
            suburb: req.body.suburb,
            street: req.body.street,
            unit: req.body.unit,
        },
        numPatients: req.body.numPatients
    })
    myDoctor.save(function (err) {
        if (err) throw err;
    })
});

//Create a Mongoose URL string 
//syntax: mongodb://ServerAddress: Port//DbName
let url = 'mongodb://localhost:27017/wee6Lab';
//then connect
mongoose.connect(url, function (err) {
    if (err) {
        console.log('Error in Mongoose connection');
        throw err;
    }
    console.log('Successfully connected');
});

app.listen(8080);