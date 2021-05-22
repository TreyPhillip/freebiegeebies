const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.signup = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.user_password, 10)

    const user = {
        user_email: req.body.user_email,
        user_name: req.body.user_email,
        user_password: hashedPassword,
        user_image_url: "https://res.cloudinary.com/freebiegeebies/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1613855150/samples/landscapes/nature-mountains.jpg",
        verified: false
    };

    User.create(user)
        .then(
        res.send("Signed Up Successfully")
    )
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "unknown error occurred while creating the user."
        });
    });
};

exports.login = (req, res, next) => {
    passport.authenticate("local", {successRedirect: '/home', failureRedirect: '/login'}, (err, user, info) => {
        if (err) {
            throw err;
        }
        if (!user) {
            res.send("No User Exists");
        }
        else {
            req.logIn(user, (err) => {
                if (err) {
                    throw err;
                }
                res.send("Successfully Authenticated");
            });
        }
    })(req, res, next);
}

exports.logout = (req, res) => {
    req.session.destroy( function ( err ) {
        res.send('Successfully Logged Out');
    });
}

exports.getUser = (req, res) => {
    res.send(JSON.stringify(req.user))
}

exports.isAuth = (req, res) => {
    if (req.user) {
        res.send("user is authenticated")
    }
}

exports.findAll = (req, res) => {
    const user_name = req.query.user_name;
    var condition = user_name ? { user_name: { [Op.iLike]: `%${user_name}%` } } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "an unknown error has occured retrieving users"
            });
        });
};

exports.findOne = (req, res) => {
    const UserID = req.params.UserID;

    User.findByPk(UserID)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "error retrieving user with id=" + UserID
        });
    });
};

exports.update = (req, res) => {
    const UserID = req.params.UserID;

    User.update(req.body, {
        where: { UserID: UserID }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "The user was updated successsfully"
            });
        }
        else {
            res.send({
                message: `Cannot update user with id=${UserID}. 
                the user may not exist, or there was an error in the request`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "There was an error updating the user with the id=" + UserID
        })
    })
}

exports.delete = (req, res) => {
    const UserID = req.params.UserID;

    User.destroy({
        where: { UserID: UserID }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "The user was deleted successsfully"
            });
        }
        else {
            res.send({
                message: `Cannot delete image with id=${UserID}. the user may not exist`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "There was an error deleting the user with the id=" + UserID
        })
    })
}
