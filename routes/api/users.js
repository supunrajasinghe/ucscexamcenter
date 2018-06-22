const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//load user model
const User = require("../../models/User");

//@route   GET api/users/test
//@desc    Tests users route
//@access  Public
router.get("/test", (req, res) => res.json({ msg: "users work" }));

//@route   POST api/users/register
//@desc    register user
//@access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ indexNo: req.body.indexNo }).then(user => {
    if (user) {
      return res.status(400).json({ indexNo: "indexNo already exists" });
    } else {
      const newUser = new User({
        indexNo: req.body.indexNo,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route   GET api/users/login
//@desc    login user / returning the JWT token
//@access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const indexNo = req.body.indexNo;
  const password = req.body.password;

  //find user by indexNo
  User.findOne({ indexNo }).then(user => {
    //check for user
    if (!user) {
      errors.indexNo = "user not found";
      return res.status(404).json(errors);
    }
    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User Matched
        const payload = { id: user.id, email: user.email }; //create jwt payload

        //sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route   GET api/users/current
//@desc    Return current user
//@access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      indexNo: req.user.indexNo,
      email: req.user.email
    });
  }
);

module.exports = router;
