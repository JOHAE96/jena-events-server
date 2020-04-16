/*jshint esversion: 6 */
"use strict";

/**
 * @author Johannes Häuser
 */

class User {
    constructor(name, pw) {
        this._name = name;
        this.hashedPassword = pw;
    }

    getName() {
        return this._name;
    }

    gethashedpassword() {
        return this.hashedPassword;
    }

    sethashedpassword(value) {
        this.hashedPassword = value;
    }

    setName(value) {
        this._name = value;
    }
}

module.exports = User;