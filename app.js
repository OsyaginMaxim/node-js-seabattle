var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);


/*app.set('port', process.env.PORT || '8080');*/

server.listen(8080);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*
io.on('connection', function (socket) {
  socket.on('disconnect',function () {
      console.log('user disconnected');
  });
  socket.on('fire',function (data) {
    console.log('fire');
    socket.emit('isKill', data);
  });
  socket.on('kill',function (data) {
    socket.emit('drowshipkill', data);
    console.log('kill');
  });
  socket.on('notkill', function (data) {
    socket.emit('drowshipnotkill', data);
    console.log('notkill');
  });
  console.log('a user connected');
}); */ //socket
io.on('connection', function (socket) {
    console.log('new user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected')
    });
    socket.on('attack', function (data) {
        console.log('click',data);
        socket.broadcast.emit('changeColor', data);
        console.log('change',data);
    })



});



/*http.createServer(app).listen(app.get('port'), function () {
  console.log('Excpress server listen on port'+app.get('port'));

});*/



module.exports = app;
