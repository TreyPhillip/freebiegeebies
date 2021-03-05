module.exports = (app, passport) => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    router.get("/register", users.create);

    router.get("/login", 
        passport.authenticate('local', { failureRedirect: '/login'}),
        (req, res) => {
            res.redirect('/')
        }
    );

    // router.get("/", users.findAll);

    // router.get("/:id", users.findOne);

    // router.post("/:id", users.update);

    // router.post("/:id", users.delete);

    app.use("/api/users", router);
};