if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require */
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8001;

const slack = require('./routes/slack');
const channels = require('./routes/channels');
const message = require('./routes/message');
// const users = require('./routes/users');

app.use('/slack', slack.router);
app.use(channels);
app.use(message);
// app.use(users);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.get('/', (req, res) => {
  res.sendStatus(200);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = app.listen(port, () => {
  if (app.get('env') !== 'test') {
    /* eslint-disable no-console */
    console.log('Listening on port', port);
  }
});

const io = socket(server);

io.on('connection', (sock) => {
  // event listener for clients to connect [to this, the channel aka server]
  /* eslint-disable no-console */
  console.log(`Made socket connection [${sock.id}]`);
});

slack.setEvents(io); // function setEvents(io) ...

module.exports = app;
