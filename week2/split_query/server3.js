let http = require("http");
let url = require("url");
http.createServer(function (req, res) {
    console.log("URL=" + req.url);
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    var baseURL = "http://" + req.headers.host + "/";
    var url = new URL(req.url, baseURL);
    let params = url.searchParams;
    console.log(params);
    let msg = params.get("year") + " " + params.get("month");
    res.end(msg);
  }).listen(8080);