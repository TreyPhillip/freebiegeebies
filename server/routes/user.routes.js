var userController = require('../controllers/user.controller.js');
var router = require("express").Router();

module.exports = (app, passport) => {

    app.post('/signup', checkNotAuthenticated, userController.signup);

    app.post("/login", checkNotAuthenticated, (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                console.log('sadge')
                throw err;
            }
            if (!user) {
                console.log(info)
                res.send("No User Exists");
            }
            else {
                if (err) throw err;
                res.send("Successfully Authenticated");
                console.log(req.user);
            }
        })(req, res, next);
    });

    app.get('/user', userController.getUser)

    // app.get("/", userController.findAll);

    // app.get("/:id", userController.findOne);

    // app.post("/:id", userController.update);

    // app.post("/:id", userController.delete);

    app.use("/", router);

    //unused for now
    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/login')
    }
    function checkNotAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/')
        }
        next()
    }
};