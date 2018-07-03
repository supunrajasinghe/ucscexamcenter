import axios from "axios";
import {
  GET_ERRORS,
  GET_SUBJECTS_REPEAT,
  GET_SUBJECTS_NONREPEAT,
  CLEAR_SUBJECTS_REPEAT,
  SUBJECTS_LOADING,
  GET_REGISTER_SUBJECTS
} from "./types";

//Get repeat subjects
export const getAllSubjects = () => dispatch => {
  dispatch(setSubjectLoading());
  axios
    .get("/api/subjects/repeat")
    .then(res =>
      dispatch({
        type: GET_SUBJECTS_REPEAT,
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

//get nonrepeat subjects
export const getNonRepeatSubjects = () => dispatch => {
  dispatch(setSubjectLoading());
  axios
    .get("/api/subjects/nonrepeat")
    .then(res =>
      dispatch({
        type: GET_SUBJECTS_NONREPEAT,
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

//get register subjects
export const getRegisterSubjects = () => dispatch => {
  dispatch(setSubjectLoading());
  axios
    .get("/api/subjects/getregistersubjects")
    .then(res =>
      dispatch({
        type: GET_REGISTER_SUBJECTS,
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

//add subjects
export const addSubject = (subjectData, history) => dispatch => {
  axios
    .post("/api/subjects/addsubject", subjectData)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//add register subjects
export const addRegisterSubjects = (subjectData, history) => dispatch => {
  axios
    .post("/api/subjects/registersubjects", subjectData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Profile loading
export const setSubjectLoading = () => {
  return {
    type: SUBJECTS_LOADING
  };
};

//Clear repeat subjects
export const clearAllSubjects = () => {
  return {
    type: CLEAR_SUBJECTS_REPEAT
  };
};
