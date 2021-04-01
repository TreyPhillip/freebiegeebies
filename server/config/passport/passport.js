const db = require("../../models");
const User = db.users;
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy

module.exports = (passport) => {
    passport.use(
        new localStrategy({
            usernameField: 'user_email',
            passwordField: 'user_password'
        },
        async (user_email, user_password, done) => {
            const user = await User.findOne({ where: {user_email: user_email} });
            if (user === null) {
                return done(null, false);
            } else {
                bcrypt.compare(user_password, user.user_password, (err, result) => {
                    if (err) {
                        throw err;
                    }
                    if (result === true) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false);
                    }
                });
            }
        })
    );
    passport.serializeUser((user, cb) => {
        cb(null, user.userID);
    });
    passport.deserializeUser((userID, cb) => {
        User.findOne({ _userID: userID}, (err, user) => {
            const userInformation = {
                user_email: user.user_email,
            };
            cb(err, userInformation);
        });
    });
};