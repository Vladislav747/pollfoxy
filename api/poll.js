//Server Mode (Backend)
/*
TODO: К сожалению невозможно выполнять вызов событий в node.js привычным способ через trigger
*/
var jsdom = require('jsdom');
$ = require('jquery')(new jsdom.JSDOM().window);

const keys = require('../config/keys');
var events = require('events');
const eventEmitter = new events.EventEmitter();
//Для базы данных MongoDB
const mongoose = require('mongoose');
//Объект роутинга
const express = require('express');
const router = express.Router();
//Наша модель mongoose
const Vote = require('../models/Vote');
const Pusher = require('pusher');

var pusher = new Pusher({
    appId: keys.pusherAppId,
    key: keys.pusherKey,
    secret: keys.pusherSecret,
    cluster: keys.pusherCluster,
    encrypted: keys.pusherEncrypted
});

//Если запрос уходит методом GET
router.get('/', (req, res) => {
    
    //Находим нашу модель Данных с помощью метода find();
    Vote.find().then(votes => res.json({ success: true, votes: votes }));
    
});

//Если запрос уходит методом GET
router.get('/delete', (req, res) => {
    
    //Находим нашу модель Данных с помощью метода find();
    Vote.deleteMany().then( () => res.json({ success: true, delete: true }));
   


});


//Если запрос уходит методом POST
router.post('/', (req, res) => {


    const newVote = {
        os: req.body.os,
        point: 1,
    };

    //в нашу модель Vote сохраняем данные newVote согласно схеме данных
    new Vote(newVote).save().then(vote => {
        //Генерируем событие os-vote с каналом os-poll на весь документ с обновлением графика
        pusher.trigger('os-poll', 'os-vote', {
            //point не делаю +1 так как он возвращает и прошлое количество то же по каждой операционке
            point: parseInt(vote.point),
            os: req.body.os,
        });


    });
  
    console.log(req.body, "Наш запрос");

    // $('body').trigger('os-polla', {
    //     data: 1
    // });


    //Генерируем событие с помощью метода emit
    // eventEmitter.emit('os-polla','a', 'b');
    return res.json({ success: true, message: "Спасибо ответ дошел" });


});



module.exports = router;
