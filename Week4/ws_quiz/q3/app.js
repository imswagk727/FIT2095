const express = require("express");
const app = express();
app.use(function (req, res, next) {
    req.unitCode = "FIT2095";
    req.weekNumber = 4;
    next();
});
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

// your code here
app.post("/findmax", function (req, res) {
    console.log(req.body)
    let value1 = req.body.value1;
    let value2 = req.body.value2;
    if (value1 > value2) {
        res.send(`The max value is ${value1}`);
    }
    res.send(`The max value is ${value2}`);
})

app.listen(8080);