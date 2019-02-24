//Server Mode (Backend)
var jsdom = require('jsdom');
$ = require('jquery')(new jsdom.JSDOM().window);

const keys = require('../config/keys');

//Для базы данных MongoDB
const mongoose = require('mongoose');
//Объект роутинга
const express = require('express');
const router = express.Router();
//Наша модель mongoose
const Vote = require('../models/Vote');
const Pusher = require('pusher');

//Контроллер
var PollController = require('../controllers/pollController');
var pollController = new PollController();

var pusher = new Pusher({
    appId: keys.pusherAppId,
    key: keys.pusherKey,
    secret: keys.pusherSecret,
    cluster: keys.pusherCluster,
    encrypted: keys.pusherEncrypted
});

//Если запрос уходит методом GET
router.get('/', (req, res) => {
    res = pollController.list(res);
    return res;
});

//Если запрос уходит методом GET
router.delete('/delete', (req, res) => {

    //Удаление данных
    res = pollController.deleteAll(res);
    return res;

});

//Если запрос уходит методом POST
router.post('/', (req, res) => {
    res = pollController.addVote(req, res)
    return res;
});

module.exports = router;
