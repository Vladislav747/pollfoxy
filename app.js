//Bringing the dependencies
const express = require('express');
//To manage for path routes
const path = require('path');
const bodyParser = require('body-parser');
//CORS headers
const cors = require('cors');

//DB Config with Mongoose
require('./config/db');

//Poll methods
const poll = require('./api/poll');

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

// Define port
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));

//Routing in another file
require('./api/routing.js')(app);

