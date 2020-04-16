const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt')

function initialize(passport, getUser) {
    const authenticateUser = async (username, password, done) => {
        const user = getUser(username);
        if (user == null) {
            return done(null, false, {message: 'No user with that name'})
        }
        try {
          if (await bcrypt.compare(password, user.password)) {
            return done(null, user)
          } else {
            return done(null, false, { message: 'Password incorrect' })
          }
        } catch (e) {
          return done(e)
        }
      }
    passport.use(new LocalStrategy(), authen);
    passport.serializeUser((user, done) => done(null, user.name));
    passport.deserializeUser((name, done) => {
        return done(null, getUser(name))
  })
}

module.exports = initialize