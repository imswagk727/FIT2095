let express = require('express');
let app = express();

// configure the Express app to handle the engine:
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

let db = [];
db.push({
    carId: 0,
    carMake: 'BMW',
    carModel: '735',
    carYear: 2014
});
db.push({
    carId: 1,
    carMake: 'Mercedes',
    carModel: 'C250',
    carYear: 2017
});
db.push({
    carId: 3,
    carMake: 'Audi',
    carModel: 'A6',
    carYear: 2019
});

app.get('/', function (req, res) {
    res.render('index_new.html', { username: "Guest", carDb: db }); // using new html
});

app.listen(8080);