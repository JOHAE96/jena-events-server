/*jshint esversion: 6 */
"use strict";

/**
 * @author Johannes Häuser
 */
var fs = require("fs");
const User = require("./User.js");
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializizePassport = require("./passport-config.js");
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

class Server {
    constructor(conf) {
        this.conf = conf;
        this.port = conf.port;
        this.Users = [];
        this.dirty = false;
        //initializizePassport(passport, this.getUser);
    }

    registerUser(name, pw) {
        let server = this;
        bcrypt.hash(pw, this.conf.saltRounds, function(err, hash) {
            let user = new User(name, hash, payment);
            this.Users[name] = user;
            server.dirty = true;
        });

        return user;
    }
    getUserByName(name) {
        return this.Users[name];
    }

    getUserbyEmail(email) {
        return this.Users.find(user => user.email === email);
    }

    addUser(user) {
        this.Users.push(user);
    }

}

function hash() {

}

module.exports = Server;