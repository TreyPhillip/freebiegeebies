const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(
    cors(
        corsOptions
    )
);

app.use(
    bodyParser.json()
);

app.use(
    bodyParser.urlencoded({ 
        extended:true 
    })
);

app.use(
    session({
        secret: 'simplord69', 
        resave: true, 
        saveUninitialized: true
    })
);

app.use(
    passport.initialize()
);

app.use(
    passport.session()
);

const db = require("./models");


app.get("/", (req, res) => {
    res.json({ message: "test message" });
});

require("./routes/image.routes")(app);
require("./routes/user.routes")(app);
require('./config/passport/passport.js')(passport, db.users)

db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});