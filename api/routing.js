module.exports = function (app) {
    // Index route
    //We define a route handler / that gets called when we hit our website home.
    app.get('/', (req, res) => {
        res.render('index');
      });
};