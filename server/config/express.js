const path = require('path');
const express = require('express');
const httpError = require('http-errors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const routes = require('../routes/index.route');
const config = require('./config');
const passport = require('./passport')

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

var distDir = '../../dist';

/* Separate sub-applications for each language */
const app_en = express();
app_en.use(express.static(path.join(__dirname, distDir, 'en')));
app_en.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, distDir, 'en' + '/index.html'));
});

const app_de = express();
app_de.use(express.static(path.join(__dirname, distDir, 'de')));
app_de.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, distDir, 'de', '/index.html'));
});

app.use('/en', app_en);
app.use('/de', app_de);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

app.use(helmet());  // secure apps by setting various HTTP headers

app.use(cors());  // enable CORS - Cross Origin Resource Sharing

app.use(passport.initialize());

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/', routes); // API router

app.use((req, res, next) => { // catch 404 and forward to error handler
  const err = new httpError(404)
  return next(err);
});

app.use((err, req, res, next) => {  // error handler, send stacktrace only during development
  if (err.isJoi) {  // customize Joi validation errors
    err.message = err.details.map(e => e.message).join("; ");
    err.status = 400;
  }
  res.status(err.status || 500).json({
    message: err.message
  });
  next(err);
});

module.exports = app;
