import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import subjectReducer from "./subjectReducer";
import examReducer from "./examReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  subject: subjectReducer,
  exam: examReducer
});
