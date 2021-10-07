let express = require("express");
let router = express.Router();


var db = [];


router.get('/addbook', function (request, response) {
    let newId = Math.round(Math.random() * 1000);
    let bookObj = {
        id: newId,
        titleParm: request.query.title,
        authorParm: request.query.author,
        topicParm: request.query.topic,
        costParm: request.query.cost
    };
    db.push(bookObj);
    response.send(db);
});


router.get('/getallbooks', function (request, response) {
    response.send(generateList());
    console.log(db);
});

router.get('/deleteid/:userId2Delete', function (req, res) {
    var index;
    var id = parseInt(req.params.userId2Delete);
    for (let i = 0; i < db.length; i++) {
        if (db[i].id === id) {
            index = i;
        }
    };
    db.splice(index, 1);
    res.send(generateList());
});

router.get('/getbookstorevalue', function (request, response) {
    var value = 0;
    for (let i = 0; i < db.length; i++) {
        value += parseInt(db[i].costParm);
    };
    response.send(`The total value is ${value}`);
});


//extra task
router.get('/booksinacategory/:topic', function (request, response) {
    var count = 0;
    for (let i = 0; i < db.length; i++) {
        if (db[i].topicParm === request.params.topic) {
            count += 1;
        }
    }
    response.send(`The total number of boooks in ${request.params.topic} is ${count}`)
});

function generateList() {
    let st = 'ID  Title Author  Topic  Cost </br>';
    for (let i = 0; i < db.length; i++) {
        st += db[i].id + ' | ' + db[i].titleParm + ' | ' + db[i].authorParm + ' | ' + db[i].topicParm + ' | ' + db[i].costParm + '</br>';
    }
    return st;
}


//export this router
module.exports = router;