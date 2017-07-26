var express = require('express');
var app = express();
 
app.use(express.static('public'));
 
app.get('/', function (req, res) {
   res.send('Hello World');
})

// app.get('/demo.html', function (req, res) {
//    res.sendFile( __dirname + "/" + "demo.html" );
// })

// app.get('/minifyImage.js', function (req, res) {
//    res.sendFile( __dirname + "/" + "minifyImage.js" );
// })

// app.get('/index.js', function (req, res) {
//    res.sendFile( __dirname + "/" + "index.js" );
// })

app.get('/*', function (req, res) {
   res.sendFile( __dirname  + req.path );
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})