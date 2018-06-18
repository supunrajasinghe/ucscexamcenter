const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load validations
const validateProfileInput = require("../../validation/profile");

//load profile model
const Profile = require("../../models/profile");
//load user profile
const User = require("../../models/User");

//@route   GET api/profiles/test
//@desc    Tests profiles route
//@access  Public
router.get("/test", (req, res) => res.json({ msg: "profiles work" }));

//@route   GET api/profiles
//@desc    Get current users profile
//@access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["email"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route   GET api/profiles/all
//@desc    Get al profiles
//@access  public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["email"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "there are no profiles" }));
});

//@route   GET api/profiles/handle/:handle
//@desc    Get Profile by handle
//@access  public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["email"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//@route   GET api/profiles/user/:user_id
//@desc    Get Profile by user ID
//@access  public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["email"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "there is no profile to user" })
    );
});

//@route   POST api/profiles
//@desc    Create or edit user profile
//@access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.registrationNo)
      profileFields.registrationNo = req.body.registrationNo;
    if (req.body.fullName) profileFields.fullName = req.body.fullName;
    if (req.body.nameWithInitials)
      profileFields.nameWithInitials = req.body.nameWithInitials;
    if (req.body.degree) profileFields.degree = req.body.degree;
    if (req.body.year) profileFields.year = req.body.year;
    if (req.body.mobileNo) profileFields.mobileNo = req.body.mobileNo;
    if (req.body.fixedNo) profileFields.fixedNo = req.body.fixedNo;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //create

        //check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exits";
            res.status(400).json(errors);
          }

          //save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
