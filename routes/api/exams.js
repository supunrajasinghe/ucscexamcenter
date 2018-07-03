const express = require("express");
const router = express.Router();

//load Exam model
const Exam = require("../../models/Exam");
//load addsubject model
const AddSubject = require("../../models/AddSubject");

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

  const setSubject = {
    type: 1
  };

  Exam.findOne({
    examination: req.body.examination,
    year: req.body.year,
    semester: req.body.semester
  }).then(exam => {
    if (exam) {
      //update
      Exam.findOneAndUpdate(
        { examination: req.body.examination },
        { $set: examFields },
        { new: true }
      )
        .then(
          AddSubject.find({
            degree: req.body.degree,
            year: req.body.year,
            semester: req.body.semester
          })
            .then(subjects => {
              if (subjects) {
                AddSubject.updateMany(
                  {
                    degree: req.body.degree,
                    year: req.body.year,
                    semester: req.body.semester
                  },
                  { $set: setSubject },
                  { new: true }
                )
                  .then(updateSub => {
                    res.json(updateSub);
                  })
                  .catch(err =>
                    res
                      .status(404)
                      .json({ update: "there are no subjects to update" })
                  );
              }
            })
            .catch(err =>
              res.status(404).json({ subjects: "there are no subjects update" })
            )
        )
        .catch(err => res.json(err));
    } else {
      //make new subject and save
      new Exam(examFields)
        .save()
        .then(
          AddSubject.find({
            degree: req.body.degree,
            year: req.body.year,
            semester: req.body.semester
          })
            .then(subjects => {
              if (subjects) {
                AddSubject.updateMany(
                  {
                    degree: req.body.degree,
                    year: req.body.year,
                    semester: req.body.semester
                  },
                  { $set: setSubject },
                  { new: true }
                )
                  .then(updateSub => {
                    res.json(updateSub);
                  })
                  .catch(err =>
                    res
                      .status(404)
                      .json({ update: "there are no subjects to update" })
                  );
              }
            })
            .catch(err =>
              res.status(404).json({ subjects: "there are no subjects update" })
            )
        )
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

//@route   get api/exams/delete
//@desc    delete exams
//@access  Public
router.post("/delete", (req, res) => {
  const errors = {};
  const setSubject = {
    type: 0
  };
  Exam.findById(req.body._id).then(exam => {
    if (!exam) {
      res.status(404).json({ exams: "there is no exam with this id" });
    }
    Exam.findByIdAndDelete(req.body._id)
      .then(
        AddSubject.find({
          degree: req.body.degree,
          year: req.body.year,
          semester: req.body.semester
        })
          .then(subjects => {
            if (subjects) {
              AddSubject.updateMany(
                {
                  degree: req.body.degree,
                  year: req.body.year,
                  semester: req.body.semester
                },
                { $set: setSubject },
                { new: true }
              )
                .then(updateSub => {
                  res.json(updateSub);
                })
                .catch(err =>
                  res
                    .status(404)
                    .json({ update: "there are no subjects to update" })
                );
            }
          })
          .catch(err =>
            res.status(404).json({ subjects: "there are no subjects update" })
          )
      )
      .catch(err => res.json(err));
  });
});

module.exports = router;
