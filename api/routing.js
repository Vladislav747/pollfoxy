module.exports = function (app) {
    // Index route
    //We define a route handler / that gets called when we hit our website home.
    app.get('/', (req, res) => {
        res.render('index');
      });
    
    //catch form submit
      app.post('/',  (req, res) => {
        // res.send(req.body);
        console.log(req.body, "Из App.js");
        const number = req.body.number;
        const text = req.body.text;
      });
    
       // Index route
    //We define a route handler / that gets called when we hit our website home.
    app.get('/admin', (req, res) => {
      res.render('admin/index');
    });
    }