const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load profile model
const Profile = require("../../models/profile");
//load user profile
const User = require("../../models/User");
//load addsubject model
const AddSubject = require("../../models/AddSubject");
//load register subjects model
const RegisterSubject = require("../../models/RegisterSubjects");

//load input validations
const validateAddSubjects = require("../../validation/addSubject");
const validateRegisterSubjects = require("../../validation/registerSubject");

//@route   GET api/subjects/test
//@desc    Tests subjects route
//@access  Public
router.get("/test", (req, res) => res.json({ msg: "subjects work" }));

//@route   POST api/subjects/addsubject
//@desc    Add subjects by admin
//@access  Public
router.post("/addsubject", (req, res) => {
  //res.send(req.body);
  const { errors, isValid } = validateAddSubjects(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const subjectFields = {
    degree: req.body.degree,
    year: req.body.year,
    semester: req.body.semester,
    subjectCode: req.body.subjectCode,
    subjectName: req.body.subjectName
  };

  AddSubject.findOne({ subjectCode: req.body.subjectCode }).then(addsubject => {
    if (addsubject) {
      //update
      AddSubject.findOneAndUpdate(
        { subjectCode: req.body.subjectCode },
        { $set: subjectFields },
        { new: true }
      )
        .then(addsubject => res.json(addsubject))
        .catch(err => res.json(err));
    } else {
      //make new subject and save
      new AddSubject(subjectFields)
        .save()
        .then(addsubject => res.json(addsubject))
        .catch(err => res.json(err));
    }
  });
});

//@route   POST api/subjects/repeat
//@desc    show all repeat subject to students
//@access  Public
router.get(
  "/repeat",
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

        AddSubject.find({
          degree: profile.degree,
          year: { $ne: profile.year },
          type: "1"
        })
          .then(subjects => {
            if (!subjects) {
              errors.nosubjects = "There are no subjects for this course";
              return res.status(404).json(errors);
            }

            res.json(subjects);
          })
          .catch(err =>
            res.status(404).json({ subjects: "there are no subjects" })
          );
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route   POST api/subjects/nonrepeat
//@desc    show specific subject to students(1st time)
//@access  Public
router.get(
  "/nonrepeat",
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

        AddSubject.find({
          degree: profile.degree,
          year: profile.year,
          type: "1"
        })
          .then(subjects => {
            if (!subjects) {
              errors.nosubjects = "There are no subjects for this course";
              return res.status(404).json(errors);
            }

            res.json(subjects);
          })
          .catch(err =>
            res.status(404).json({ subjects: "there are no subjects" })
          );
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route   POST api/subjects/registersubjects
//@desc    register subjects for students
//@access  Public
router.post("/registersubjects", (req, res) => {
  // const { errors, isValid } = validateRegisterSubjects(req.body);

  // //check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  const subjectFields = {
    indexNo: req.body.indexNo,
    subjects: req.body.subjects,
    degree: req.body.degree,
    type: req.body.type
  };

  RegisterSubject.findOne({
    indexNo: req.body.indexNo,
    type: req.body.type
  }).then(registersubject => {
    if (registersubject) {
      //update
      RegisterSubject.findOneAndUpdate(
        { indexNo: req.body.indexNo, type: req.body.type },
        { $set: subjectFields },
        { new: true }
      )
        .then(registersubject => res.json(registersubject))
        .catch(err => res.json(err));
    } else {
      //make new subject and save
      new RegisterSubject(subjectFields)
        .save()
        .then(registersubject => res.json(registersubject))
        .catch(err => res.json(err));
    }
  });
});

//@route   POST api/subjects/getregistersubjects
//@desc    get register subjects from students
//@access  Public
router.get("/getregistersubjects", (req, res) => {
  const errors = {};
  RegisterSubject.find()
    .then(subjects => {
      if (!subjects) {
        errors.nosubjects = "There are no students register for subjects";
        return res.status(404).json(errors);
      }

      res.json(subjects);
    })
    .catch(err =>
      res
        .status(404)
        .json({ prosubjects: "There are no students register for subjects" })
    );
});

//@route   get api/subjects/all
//@desc    get all subjects
//@access  Public
router.get("/all", (req, res) => {
  const errors = {};
  AddSubject.find()
    .then(subjects => {
      if (!subjects) {
        errors.nosubjects = "There are no upcoming subjects";
        return res.status(404).send(errors);
      }
      res.json(subjects);
    })
    .catch(err =>
      res.status(404).json({ subjects: "there are no upcoming subjects" })
    );
});

//@route   get api/subjects/delete
//@desc    delete selected subject subjects
//@access  Public
router.post("/delete", (req, res) => {
  AddSubject.findById(req.body._id).then(subject => {
    if (!subject) {
      res.status(404).json({ exams: "there is no subject with this id" });
    }
    AddSubject.findByIdAndDelete(req.body._id).catch(err => res.json(err));
  });
});

//@route   get api/subjects/allregistersubjects
//@desc    get register subjects to user
//@access  Public
router.get(
  "/allregistersubjects",
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
        RegisterSubject.find({ indexNo: profile.handle })
          .then(subjects => {
            if (!subjects) {
              errors.nosubjects = "There are no subjects for this index no";
              return res.status(404).json(errors);
            }

            res.json(subjects);
          })
          .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
