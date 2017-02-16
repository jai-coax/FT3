var app = require('../server');

exports.show500 = function (err, req, res) {
    if (app.httpMsgsFormat === "HTML") {
            res.writeHead(500, "Internal Error Occured", {"Content-type": "text/html"});
			res.write("<html><head><title>500</title></head><body>500: Internal error. Details: " + err + "</body></html>");
    } else {
            res.writeHead(500, "Internal Error Occured", {"Content-type": "application/json"});
			res.write(JSON.stringify({ "Error" : true ,DETAILS: "ERROR Occured:" + err }));
    }
    res.end();
};

exports.sendJson = function (data, req, res) {
        res.writeHead(200, { "Content-type": "application/json" })
        if(data)  {
            res.write(JSON.stringify(data));
        }
        res.end();
};

exports.show405 = function (req, res) {
    if (app.httpMsgsFormat === "HTML") {
            res.writeHead(405, "Method not supported", {"Content-type": "text/html"});
			res.write("<html><head><title>405</title></head><body>405: Method not supported</body></html>");
    } else {
            res.writeHead(405, "Method not supported", {"Content-type": "application/json"});
			res.write(JSON.stringify({ "Error" : true , DETAILS: "Method not supported"}));
    }
    res.end();
};

//when page not found below error ocuurs
exports.show404 = function (req, res) {
    if (app.httpMsgsFormat === "HTML") {
            res.writeHead(404, "Resource not found", {"Content-type": "text/html"});
			res.write("<html><head><title>404</title></head><body>404: Resource not found</body></html>");
    } else {
            res.writeHead(404, "Method not supported", {"Content-type": "application/json"});
			res.write(JSON.stringify({ "Error" : true , DETAILS: "Resource not found"}));
    }
    res.end();
};

// blowing too much of information (eg: POST 100 MB of data into site)
exports.show413 = function (req, res) {
    if (app.httpMsgsFormat === "HTML") {
            res.writeHead(413, "Request Enitity Too Large", {"Content-type": "text/html"});
			res.write("<html><head><title>413</title></head><body>413: Request Enitity Too Large</body></html>");
    } else {
            res.writeHead(413, "Request Enitity Too Large", {"Content-type": "application/json"});
			res.write(JSON.stringify({ "Error" : true , DETAILS: "Request Enitity Too Large"}));
    }
    res.end();
};

exports.send200 = function (req, res) {
     res.writeHead(413, {"Content-type": "application/json"});
     res.end();
};