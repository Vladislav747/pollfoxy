//Bringing the dependencies
const express = require('express'),
//To manage for path routes
path = require('path'),
bodyParser = require('body-parser'),
//CORS headers
cors = require('cors');

//DB Config with Mongoose
require('./config/db');

//Poll methods
const poll = require('./routes/poll');

//Admin methods
const admin = require('./routes/admin');

//init app
const app = express();

//set public folder
app.use(express.static(path.join(__dirname,'public')))

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Enable cors
app.use(cors());


//при запросе index/poll мы идем на /routes/poll.js
app.use('/poll', poll);

//при запросе index/admin мы идем на /routes/admin.js
app.use('/admin', admin);


//при запросе index/admin мы идем на /routes/admin.js
app.use('/admin', admin);


// Define port
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));

//Routing in another file
require('./routes/routing.js')(app);


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }
  
  //production error handler
  //no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: 'error'
    });
  });

module.exports = app;
