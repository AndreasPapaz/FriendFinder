// Dependencies 
var data = require('../data/friends.js');
var bodyParser = require('body-parser');
var path = require('path');
// Global variables
var friendsObj = data.friends;

module.exports = function(app) {

    // Set up express for data parsing
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.text());
    app.use(bodyParser.json({ type: "application/vnd.api+json" }));

    // Request data from server
    app.get("/api/friends", function(req, res) {
        res.json(data);
    });

    // Send data to server
    app.post("/api/friends", function(req, res) {
        // set variables
        var newFriend = req.body;
        var totalScore;
        var compDiff = 40;
        var compFriend;
        var compFriendPhoto;
        
        for (var i = 0; i < friendsObj.length; i++) {
            // set total score to 0
            totalScore = 0;
            
            for (var j = 0; j < 10; j++) {
                var score1 = newFriend.scores[j];
                var score2 = friendsObj[i].scores[j];
                parseInt(score1);
                parseInt(score2);
                
                var addToScore = Math.abs(score1 - score2);
                
                totalScore = totalScore + addToScore;
            }
            
            var newTotalScore = totalScore;
            
            if (newTotalScore < compDiff) {
                compDiff = newTotalScore;
                compFriend = friendsObj[i].name;
                compFriendPhoto = friendsObj[i].photo;
            }
        }
        
        var matchingFriend = {
            name: compFriend,
            photo: compFriendPhoto
        };
        
        data.friends.push(newFriend);
        
        res.json(matchingFriend);
    });
};