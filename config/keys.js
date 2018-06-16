const mongoose = require("mongoose");

const mongooseConnect = mongoose.connect("mongodb://localhost/ucsc");
mongoose.Promise = global.Promise;

module.exports = mongooseConnect;
