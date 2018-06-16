const express = require("express");
const mongoose = require("mongoose");

//configure routes
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const exams = require("./routes/api/exams");
const subjects = require("./routes/api/subjects");

//database connection
mongoose
  .connect("mongodb://localhost/ucscexamcenter")
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));
mongoose.Promise = global.Promise;

const app = express();

app.get("/", (req, res) => res.send("Hello"));

//Use routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/exams", exams);
app.use("/api/subjects", subjects);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
