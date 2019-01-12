const express = require('express');
var jsdom = require('jsdom');
$ = require('jquery')(new jsdom.JSDOM().window);
const EventEmitter = require('events');

const router = express.Router();



//Если запрос уходит методом GET
router.get('/', (req, res) => {
    res.send('POLL');

    Vote.find().then(votes => res.json({ success: true, votes: votes }));



});

//uri = 
//Если запрос уходит методом POST
router.post('/', (req, res) => {
  
   
   req.body = {
        os: req.body.os,
        point: 1,
   };
    console.log(req.body, "Наш запрос");
 
    return res.json({ success: true, message: "Спасибо ответ дошел" });


});


module.exports = router;
