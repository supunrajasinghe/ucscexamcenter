const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//configure routes
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const exams = require("./routes/api/exams");
const subjects = require("./routes/api/subjects");

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database connection
mongoose
  .connect("mongodb://localhost/ucscexamcenter")
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));
mongoose.Promise = global.Promise;

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

//Use routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/exams", exams);
app.use("/api/subjects", subjects);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
