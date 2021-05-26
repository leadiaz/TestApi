const express = require('express');
var path = require('path');
const https = require('https');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
var logger = require('morgan');
process.env.PORT = process.env.PORT || 3000;
//
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
// ===================================
// parse application/x-www-form-urlencoded
// ===================================
app.use(bodyParser.urlencoded({ extended: false }));
// ===================================
// parse application/json
// ===================================
app.use(bodyParser.json());
// ===================================
//parse raw json data
// ===================================
app.use(bodyParser.raw()); 
// ===================================
// Configuración global de rutas
// ===================================
app.use(require('./routes/index'));
app.listen(process.env.PORT, () => {
     console.log('Escuchando puerto: ', process.env.PORT);
 });
/*https.createServer(options, app).listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});*/
module.exports = app;