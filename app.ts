import express = require('express');
import indexRouter = require('./routes/index');
import memeRouter = require('./routes/meme');
import loginRouter = require('./routes/login');
import path = require('path');

import csurf = require('csurf');
import * as sqlite from 'sqlite3';
import cookieParser = require('cookie-parser');

// tslint:disable-next-line: no-var-requires
const session = require('express-session');
const connectSqlite = require('connect-sqlite3');
const SqliteStore = connectSqlite(session);

const app = express();
const port = 3000;
const csrfProtection = csurf({ cookie: true });
export const secretString = '102101101108032116104101032098101114110'

sqlite.verbose();
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cookieParser(secretString));

app.use(session({
  secret: secretString,
  cookie: { maxAge: 15*60*1000 },
  resave: false,
  saveUninitialized: true,
  store: new SqliteStore()})
)

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on  http://localhost:${port}`);
});

// routing
app.use('/', indexRouter);
app.use('/meme', memeRouter);
app.use('/login', loginRouter);

// error handling
app.use(function(err, req, res, next) {
  console.error('error: ' + err)
  res.render('error', { error: err, message: 'error occured :('});
});

module.exports = app;




