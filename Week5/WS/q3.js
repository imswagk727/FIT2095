const express = require('express');
const app = express();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
app.use(express.json());

app.set('PORT', 8080)
const url = 'mongodb://localhost:10.152.168.99:68153';
let db;

MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    if (err) {
        console.log('Err  ', err);
    } else {
        console.log("Connected successfully to server");
        db = client.db('agency');
    }
});

app.post('/postbooking', (req, res) => {
    let book_document = req.body;
    db.collection('booking').insertOne(book_document);
});

app.listen(app.get('PORT'), () => {
    console.log(`Listening on ${app.get('PORT')}`);
});