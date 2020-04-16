/**
 * @author Johannes Häuser
 */

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override');

const initializePassport = require('./passport-config');

const User = require("./User");
var server = undefined;

/**
 *
 * @param s: Server
 */
app.setServer = function(s) {
    server = s;
    initializePassport(
        passport,
        server.getUserbyEmail(),
        server.getUserByName()
    );

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(express.urlencoded({ extended: false }));

    app.use(session({
        secret: server.conf.secret,
        resave: false,
        saveUninitialized: false
    }))
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(methodOverride('_method'));
};

/**
 * Welcome screen
 */
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Welcome to jena vs virus'
    });
});

app.get('/', checkAuthenticated, (req, res) => {
    res.status(200).json(
        { name: req.user.name
    });
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

app.post('/register', checkNotAuthenticated, async (req, res) => {
    console.log("register body:"+req.body);
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let user = new User(
            req.body.name,
            req.body.email,
            hashedPassword
        );
        server.addUser(user);
        res.redirect('/login')
    } catch {
        console.log("register error");
        res.redirect('/register')
    }
});

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login')
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}
module.exports = app;