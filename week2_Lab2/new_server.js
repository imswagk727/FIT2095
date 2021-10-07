let http = require('http');
let fs = require('fs');
let fileName = 'index.html';
let url = require("url");
http.createServer(function (request, response) {
    let url = request.url;
    var baseURL = "http://" + request.headers.host + "/";
    console.log(baseURL);
    var new_url = new URL(request.url, baseURL);

    console.log('request:', url);

    let filePath = new_url.pathname;
    console.log("filePath:" + filePath);

    if (filePath === "/whichweek/") {
        let params = new_url.searchParams;
        console.log(params);
        let diff = getDaysDiff(params.get("d"), params.get("m"), params.get("y"));
        let msg = 'We are in week ' + diff;
        if (diff < 1) {
            msg = 'Wrong date!! First day in Sem 2 is the 26th of July 2021';
        } else if (diff > 12) {
            msg = 'Wrong date!! Last day in Sem 2 is the 22nd of October 2021';
        }
        response.end(msg);
        return;
    }
    else
        switch (url) {
            case '/':
                fileName = 'index.html';
                break;
            case '/index':
                fileName = 'index.html';
                break;
            case '/assessments':
                fileName = 'assessments.html';
                break;
            case '/topics':
                fileName = 'topics.html';
                break;
            case '/help':
                fileName = 'help.html';
                break;
            default:
                fileName = '404.html';
                break;
        }
    fs.readFile(fileName, function (error, content) {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.end(content, 'utf-8');
    });
}).listen(5050);
console.log('Server running at http://127.0.0.1:5050/');

function getDaysDiff(d, m, y) {
    let returnValue = -1;
    let currentDay = new Date();
    currentDay.setDate(parseInt(d));
    currentDay.setMonth(parseInt(m) - 1); // months start from 0
    currentDay.setYear(parseInt(y));
    let firstDay = new Date("2021-07-26"); // first day in semester 2
    if (currentDay >= firstDay) {
        var diffDays = parseInt((currentDay - firstDay) / (1000 * 60 * 60 * 24)); //gives day difference 
        returnValue = (Math.floor(diffDays / 7) + 1);
    }
    return (returnValue);
}