module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        userID: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        user_email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        user_name: {
            type: Sequelize.STRING
        },
        user_password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        verified: {
            type: Sequelize.BOOLEAN
        }
    });
    return User;
}