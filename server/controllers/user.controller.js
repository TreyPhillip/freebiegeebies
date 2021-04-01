const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.signup = async (req, res) => {
    // if (!req.body.title) {
    //     res.status(400).send({
    //         message: "image must have a title"
    //     });
    // return;
    // }
    const hashedPassword = await bcrypt.hash(req.body.user_password, 10)

    const user = {
        user_email: req.body.user_email,
        user_name: req.body.user_email,
        user_password: hashedPassword,
        verified: false
    };

    User.create(user)
        .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "unknown error occurred while creating the user."
        });
    });
};

// exports.login = (req, res) => {
//     passport.authenticate("local", (err, user, info) => {
//         if (err) throw err;
//         if (!user) res.send("No user exists");
//         else{
//             req.logIn(user, (err) => {
//                 if (err) throw err;
//                 res.send("successfully authenticated");
//                 console.log(req.user);
//             });
//         }
//     })
// }

exports.getUser = (req, res) => {
    res.send(req.user)
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

// exports.findOne = (req, res) => {
//     const UserID = req.params.UserID;

//     Image.findByPk(UserID)
//     .then(data => {
//         res.send(data);
//     })
//     .catch(err => {
//         res.status(500).send({
//             message: "error retrieving user with id=" + UserID
//         });
//     });
// };

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
