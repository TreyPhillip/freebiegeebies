var bCrypt = require('bcrypt-nodejs');

module.exports = (passport, user) => {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;
    
    passport.use('local-signup', new LocalStrategy(
        {
            user_name_field: 'email',
            user_password_field: 'password',
            passReqToCallback: true
        },
        (req, email, password, done) => {
            var generateHash = (password) => {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            User.findOne({
                where: {
                    email: email
                }
            }).then((user) => {
                if (user) {
                    return done(null, false, {
                        message: 'That email is already in use'
                    });
                }
                else {
                    var user_password = generateHash(password);
                    var data = {
                        email: email,
                        username: req.body.user_name,
                        password: user_password
                    };
                    User.create(data).then = (newUser, created) => {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    }
                }
            });
        }   
    ));
}