module.exports = function (app) {
    
    // Index route
    app.get('/', (req, res) => {
        res.render('index');
      });
};
