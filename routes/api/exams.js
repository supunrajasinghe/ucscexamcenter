const express = require("express");
const router = express.Router();

//load Exam model
const Exam = require("../../models/Exam");

//load input validations
const validateExamInput = require("../../validation/exam");

//@route   GET api/exams/test
//@desc    Tests exams route
//@access  Public
router.get("/test", (req, res) => res.json({ msg: "exams work" }));

//@route   POST api/exams/exam
//@desc    Add exam by admin
//@access  Public
router.post("/exam", (req, res) => {
  //res.send(req.body);
  const { errors, isValid } = validateExamInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const examFields = {
    degree: req.body.degree,
    year: req.body.year,
    semester: req.body.semester,
    examination: req.body.examination,
    description: req.body.description,
    deadline: req.body.deadline
  };

  Exam.findOne({ examination: req.body.examintaion }).then(exam => {
    if (exam) {
      //update
      Exam.findOneAndUpdate(
        { examination: req.body.examination },
        { $set: examFields },
        { new: true }
      )
        .then(exam => res.json(exam))
        .catch(err => res.json(err));
    } else {
      //make new subject and save
      new Exam(examFields)
        .save()
        .then(exam => res.json(exam))
        .catch(err => res.json(err));
    }
  });
});

//@route   get api/exams/all
//@desc    get all exams
//@access  Public
router.get("/all", (req, res) => {
  const errors = {};
  Exam.find()
    .then(exams => {
      if (!exams) {
        errors.noexam = "There are no upcoming exams";
        return res.status(404).send(errors);
      }
      res.json(exams);
    })
    .catch(err =>
      res.status(404).json({ exams: "there are no upcoming exams" })
    );
});

module.exports = router;
