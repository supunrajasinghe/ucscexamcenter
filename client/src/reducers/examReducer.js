import { GET_ALL_EXAMS, EXAMS_LOADING } from "../actions/types";

const initialState = {
  exams: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EXAMS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_EXAMS:
      return {
        ...state,
        exams: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
