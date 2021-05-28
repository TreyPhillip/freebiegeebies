var userController = require('../controllers/user.controller.js');
var router = require("express").Router();

module.exports = (app, passport) => {

    app.post("/signup", checkNotAuthenticated, userController.signup);

    app.post("/login", checkNotAuthenticated, userController.login);

    app.get("/logout", checkAuthenticated, userController.logout);

    app.get("/user", checkAuthenticated, userController.getUser);

    app.get("/user/auth", userController.isAuth)

    app.get("/", userController.findAll);

    app.get("/:id", userController.findOne);

    app.post("/:id", userController.update);

    app.post("/:id", userController.delete);

    app.use("/", router);

    
    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            console.log('User is Authenticated')
            return next()
        }
        // occasionally this causes ERR_TOO_MANY_REDIRECTS, but I have no idea how to reproduce it
        res.redirect('/login')
    }
    function checkNotAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            console.log('User is Authenticated')
            res.redirect('/')
        }
        next()
    }
};