let express = require('express');
let app = express();
app.get('/', function (req, res) {
    console.log('Hello World');
    res.send('Hello World');
});
app.get('/time', function (req, res) {
    let d = new Date();
    let msg = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    res.send(msg);
});
app.get('/date', function (req, res) {
    let d = new Date();
    let msg = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    res.send(msg);
});
app.listen(8080);