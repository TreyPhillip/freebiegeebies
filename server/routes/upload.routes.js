var uploadController = require('../controllers/upload.controller.js');
var router = require("express").Router();

module.exports = app => {

    app.post("/upload", checkAuthenticated, uploadController.upload);

    app.post("/createUpload", uploadController.createUpload);

    // router.get("/", images.findAll);

    // router.get("/:id", images.findOne);

    // router.post("/:id", images.update);

    // router.post("/:id", images.delete);

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