/*jshint esversion: 6 */
"use strict";

/**
 * @author Johannes Häuser
 */

class User {
    constructor(name, email, pw) {
        this._name = name;
        this.email = email;
        this.hashedPassword = pw;
    }

    getName() {
        return this._name;
    }

    gethashedpassword() {
        return this.hashedPassword;
    }

    getEmail() {
        return this.email;
    }

    sethashedpassword(pw) {
        this.hashedPassword = pw;
    }

    setName(name) {
        this._name = name;
    }

    setEmail(email) {
        this.email = email;
    }

}

module.exports = User;