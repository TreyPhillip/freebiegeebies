const db = require("../models");
const Image = db.images;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "image must have a title"
        });
    return;
    }

    const image = {
        image_URL: req.body.image_URL,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        uploaded_by: req.body.uploaded_by
    };

    Image.create(image)
        .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while saving the image."
        });
    });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Image.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "an unknown error has occured retrieving images"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Image.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "error retrieving image with id=" + id
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Image.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "The image was updated successsfully"
            });
        }
        else {
            res.send({
                message: `Cannot update image with id=${id}. 
                the image may not exist, or there was an error in the request`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "There was an error updating the image with the id=" + id
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Image.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "The image was deleted successsfully"
            });
        }
        else {
            res.send({
                message: `Cannot delete image with id=${id}. the image may not exist`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "There was an error deleting the image with the id=" + id
        })
    })
}
