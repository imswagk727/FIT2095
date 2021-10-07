// Install MongoDB package (driver):
// npm install mongodb --save

// get an instance of MongoDB:
const mongodb = require('mongodb');

//reference MongoDB client:
const MongoClient = mongodb.MongoClient;

//the URL to the MongoDB server:
const url = 'mongodb://localhost:27017/';

//declare db
let db;

MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    // parameters:
    // url: server’s URL, which is a local server listening at port 27017 (default )
    // { useNewUrlParser: true },  an object that is required for the latest version of MongoDB (version > 4/0)
    // function (err, client):  a callback function that will get executed after the connect operation finishes. 
    //     err: object that gets value if an error occurs 
    //     client: is used later to access the database as shown in line 6 that connects to a database named

    if (err) {
        console.log('Err  ', err);
    } else {
        console.log("Connected successfully to server");
        db = client.db('FIT2095_DB'); //db name
        db.collection('week5table'); //creates the collection named ‘week5table’.
        db.collection('week5table').insertOne({ name: 'Tim' }); // insert a document(row)

        db.collection('week5table').insertMany([ //insert several documents(row)
            { name: 'Alex', age: 25 },
            { name: 'John', age: 34 }, 
            { name: 'Max', age: 26 }
        ]);


        //Query the database
        let query = { name: 'Alex' }; //WHERE clause??  
        // or { name: /^T/ }; starts with ‘T’, for regualr expression, 
        // or { name: /x$/ }; ends with ‘x’
        db.collection("week5table").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
        });


        //Comparison Expression Operators 
        let query = { age: { $gte: 25 } }; //return all the documents that have an age greater than or equal to 25:
        // ---Operators	Description---
        // $CMP	Returns 0 IF THE TWO VALUES ARE EQUIVALENT, 1 IF THE FIRST VALUE IS GREATER THAN THE SECOND, AND - 1 IF THE FIRST VALUE IS LESS THAN THE SECOND.
        // $eq	Returns true if the values are equivalent.
        // $gt	Returns true if the first value is greater than the second.
        // $gte	Returns true if the first value is greater than or equal to the second.
        // $lt	Returns true if the first value is less than the second.
        // $lte	Returns true if the first value is less than or equal to the second.
        // $ne	Returns true if the values are not equivalent.
        db.collection("week5table").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
        });


        //Sorting the result
        let query = { age: { $gte: 25 } };
        let sortBy = { age: -1, name: 1 }  //sort all the documents in a descending by age and ascending by name
        //Syntax:{ field: value}  1 ASC or -1 DESC
        db.collection("week5table").find(query).sort(sortBy).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
        });

        //Limit the reuslt of sorting -> .limit() eg.top 5 documents in this example.
        // let query = { age: { $gte: 25 } };
        // let sortBy = { age: -1 }
        // db.collection("week5table").find(query).sort(sortBy).limit(5).toArray(function (err, result) {
        //     if (err) throw err;
        //     console.log(result);
        // });


        //Update Documents 
        // -->>> syntax: db.collection.updateOne( <filter>, <update>, <option> ), updates a single document based on the filter.
        // filter: the selection criteria for the update. Example: {name:’Tim’}
        // update: the modifications to apply by using a set of operators Example: {$set:{age:31}}

        // ----Set of operators---
        // Name	         Description
        // $currentDate	Sets the value of a field to current date, either as a Date or a Timestamp.
        // $inc	Increments the value of the field by the specified amount.
        // $min	Only updates the field if the specified value is less than the existing field value.
        // $max	Only updates the field if the specified value is greater than the existing field value.
        // $mul	Multiplies the value of the field by the specified amount.
        // $rename	Renames a field.
        // $set	Sets the value of a field in a document.
        // $setOnInsert	Sets the value of a field if an update results in an insert of a document.Has no effect on update operations that modify existing documents.
        // $unset	Removes the specified field from a document.
        db.collection("week5table").updateOne({ name: 'Chirs' }, { $set: { name: 'Chris', age: 29 } }, { upsert: true }, function (err, result) {
        });
        
        //Another for updating multiple documents
        db.collection("week5table").updateMany({ name: /x$/ }, { $inc: { age: 2 } }, { upsert: true }, function (err, result) {
        });

    }
});




