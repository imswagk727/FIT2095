let express = require('express');
let app = express();

// configure the Express app to handle the engine:
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function (req, res) {
    let randomId = Math.round(Math.random() * 100);
    res.render('index.html', { username: "admin", id: randomId });
});

app.listen(8080);