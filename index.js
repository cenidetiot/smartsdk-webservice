'use strict';

var app = require('./app');
var port = process.env.PORT || 4005;

app.listen(port, function(){
	console.log(" Servidor del api rest escuchando en http://localhost: " + port);
});