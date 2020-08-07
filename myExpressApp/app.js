var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tehran"
  });


  ////Insert Topic////
  con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO topics (user_id, topic_name, topic_describtion, status , file_url) VALUES ?";
  var values = [
      ['300','34','23','1','2']
  ];
  con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
  });
  });


  ////Update Topic////
  var records = 
 ['1000','test','topic_des','0','test_url','4'];
  con.connect(function(err) {  
    if (err) throw err;  
    var sql = "UPDATE topics SET user_id =?,topic_name=?,topic_describtion=?, status=? , file_url=? WHERE topic_id =?";  
    con.query(sql,records, function (err, result) {  
    if (err) throw err;  
    console.log(result.affectedRows + " record(s) updated");  
    });  
    });  



    ////Accept Admin////
    var records = 
    ['4'];
 
   con.connect(function(err) {  
     if (err) throw err;  
     var sql = "UPDATE topics SET status=1 WHERE topic_id =?";  
     con.query(sql,records, function (err, result) {  
     if (err) throw err;  
     console.log(result.affectedRows + " record(s) updated");  
     });  
     });


     ////Upload file///
    
     var http = require('http');
     var formidable = require('formidable');
     var fs = require('fs');
     
     http.createServer(function (req, res) {
       if (req.url == '/fileupload') {
         var form = new formidable.IncomingForm();
         form.parse(req, function (err, fields, files) {
           var oldpath = files.filetoupload.path;
           var newpath = 'C:/Users/chist/' + files.filetoupload.name;
           fs.rename(oldpath, newpath, function (err) {
             if (err) throw err;
             res.write('File uploaded and moved!');
             res.end();
           });
      });
       } else {
         res.writeHead(200, {'Content-Type': 'text/html'});
         res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
         res.write('<input type="file" name="filetoupload"><br>');
         res.write('<input type="submit">');
         res.write('</form>');
         return res.end();
       }
     }).listen(8080);

module.exports = app;
