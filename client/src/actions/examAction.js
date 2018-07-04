import axios from "axios";
import { GET_ERRORS, GET_ALL_EXAMS, EXAMS_LOADING } from "./types";

//add subjects
export const addExam = (examData, history) => dispatch => {
  axios
    .post("/api/exams/exam", examData)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//get all exams
export const getAllExams = () => dispatch => {
  dispatch(setSubjectLoading());
  axios
    .get("/api/exams/all")
    .then(res =>
      dispatch({
        type: GET_ALL_EXAMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//delete exam
export const deleteExam = (examData, history) => dispatch => {
  if (window.confirm("Are you Sure? This can not be undone")) {
    axios
      .post("/api/exams/delete", examData)
      .then(
        axios
          .get("/api/exams/all")
          .then(res =>
            dispatch({
              type: GET_ALL_EXAMS,
              payload: res.data
            })
          )
          .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
          )
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

//exmas loading
export const setSubjectLoading = () => {
  return {
    type: EXAMS_LOADING
  };
};
