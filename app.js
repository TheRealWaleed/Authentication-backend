const express = require('express');
const cookieParser = require('cookie-parser');
var pino = require('express-pino-logger')({prettyPrint: true})
const cors = require('cors');

const app = express();

app.use(cors());
app.use(pino)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send({message: 'Ra welcomes you !'});
});

require('./routes').authentication(app);

// Inexistent route
app.use(function(req, res, next) {
    return res.status(404).send({ message: 'Route '+req.url+' Not found.' });
});

// 500 - Any server error
app.use(function(error, req, res, next) {
    return res.status(500).send({ message: error.message, stack: error.stack});
});

module.exports = app;
