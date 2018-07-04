import {
  GET_SUBJECTS_REPEAT,
  CLEAR_SUBJECTS_REPEAT,
  GET_SUBJECTS_NONREPEAT,
  SUBJECTS_LOADING,
  GET_REGISTER_SUBJECTS,
  GET_ALL_SUBJECTS,
  GET_REGISTER_SUBJECTS_FOR_USER
} from "../actions/types";

const initialState = {
  repeatSubjects: null,
  nonRepeatSubjects: null,
  registerSubjects: null,
  allSubjects: null,
  registerSubjectsUser: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SUBJECTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SUBJECTS_NONREPEAT:
      return {
        ...state,
        nonRepeatSubjects: action.payload,
        loading: false
      };
    case GET_SUBJECTS_REPEAT:
      return {
        ...state,
        repeatSubjects: action.payload,
        loading: false
      };
    case GET_REGISTER_SUBJECTS:
      return {
        ...state,
        registerSubjects: action.payload,
        loading: false
      };
    case GET_ALL_SUBJECTS:
      return {
        ...state,
        allSubjects: action.payload,
        loading: false
      };
    case GET_REGISTER_SUBJECTS_FOR_USER:
      return {
        ...state,
        registerSubjectsUser: action.payload,
        loading: false
      };
    case CLEAR_SUBJECTS_REPEAT:
      return {
        ...state,
        repeatSubjects: null
      };

    default:
      return state;
  }
}
