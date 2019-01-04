//Bringing the dependencies
const express = require('express');
const bodyParser = require('body-parser');

//init app
const app = express();
// Define port
const port = 3000;


// Start server
const server = app.listen(port, () => console.log(`Server started on port ${port}`));
//Experiment - socket.io doesn't work
//const server1 = app.listen(port);

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));





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
    // console.log(req.body);
    const number = req.body.number;
    const text = req.body.text;
  });