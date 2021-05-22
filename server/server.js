const express = require("express");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const db = require("./models");

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cors({
    origin: "http://localhost:8081",
    credentials: true
}));

app.use(session({
    secret: 'simplord69', 
    resave: true, 
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000
    }
}));

app.use(cookieParser("simplord69"));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport/passport.js')(passport, app)

require("./routes/image.routes.js")(app);
require("./routes/user.routes.js")(app, passport);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

db.sequelize.sync().then(function() {
    console.log('Database looks good')
}).catch(function(err) {
    console.log(err, 'Something went wrong with the database update')
});
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });