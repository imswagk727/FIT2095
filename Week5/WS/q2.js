// get an instance of MongoDB:
const mongodb = require('mongodb');

//reference MongoDB client:
const MongoClient = mongodb.MongoClient;

//the URL to the MongoDB server:
const url = 'mongodb://localhost:27017/';

//declare db
let db;


MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    if (err) {
        console.log('Err  ', err);
    } else {
        console.log("Connected successfully to server");
        db = client.db('W5_workshop_db'); //db name
        db.collection('flights').insertMany([ //insert several documents(row)
            { flightDate: '2024-9-25', from: 'SA', to: 'SYD', airline: 'VA', cost: 1000 },
            { flightDate: '2018-9-25', from: 'PEK', to: 'NT', airline: 'CZ', cost: 999 },
            { flightDate: '2019-9-25', from: 'SYD', to: 'NT', airline: 'DB', cost: 1000 },
            { flightDate: '2020-9-25', from: 'SYD', to: 'NT', airline: 'VA', cost: 444 },
            { flightDate: '2012-2-27', from: 'SYD', to: 'NT', airline: 'VA', cost: 1000 },
            { flightDate: '2015-3-25', from: 'SYD', to: 'NY', airline: 'VA', cost: 1000 },
            { flightDate: '2013-4-12', from: 'SYD', to: 'NT', airline: 'SZ', cost: 333 },
            { flightDate: '2021-7-03', from: 'SYD', to: 'NT', airline: 'VP', cost: 1000 },
            { flightDate: '2021-3-05', from: 'SA', to: 'SYD', airline: 'VA', cost: 222 },
            { flightDate: '2014-9-25', from: 'SYD', to: 'NT', airline: 'VA', cost: 1000 },
            { flightDate: '2020-9-25', from: 'SYD', to: 'NT', airline: 'VA', cost: 1000 },
            { flightDate: '2014-9-26', from: 'SYD', to: 'WAS', airline: 'VA', cost: 1000 },
            { flightDate: '2017-7-25', from: 'PVD', to: 'NT', airline: 'VA', cost: 111 },
            { flightDate: '2020-1-23', from: 'SYD', to: 'NT', airline: 'VA', cost: 51 },
            { flightDate: '2017-6-25', from: 'SYD', to: 'DY', airline: 'VA', cost: 544 },
        ]);

        // 1.Retrieve the first 10 flights with ‘VA’ airline
        let query = { airline: 'VA' };
        db.collection("flights").find(query).limit(10).toArray(function (err, result) {
            if (err) throw err;
            console.log('Q1');
            console.log(result);
        });


        //2.Retrieve all flights between ‘SA’ and ‘SYD’ in an array format sorted by cost in descending order
        let query2 = { from: 'SA', to: 'SYD', };
        let sortBy = { cost: -1 }
        //Syntax:{ field: value}  1 ASC or -1 DESC
        db.collection("flights").find(query2).sort(sortBy).toArray(function (err, result) {
            if (err) throw err;
            console.log('Q2');
            console.log(result);
        });

        //3.Triple the cost of flights between ‘SYD’ and ‘NT’
        db.collection("flights").updateMany({ from: 'SYD', to: 'NT' }, { $mul: { cost: 3 } }, { upsert: true }, function (err, result) {
        });

        //4.Delete all the flights with cost less than 300
        db.collection("flights").deleteMany({ cost: { $lt: 300 } }, function (err, obj) {
        });
    }
});