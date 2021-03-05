module.exports = app => {
    const images = require("../controllers/image.controller.js");

    var router = require("express").Router();

    router.post("/", images.create);

    router.get("/", images.findAll);

    router.get("/:id", images.findOne);

    router.post("/:id", images.update);

    router.post("/:id", images.delete);

    app.use("/api/images", router);
};