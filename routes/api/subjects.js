const express = require("express");
const router = express.Router();

//load addsubject model
const AddSubject = require("../../models/AddSubject");

//load input validations
const validateAddSubjects = require("../../validation/addSubject");

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
//@desc    show all subjects to students
//@access  Public
router.post("/repeat", (req, res) => {
  const errors = {};

  const degree = req.body.degree;

  AddSubject.find({ degree })
    .then(subjects => {
      if (!subjects) {
        errors.nosubjects = "There are no subjects for this course";
        return res.status(404).json(errors);
      }

      res.json(subjects);
    })
    .catch(err => res.status(404).json({ subjects: "there are no subjects" }));
});

module.exports = router;
