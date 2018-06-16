const express = require("express");
const router = express.Router();

//@route   GET api/exams/test
//@desc    Tests exams route
//@access  Public
router.get("/test", (req, res) => res.json({ msg: "exams work" }));

module.exports = router;
