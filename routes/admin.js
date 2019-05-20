//Объект роутинга
const express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
const passport = require('passport')
const session = require('express-session')


//Наша модель mongoose
const Vote = require('../models/Vote');

//Контроллер
var PollController = require('../controllers/pollController');
var pollController = new PollController();

//Настраиваем Шаблон handlebars
var handlebars = require('express3-handlebars').create({
  defaultLayout: 'default',
  helpers: {
    section: function (name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    }
  }
});

//Движок для обработки шаблона
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(cookieParser());

//Проверка на то что объект пустой
function isEmptyObject(obj){
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}


// app.get('/', (request, response) =>  response.sendFile(`${__dirname}/registration.html`));

//Сначала проходим через заполнение логина и пароля
app.get('/', (req, res) => {
  console.log("Проверка на авторизованность");

  console.log('Cookies: ', req.cookies);
  
 

  //Если понадобится отправить html файлы
 // res.sendFile(__dirname + '/registration.html');

 

//  if(isEmptyObject(req.cookies)){
//   //  res.render('enter_admin', { title: "Enter Panel"}); 
//    res.render('registration', { title: "Enter Panel"});
//  }else{
//   res.render('admin', {title: "Admin Section", extra_css_scripts: '<link rel="stylesheet" type="text/css" href="/css/dashboard.css">' });
//  }
  
 res.render('admin', {title: "Admin Section", extra_css_scripts: '<link rel="stylesheet" type="text/css" href="/css/dashboard.css">' });
  
});

app.post('/', (req,res) => {
  console.log("works form");
  console.log(req.body, "body-form");
  //res.redirect(303, '/thank-you' );

   res.sendStatus(200);
});

//Вывести все голоса
app.get('/list', (req, res) => {

  Vote.find({},function(err,documents) {
    // 'documents' будет содержать все документы,
    // возвращенные запросом
    res.send(documents.map(function(d) {
      // Возвращаем объект в более полезном виде,
      // который res.send() сможет отправить во вне как JSON
      return d._doc;
    }));
    
  });
  
 });





module.exports = app;

