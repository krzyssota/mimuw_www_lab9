import express = require('express');
import indexRouter = require('./routes/index');
import memeRouter = require('./routes/meme');
import path = require('path');

const app = express();
const port = 3000;

app.use(express.urlencoded({
  extended: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on  http://localhost:${port}`);
});

// routing
app.use('/', indexRouter);
app.use('/meme', memeRouter);

// error handling
app.use(function(err, req, res, next) {
  console.error('error: ' + err)
  res.render('error', { error: err, message: 'error occured :('});
});

module.exports = app;




