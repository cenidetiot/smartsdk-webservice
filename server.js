'use strict';

var express 	= require('express');
var bodyParser 	= require('body-parser');
var morgan 		= require('morgan');
var cors 		= require('cors')

var app = express();

//cofiguración de context
var context = require('./config/config').context;
var cb = require('ocb-sender')
	.config(context)

var dataModelsApi 	= require('./DataModelsAPI/api')
var crateApi 		= require('./CrateAPI/api')
var servicesApi = require('./ServicesAPI/api')

//Configurar bodyParser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors())

//Root endpoint
app.route('/')
	.get((req, res, next) => {res.json({ message: 'Welcome to Smart Security Web Service' });
});

//Specific endpoints
app.use('/api', dataModelsApi)
app.use('/crate', crateApi)
app.use('/service', servicesApi)

//Middleware to catch and handle a 404 error (an unidentified route)
app.use(function(req, res) {
	res.status(404).send({ url: req.originalUrl + ' not found' })
});

const port = process.env.PORT || 4005;

app.listen(port, function(){
	console.log(" Servidor del api rest escuchando en http://localhost:" + port);
});