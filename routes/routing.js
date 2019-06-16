module.exports = function (app) {


    //Настраиваем Шаблон handlebars
var handlebars = require('express3-handlebars').create({
    defaultLayout: 'main',
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

    
    // Index route
    app.get('/', (req, res) => {
        res.render('poll');
      });
};