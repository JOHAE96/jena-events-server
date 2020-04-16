/**
* @author Johannes Häuser
*/

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const passport = require("passport");

var server = undefined;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 *
 * @param s: Server
 */
app.setServer = function(s) {
	server = s;
};

/**
 * Welcome screen
 */
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Welcome to jena vs virus'
    });
});

/**
 * register User
 * @param object (body) The object with the content of the new dataSource
 */
app.put('/user', (req, res, next) => {
    let user = req.body;
    server.registerUser(user.name);
    res.status(200).json({
        message: 'register User',
        error: false
    });
});

app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' }));

module.exports = app;