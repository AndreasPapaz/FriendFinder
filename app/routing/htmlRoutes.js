var bodyParser = require('body-parser');
var path = require('path');

module.exports = function(app) {

    // Set up express for data parsing
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.text());
    app.use(bodyParser.json({ type: "application/vnd.api+json" }));

    // routes
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    app.use(function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
};