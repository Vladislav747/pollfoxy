//Bringing the dependencies
const express = require('express');
//To manage for path routes
const path = require('path');
const bodyParser = require('body-parser');
//CORS headers
const cors = require('cors');

//DB Config with Mongoose
require('./config/db');

//init app
const app = express();

//route in routes
const poll = require('./routes/poll');

//set public folder
app.use(express.static(path.join(__dirname,'public')))






// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Enable cors
app.use(cors());


//при запросе index/poll мы идем на /routes/poll.js
app.use('/poll', poll);

// Define port
const port = process.env.PORT || 3000;


// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
//Experiment - socket.io doesn't work
//const server1 = app.listen(port);

// Index route
//We define a route handler / that gets called when we hit our website home.
app.get('/', (req, res) => {
    res.render('index');
  });

  // nexmo.message.sendSms(
  //   '79123295460', '7912435643', 'Text', {type: 'Unicode'},
  //   (err, responseData) => {
  //     if(err){
  //       console.log(err);
  //     } else {
  //       console.dir(err);
  //     }
  //   }
  // );

//catch form submit
  app.post('/',  (req, res) => {
    // res.send(req.body);
    console.log(req.body, "Из App.js");
    const number = req.body.number;
    const text = req.body.text;
  });