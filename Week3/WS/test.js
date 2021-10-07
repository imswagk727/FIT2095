let express = require("express");
let app = express();

app.get('/week3*', function (req, res) {
    res.send('Welcome to week 3')
})


app.listen(8080);