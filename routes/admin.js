//Объект роутинга
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer({ dest: './uploads' });
//For passport functions
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//For session
const session = require('express-session');

//For Validation
const expressValidator = require('express-validator');

//Модели mongoose
const Vote = require('../models/Vote');
const User = require('../models/User');

//Настраиваем Шаблон handlebars
var handlebars = require('express3-handlebars').create({
  defaultLayout: 'default',
  helpers: {
    section: function (name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    },
    each: function (name, options) {
      name = name || 0;
      var ret = "";
      for (var i = 0, j = name.length; i < j; i++) {
        ret = ret + name[i].msg;
      }
      return ret;
    }
  }
});

//Движок для обработки шаблона
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
//Обязателен секретный ключ
app.use(cookieParser('secret-key'));

//Enable sessions
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

// Validator
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});



//Сначала проходим через заполнение логина и пароля
app.get('/', (req, res) => {

  console.log(req.cookies, "Cookies");
  console.log(req.signedCookies, "Signed Cookies");

  if (req.signedCookies.email && req.signedCookies.userLogged) {

    res.render('admin', {
      title: "Admin Section",
      extra_css_scripts: '<link rel="stylesheet" type="text/css" href="/css/dashboard.css">',
      email: req.signedCookies.email
    });


  } else {
    //Отправляем ответ в header
    res.location('/admin/login');
    //Перенаправляем на login если нет cookie
    res.redirect('/admin/login');
  }

});


app.get('/login', (req, res) => {

  res.render('login', { title: "Login Page" });

});

app.post('/login', (req, res) => {

  console.log(req.body);
  var email = req.body.inputEmail;

  //Validate results
  req.checkBody('inputEmail', 'Email field is required').notEmpty();
  req.checkBody('inputEmail', 'Email field is not valid').isEmail();
  req.checkBody('inputPassword', 'Name field is required').notEmpty();

  //Check errors 
  var errors = req.validationErrors();

  if (errors) {
    //Если есть ошибки то мы перезаписываем страницу
    res.render('login', {
      errors: errors
    });
    console.log(errors, "Validate Errors")

  } else {
    console.log("No Errors")

    //Создаем cookie - делаем их подписанными чтобы их не могли модифицировать пользователи
    res.cookie('email', email, { signed: true, path: '/admin', maxAge: 120000 });
    res.cookie('userLogged', 'true', { signed: true, path: '/admin', maxAge: 120000 });

    //Отправляем ответ в header
    res.location('/admin');
    //Перенаправляем на admin после успешной регистрации
    res.redirect('/admin');
  }
});

app.get('/register', (req, res) => {

  res.render('register', { title: "Register Page" });

});

app.post('/register', (req, res) => {

  console.log(req.body);

  var email = req.body.inputEmail;
  var password = req.body.inputPassword;

  //Validate results
  req.checkBody('inputEmail', 'Email field is required').notEmpty();
  req.checkBody('inputEmail', 'Email field is not valid').isEmail();
  req.checkBody('inputPassword', 'Name field is required').notEmpty();
  req.checkBody('inputPassword2', 'Passwords do not match').equals(req.body.inputPassword);


  //Check errors 
  var errors = req.validationErrors();

  if (errors) {
    //Если есть ошибки валидации то мы перезаписываем страницу
    res.render('register', {
      errors: errors
    });
    console.log(errors, "Validate Errors")

  } else {
    console.log("No Errors")
    var user = new User({
      email: email,
      password: password

    });



    User.find({ email: email }, function (err, searchResult) {


      if (searchResult.length > 0) {
        var errorsDb = [{ param: "AddUserError", msg: "Sorry, We already have such User" }];

        //Если есть ошибки валидации то мы перезаписываем страницу
        res.render('register', {
          errors: errorsDb
        });
        console.log(errorsDb, "Add User Errors")
      } else {
        user.save(function (err) {
          if (err) {
            console.log(user);
            throw err;
          }
        });

        //Создаем cookie - делаем их подписанными чтобы их не могли модифицировать пользователи
        res.cookie('email', email, { path: '/admin', maxAge: 120000, signed: true });
        res.cookie('userLogged', 'true', { path: '/admin', maxAge: 120000, signed: true });

        //Отправляем ответ в header
        res.location('/admin');
        //Перенаправляем на admin после успешной регистрации
        res.redirect('/admin');

      }

    })

  }

}

);


app.post('/', (req, res) => {
  console.log("Admin Post route - Заглушка");

  res.sendStatus(200);
});

//Вывести все голоса
app.get('/list', (req, res) => {

  Vote.find({}, function (err, documents) {
    // 'documents' будет содержать все документы,
    // возвращенные запросом
    res.send(documents.map(function (d) {
      // Возвращаем объект в более полезном виде,
      // который res.send() сможет отправить во вне как JSON
      return d._doc;
    }));

  });

});


module.exports = app;

