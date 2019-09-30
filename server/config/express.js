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


/* Separate sub-applications for each language */
var distDir = '../../dist';
const langs = ['en', 'de'];

for (let lang of langs) {
  const app_lang = express();
  app_lang.use(express.static(path.join(__dirname, distDir, lang)));
  app_lang.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, distDir, lang + '/index.html'));
  });
  app.use('/' + lang, app_lang);
}
app.get('/', (req, res) => res.redirect('/en'));  // default page English (TODO: read browser config, redirect to user's dominant language)


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
