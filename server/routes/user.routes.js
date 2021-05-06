var userController = require('../controllers/user.controller.js');
var router = require("express").Router();

module.exports = (app, passport) => {

    app.post('/signup', userController.signup);

    app.post("/login", userController.login);

    app.get('/logout', userController.logout);

    // app.get('/logout', (req, res) => {
    //     req.logout();
    //     res.redirect('/');
    // });

    app.get('/user', userController.getUser);

    app.get("/", userController.findAll);

    app.get("/:id", userController.findOne);

    app.post("/:id", userController.update);

    app.post("/:id", userController.delete);

    app.get("/user", (req, res) => {
        res.send(req.user);
    });

    app.use("/", router);

    //unused for now
    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            console.log('you are already authenticated')
            return next()
        }
        res.redirect('/login')
    }
    function checkNotAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            
            return res.redirect('/home')
        }
        next()
    }
};