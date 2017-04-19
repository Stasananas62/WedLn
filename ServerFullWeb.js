/*console.log("Hey now!")
npm install node-static
var http = require('http');
var static = require('node-static');
var file = new static.Server('.');

http.createServer(function(request, response) {
  response.end(request.url);
}).listen(8080);

console.log('Server running on port 8080');
*/

/*
console.log('Hello');
//node serverFullWeb.js
var http = require('http');

var server = new http.Server();

server.listen(13337, '127.0.0.1');


server.on('request', function(req, res){
  res.end("Привет, мир!");
});
*/
var http = require('http');
var fs = require('fs');



function serveStaticFile(response, path, contentType, responceCode) {
    if (!responceCode) {
        responceCode = 200;
    }

    fs.readFile(__dirname + path, function(err, data) {
        if (err) {
            response.writeHead(500, {'Content-Type': 'plain/text'});
            response.end("Internal Error");
        } else {
            response.writeHead(responceCode, {'Content-Type': contentType});
            response.end(data);
        }
    });
}


var html = "<html>"
    + "<header></header>"
    + "<body>"
    + "%"
    + "</body>"
    + "<script src='browser-script.js'></script>"
    + "</html>";

var script = "console.log('hello');"

function sendResponse(response, headerCode, headerContentType, body) {
    response.writeHead(headerCode, {'Content-Type': headerContentType});
    response.end(body);
}

  http.createServer(function (request, response) {
  if (request.url === '/') {
      sendResponse(response, 200, 'text/plane',
          'If you want to visit web site, you should use a URL"/home" About creator use URL"/about"'
      );
  } else if (request.url === '/home') {
      serveStaticFile(response, '/public/FullWeb.html', 'text/html');

  } else if (request.url === '/homeRU') {
         serveStaticFile(response,  '/public/FullWebRu.html', 'text/html');

  }else if (request.url === '/about') {
      sendResponse(response, 200, 'text/html',
         html.replace("%",  'Stas, human, more detailed: https://vk.com/id95886564')
      );
  }  else if (request.url === '/FullWeb.js') {
      sendResponse(response, 200, 'FullWeb/FullWeb.js','text/javascript');//application/javascript

  }    else if (request.url === '/styleFullWeb.css') {
          sendResponse(response, 200, 'FullWeb/styleFullWeb.css','text/css');
  }  else {
      sendResponse(response, 404, 'text/html',
          html.replace("%", "<p style='font-size: 40px'>Not Found</p>")
      );
  }

}).listen(8081);

//node ServerFullWEb
