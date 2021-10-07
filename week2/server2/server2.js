let http = require("http");
let fs = require("fs");
http.createServer(function (request, response) {
    console.log("request ", request.url);
    let filePath = "." + request.url;
    console.log(filePath)
    if (filePath === "./") {
      filePath = "./index.html";
    }
    fs.readFile(filePath, function (error, content) {
      if (error) {
        fs.readFile("./404.html", function (error, content) {
          response.writeHead(404, { // file not found
            "Content-Type": "text/html",
          });
          response.end(content, "utf-8");
        });
      } else {
        response.writeHead(200, { // OK
          "Content-Type": "text/html",
        });
        response.end(content, "utf-8");
      }
    });
  })
  .listen(8080);
console.log("Server running at http://127.0.0.1:8080/");