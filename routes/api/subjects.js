const express = require("express");
const router = express.Router();

//@route   GET api/subjects/test
//@desc    Tests subjects route
//@access  Public
router.get("/test", (req, res) => res.json({ msg: "subjects work" }));

module.exports = router;
