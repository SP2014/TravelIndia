#!/bin/env node


var express = require('express');
var app = express();
var fs      = require('fs');
var bodyParser = require('body-parser'); 
var mongoose = require('mongoose');
var path = require('path');
var config = require('./config/config');
var morgan = require('morgan');

var isLocal = true;


//mongoose.connect(config.database);


app.use(morgan('dev'));
//app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'app')));
app.set('views', path.join(__dirname, '/app/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('HTML', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


require('./app/routes.js')(app);


//===========================
//=======SERVER START========
//===========================

app.listen(config.port, config.ipaddress, function() {
        console.log('%s: Node server started on %s:%d ...',
                    Date(Date.now() ), config.ipaddress, config.port);
});