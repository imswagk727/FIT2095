let express = require("express");
let app = express();


app.get('/week3/marks/:pre/:wsq/:lab', function (req, res) {
    console.log(req.params);
    let mark = calculateMark(req.params.pre, req.params.wsq, req.params.lab);
    console.log(mark);
    res.send('Week 3 Mark is ' + mark);
});

app.listen(8080);


function calculateMark(prerq, wsq, lab) {
    let weekMark = 0;
    weekMark = prerq * 0.1 + wsq * 0.1 + lab * 0.2
    return weekMark;
};

