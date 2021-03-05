module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("image", {
        image_URL: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        uploaded_by: {
            type: Sequelize.STRING
        }
    });
    return Image;
}