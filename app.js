const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session)
const morgan = require('morgan');
const winston = require('winston');

const fs = require('fs');

const HomeController = require('./controllers/HomeController');
const AdminController = require('./controllers/AdminController');
const OperatorController = require('./controllers/OperatorController');
const SecurityController = require('./controllers/SecurityController');
const { DEFAULT_PROFILE_ADMIN, DEFAULT_PROFILES, stage_NAME, stage_DESCRIPTION, DEFAULT_PROFILE_OPERATOR } = require('./config/consts');
const { tokenIsValid } = require('./config/utils');

const app = express();


const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  format: combine(
    label({ label: "HMS" }),
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.File({
      filename: `logs/error-${new Date().toISOString().substring(0, 10)}.log`,
      level: "error"
    }),
    new winston.transports.File({
      filename: `logs/combined-${new Date().toISOString().substring(0, 10)}.log`
    })
  ]
});

app.use(morgan("combined", {
  stream: {
    write: message => logger.info(message)
  }
}))

// view engine setup
// view engine setup
app.engine('ejs', require('express-ejs-extend'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const secret_dev = "j3sU1sc@r10h"
const secret_prod = "j3sU1sc@r10h@8521"
const age = 12 * 60 * 60 * 1000 // 48 hours
const modactuel = process.env.NODE_ENV || 'development'

if (modactuel == "development") {
  const client = redis.createClient()
  app.use(session({
    secret: secret_dev,
    store: new redisStore({
      host: 'localhost',
      port: 6379,
      client: client,
      ttl: 260
    }),
    saveUninitialized: true,
    resave: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: age
    }
  }));
} else {
  app.use(session({
    secret: secret_prod,
    saveUninitialized: true,
    resave: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: age
    }
  }));
}


app.use(
  '/',
  (req, res, next) => {
    console.log("__HomeController________________________________")
    next()
  }, HomeController
)


app.use(
  '/admin',
  (req, res, next) => {
    console.log("__AdminController________________________________")
    if (req.session.usertoken) {
      if (tokenIsValid(req.session.expiration)) {
        if (req.session.userdata.profile == DEFAULT_PROFILE_ADMIN) {
          next()
        } else {
          res.redirect("/security/logout")
        }
      } else {
        res.redirect("/security/logout")
      }
    } else {
      res.redirect("/security/login")
    }
  }, AdminController
)

app.use(
  '/operator',
  (req, res, next) => {
    console.log("__OperatorController________________________________")
    if (req.session.usertoken) {
      if (tokenIsValid(req.session.expiration)) {
        if (req.session.userdata.profile == DEFAULT_PROFILE_OPERATOR) {
          next()
        } else {
          res.redirect("/security/logout")
        }
      } else {
        res.redirect("/security/logout")
      }
    } else {
      res.redirect("/security/login")
    }
  }, OperatorController
)

app.use(
  '/security',
  (req, res, next) => {
    console.log("__SecurityController______________________________")
    next()
  }, SecurityController
)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // next(createError(404));
  res.render('security/notfound', {
    appName: stage_NAME,
    appDescription: stage_DESCRIPTION
  })
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
