/*jshint esversion: 6 */
"use strict";

/**
 * @author Johannes Häuser
 */
var fs = require("fs");
const User = require("./User.js");
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializizePassport = require("./passport.js");
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

class Server {
    constructor(conf) {
        this.conf = conf;
        this.port = conf.port;
        this.Users = {};
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
    getUser(name) {
        return this.Users[name];
    }

    login(userName, pw) {
        let hash = this.Users[userName].hashedpassword;
        bcrypt.compare(pw, hash, function(err, result) {
            if(result){
                console.log("right pw");
            } else {
                console.log("wrong pw");
            }
        });
    }

    addUser(user) {
        this.Users[user.getName()] = user;
    }

}

function hash() {

}

module.exports = Server;