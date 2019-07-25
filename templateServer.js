var http = require('http');
const fs = require('fs');
var querystring = require('querystring');

var server = http.createServer().listen(3000);

var statusCode = 200;
var statusMsg = "I am trying, this is a VTEX environment man, calm down.";

var VTEXenv = "yourEnv";

server.on('request', function (req, res) {
    if (req.method == 'POST') {
        var body = '';
    }

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        var post = querystring.parse(body);

        var dir = "./templates/" + post.listName;

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        fs.writeFile(dir + "/" + post.filename + ".hml", post.templateHtml, function(err) {
            if(err) {
                statusCode = 500;
            }

            statusMsg = "The file: " + post.filename + " was saved!";
            console.log(statusMsg);
        });

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'https://'+VTEXenv+'.myvtex.com');
        res.setHeader('Access-Control-Allow-Origin', 'https://'+VTEXenv+'.vtexcommercestable.com.br');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        res.writeHead(statusCode, {'Content-Type': 'text/plain'});
        res.end(statusMsg);

    });
});
console.log('Listening on port 3000');